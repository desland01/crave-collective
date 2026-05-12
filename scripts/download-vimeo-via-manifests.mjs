import fs from 'node:fs';
import { spawn } from 'node:child_process';

const captures = JSON.parse(fs.readFileSync('/tmp/vimeo-manifests.json', 'utf8'));
const slugs = {
  '1000908347': 'hvar-away',
  '1001966331': 'virgin-voyages',
  '1182049959': 'sandals-resort',
  '1182054141': 'dedicated-to-sell-v2',
  '1088096342': 'color-wipe',
  '1084106061': 'colors-you-crave',
};

const fetchOptions = {
  headers: {
    'Referer': 'https://www.cravecollective.co/',
    'Origin': 'https://www.cravecollective.co',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  },
};

for (const { videoId, manifestUrl } of captures) {
  const slug = slugs[videoId] || `vimeo-${videoId}`;
  if (slug === 'dedicated-to-sell-v2') {
    console.log(`[${videoId}] skip (already downloaded)`);
    continue;
  }
  console.log(`\n[${videoId}] ${slug} — fetching playlist...`);
  try {
    const res = await fetch(manifestUrl, fetchOptions);
    if (!res.ok) {
      console.log(`  HTTP ${res.status} — skip`);
      continue;
    }
    const manifest = await res.json();
    // playlist.json format: top-level base_url + video[] + audio[] arrays with hls/dash variants
    const baseUrl = new URL(manifest.base_url || '.', manifestUrl).href;
    console.log(`  baseUrl: ${baseUrl}`);
    // Find best 1080 variant
    const videos = manifest.video || [];
    const audios = manifest.audio || [];
    const best = videos.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];
    const bestAudio = audios.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))[0];
    console.log(`  best video: ${best?.width}x${best?.height} @ ${best?.bitrate} (${best?.codecs})`);
    console.log(`  best audio: ${bestAudio?.bitrate || 'none'}`);

    // Each variant has init_segment + segments[]
    const fetchTrack = async (track) => {
      if (!track) return null;
      const trackBase = new URL(track.base_url || '.', baseUrl).href;
      const segs = track.segments || [];
      console.log(`  segments: ${segs.length}, init: ${(track.init_segment || '').slice(0, 40)}...`);
      const parts = [];
      // init_segment is base64-encoded data
      if (track.init_segment) {
        parts.push(Buffer.from(track.init_segment, 'base64'));
      }
      for (let i = 0; i < segs.length; i++) {
        const segUrl = new URL(segs[i].url, trackBase).href;
        const r = await fetch(segUrl, fetchOptions);
        if (!r.ok) throw new Error(`seg ${i}: HTTP ${r.status}`);
        const buf = Buffer.from(await r.arrayBuffer());
        parts.push(buf);
        if (i % 5 === 0) process.stdout.write(`.`);
      }
      process.stdout.write('\n');
      return Buffer.concat(parts);
    };

    const videoBuf = await fetchTrack(best);
    const audioBuf = await fetchTrack(bestAudio);

    const vPath = `/tmp/vimeo-${videoId}-video.mp4`;
    const aPath = `/tmp/vimeo-${videoId}-audio.mp4`;
    const outPath = `/tmp/vimeo-${videoId}.mp4`;

    fs.writeFileSync(vPath, videoBuf);
    if (audioBuf) fs.writeFileSync(aPath, audioBuf);

    // Mux via ffmpeg
    const args = audioBuf
      ? ['-y', '-i', vPath, '-i', aPath, '-c', 'copy', outPath]
      : ['-y', '-i', vPath, '-c', 'copy', outPath];
    const ff = spawn('ffmpeg', args, { stdio: 'inherit' });
    await new Promise((resolve, reject) => {
      ff.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}`)));
    });
    const size = fs.statSync(outPath).size;
    console.log(`  ✓ ${outPath} (${(size / 1024 / 1024).toFixed(1)} MB)`);

    fs.unlinkSync(vPath);
    if (audioBuf) fs.unlinkSync(aPath);
  } catch (e) {
    console.log(`  ERR: ${e.message}`);
  }
}
