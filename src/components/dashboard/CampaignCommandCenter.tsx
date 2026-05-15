"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { Body } from "@/components/primitives/Body";
import { BrassNumeral } from "@/components/primitives/BrassNumeral";
import { Caption } from "@/components/primitives/Caption";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { H2 } from "@/components/primitives/H2";
import { H3 } from "@/components/primitives/H3";
import { Lead } from "@/components/primitives/Lead";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";

type CreativeId = "broad" | "trust" | "proof" | "intent";
type ViewMode = "proposal" | "csv" | "report";

type CreativePreset = {
  id: CreativeId;
  label: string;
  shortLabel: string;
  cplRange: [number, number];
  closeRateRange: [number, number];
  jobValueMultiplier: [number, number];
  fit: string;
  readout: string;
};

type CsvField =
  | "date"
  | "client"
  | "campaign"
  | "creative"
  | "spend"
  | "leads"
  | "cpl"
  | "bookedCalls"
  | "closedJobs"
  | "revenue";

type ColumnMap = Partial<Record<CsvField, number>>;

type CampaignRow = {
  date: string;
  client: string;
  campaign: string;
  creative: string;
  spend: number;
  leads: number;
  bookedCalls: number;
  closedJobs: number;
  revenue: number;
  revenueIsEstimated: boolean;
};

type CampaignGroup = {
  campaign: string;
  creative: string;
  spend: number;
  leads: number;
  bookedCalls: number;
  closedJobs: number;
  revenue: number;
  roas: number;
  cpl: number;
};

const creativePresets: CreativePreset[] = [
  {
    id: "broad",
    label: "Broad reel",
    shortLabel: "Broad",
    cplRange: [28, 48],
    closeRateRange: [0.07, 0.13],
    jobValueMultiplier: [0.8, 1],
    fit: "Cheaper reach and volume when the market still needs to learn the name.",
    readout:
      "Low CPL can look efficient, but many leads are still early and need more follow-up.",
  },
  {
    id: "trust",
    label: "Owner story",
    shortLabel: "Trust",
    cplRange: [42, 72],
    closeRateRange: [0.12, 0.22],
    jobValueMultiplier: [0.95, 1.18],
    fit: "Founder-led credibility, objections answered early, warmer discovery calls.",
    readout:
      "The lead costs more because the ad is doing qualification before the click.",
  },
  {
    id: "proof",
    label: "Proof film",
    shortLabel: "Proof",
    cplRange: [64, 104],
    closeRateRange: [0.18, 0.31],
    jobValueMultiplier: [1.12, 1.42],
    fit: "Case-study creative, before-and-after proof, premium positioning.",
    readout:
      "Higher CPL is acceptable when each booked call carries more trust and bigger deal intent.",
  },
  {
    id: "intent",
    label: "High-intent offer",
    shortLabel: "Intent",
    cplRange: [82, 138],
    closeRateRange: [0.22, 0.38],
    jobValueMultiplier: [1.28, 1.72],
    fit: "Tight targeting, urgent offers, bigger jobs, and fewer low-fit inquiries.",
    readout:
      "This is where CPL often rises while ROAS improves, because waste is removed upstream.",
  },
];

const defaultCsv = `Date,Client,Campaign,Creative Type,Amount Spent,Leads,Booked Calls,Closed Jobs,Revenue
2026-05-01,Demo Builder,Owner Story Prospecting,Owner story,1280,18,7,3,28500
2026-05-01,Demo Builder,Before After Proof,Proof film,1740,16,8,4,52000
2026-05-01,Demo Builder,Broad Sarasota Reel,Broad reel,960,31,5,1,8500
2026-05-08,Demo Builder,High Intent Estimate Offer,High-intent offer,2120,19,10,5,73500`;

const fieldLabels: Record<CsvField, string> = {
  date: "Date",
  client: "Client",
  campaign: "Campaign",
  creative: "Creative",
  spend: "Spend",
  leads: "Leads",
  cpl: "CPL",
  bookedCalls: "Booked calls",
  closedJobs: "Closed jobs",
  revenue: "Revenue",
};

const columnAliases: Record<CsvField, string[]> = {
  date: ["date", "day", "week", "month", "reporting starts", "reporting start"],
  client: ["client", "account", "account name", "business", "customer", "brand"],
  campaign: ["campaign", "campaign name", "campaign_name", "campaign.name"],
  creative: [
    "creative",
    "creative type",
    "content type",
    "ad name",
    "ad creative",
    "asset",
  ],
  spend: [
    "amount spent",
    "amount spent usd",
    "amount spent (usd)",
    "spend",
    "cost",
    "meta spend",
    "ad spend",
  ],
  leads: [
    "leads",
    "lead",
    "results",
    "onsite leads",
    "form leads",
    "meta leads",
    "instant form leads",
  ],
  cpl: ["cpl", "cost per lead", "cost per result", "cost per conversion"],
  bookedCalls: [
    "booked calls",
    "calls booked",
    "appointments",
    "appointments booked",
    "scheduled calls",
  ],
  closedJobs: [
    "closed jobs",
    "jobs won",
    "won jobs",
    "deals won",
    "sales count",
    "closed deals",
  ],
  revenue: [
    "revenue",
    "closed revenue",
    "job revenue",
    "sales revenue",
    "purchase conversion value",
    "conversion value",
    "value",
  ],
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

function money(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return currencyFormatter.format(value);
}

function compactMoney(value: number) {
  if (!Number.isFinite(value)) return "$0";
  const sign = value < 0 ? "-" : "";
  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1_000_000) {
    return `${sign}$${trimTrailingZero(absoluteValue / 1_000_000)}M`;
  }

  if (absoluteValue >= 1_000) {
    return `${sign}$${trimTrailingZero(absoluteValue / 1_000)}K`;
  }

  return `${sign}$${trimTrailingZero(absoluteValue)}`;
}

function percent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function ratio(value: number) {
  if (!Number.isFinite(value)) return "0.0x";
  return `${value.toFixed(1)}x`;
}

function trimTrailingZero(value: number) {
  return value.toFixed(1).replace(/\.0$/, "");
}

function cleanHeader(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[$%#]/g, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");
}

function readNumber(value: string | undefined) {
  if (!value) return 0;
  const cleaned = value.replace(/[$,%]/g, "").replace(/[^\d.-]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCsvRows(input: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

function detectColumns(headers: string[]): ColumnMap {
  const normalized = headers.map(cleanHeader);
  const map: ColumnMap = {};

  (Object.keys(columnAliases) as CsvField[]).forEach((field) => {
    const index = normalized.findIndex((header) =>
      columnAliases[field].some((alias) => header === cleanHeader(alias))
    );
    if (index >= 0) map[field] = index;
  });

  return map;
}

function parseCampaignRows(
  csv: string,
  fallbackAverageJob: number,
  fallbackCloseRate: number
) {
  const parsedRows = parseCsvRows(csv);
  if (parsedRows.length < 2) {
    return {
      rows: [] as CampaignRow[],
      headers: parsedRows[0] ?? [],
      map: {} as ColumnMap,
      errors: ["Add a header row and at least one campaign row."],
    };
  }

  const headers = parsedRows[0];
  const map = detectColumns(headers);
  const errors: string[] = [];

  if (map.spend === undefined) errors.push("Missing spend column.");
  if (map.leads === undefined && map.cpl === undefined) {
    errors.push("Missing leads or CPL column.");
  }

  const rows = parsedRows.slice(1).map((cells, index) => {
    const spend = readNumber(cells[map.spend ?? -1]);
    const cpl = readNumber(cells[map.cpl ?? -1]);
    const leadsFromColumn = readNumber(cells[map.leads ?? -1]);
    const leads = leadsFromColumn > 0 ? leadsFromColumn : cpl > 0 ? spend / cpl : 0;
    const bookedCalls = readNumber(cells[map.bookedCalls ?? -1]);
    const closedJobsFromColumn = readNumber(cells[map.closedJobs ?? -1]);
    const projectedClosedJobs =
      closedJobsFromColumn > 0 ? closedJobsFromColumn : leads * fallbackCloseRate;
    const revenueFromColumn = readNumber(cells[map.revenue ?? -1]);
    const revenue =
      revenueFromColumn > 0 ? revenueFromColumn : projectedClosedJobs * fallbackAverageJob;

    return {
      date: cells[map.date ?? -1] || "",
      client: cells[map.client ?? -1] || "Client",
      campaign: cells[map.campaign ?? -1] || `Campaign ${index + 1}`,
      creative: cells[map.creative ?? -1] || "Unlabeled creative",
      spend,
      leads,
      bookedCalls,
      closedJobs: projectedClosedJobs,
      revenue,
      revenueIsEstimated: revenueFromColumn <= 0,
    };
  });

  return { rows, headers, map, errors };
}

function groupCampaigns(rows: CampaignRow[]) {
  const groups = new Map<string, CampaignGroup>();

  rows.forEach((row) => {
    const key = row.campaign || "Campaign";
    const current = groups.get(key) ?? {
      campaign: key,
      creative: row.creative,
      spend: 0,
      leads: 0,
      bookedCalls: 0,
      closedJobs: 0,
      revenue: 0,
      roas: 0,
      cpl: 0,
    };

    current.spend += row.spend;
    current.leads += row.leads;
    current.bookedCalls += row.bookedCalls;
    current.closedJobs += row.closedJobs;
    current.revenue += row.revenue;
    current.roas = current.spend > 0 ? current.revenue / current.spend : 0;
    current.cpl = current.leads > 0 ? current.spend / current.leads : 0;
    groups.set(key, current);
  });

  return Array.from(groups.values()).sort((a, b) => b.roas - a.roas);
}

function getSummary(rows: CampaignRow[]) {
  const spend = rows.reduce((sum, row) => sum + row.spend, 0);
  const leads = rows.reduce((sum, row) => sum + row.leads, 0);
  const bookedCalls = rows.reduce((sum, row) => sum + row.bookedCalls, 0);
  const closedJobs = rows.reduce((sum, row) => sum + row.closedJobs, 0);
  const revenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const roas = spend > 0 ? revenue / spend : 0;
  const cpl = leads > 0 ? spend / leads : 0;
  const closeRate = leads > 0 ? closedJobs / leads : 0;
  const estimatedRows = rows.filter((row) => row.revenueIsEstimated).length;

  return { spend, leads, bookedCalls, closedJobs, revenue, roas, cpl, closeRate, estimatedRows };
}

function getProjection(
  adSpend: number,
  averageJobSize: number,
  preset: CreativePreset
) {
  const leadsLow = adSpend / preset.cplRange[1];
  const leadsHigh = adSpend / preset.cplRange[0];
  const closedLow = leadsLow * preset.closeRateRange[0];
  const closedHigh = leadsHigh * preset.closeRateRange[1];
  const revenueLow = closedLow * averageJobSize * preset.jobValueMultiplier[0];
  const revenueHigh = closedHigh * averageJobSize * preset.jobValueMultiplier[1];
  const roasLow = adSpend > 0 ? revenueLow / adSpend : 0;
  const roasHigh = adSpend > 0 ? revenueHigh / adSpend : 0;
  const valuePerLeadLow = leadsLow > 0 ? revenueLow / leadsLow : 0;
  const valuePerLeadHigh = leadsHigh > 0 ? revenueHigh / leadsHigh : 0;

  return {
    leadsLow,
    leadsHigh,
    closedLow,
    closedHigh,
    revenueLow,
    revenueHigh,
    roasLow,
    roasHigh,
    valuePerLeadLow,
    valuePerLeadHigh,
    cplLow: preset.cplRange[0],
    cplHigh: preset.cplRange[1],
    closeLow: preset.closeRateRange[0],
    closeHigh: preset.closeRateRange[1],
  };
}

function fieldStatus(field: CsvField, map: ColumnMap, headers: string[]) {
  const index = map[field];
  if (index === undefined) return "Not found";
  return headers[index] || "Detected";
}

function createOptimizationQueue(
  campaigns: CampaignGroup[],
  summary: ReturnType<typeof getSummary>,
  selectedPreset: CreativePreset
) {
  if (campaigns.length === 0) {
    return [
      {
        title: "Use ROAS as the client-facing scoreboard",
        detail:
          "Lead volume opens the discussion, but revenue per lead and close rate decide whether the creative is working.",
      },
      {
        title: `Test ${selectedPreset.shortLabel.toLowerCase()} creative against a broad reel`,
        detail:
          "Show the prospect how a higher CPL can still win when the campaign filters for bigger jobs.",
      },
      {
        title: "Add closed revenue to the sheet",
        detail:
          "Meta can supply spend and lead volume. The sales result belongs in the sheet so the report can show true ROAS.",
      },
    ];
  }

  const best = campaigns[0];
  const weakest = campaigns[campaigns.length - 1];
  const queue = [
    {
      title: `Scale ${best.campaign}`,
      detail: `${best.campaign} is leading at ${ratio(best.roas)} ROAS. Increase budget in small steps and watch booked calls, not just CPL.`,
    },
  ];

  if (summary.cpl > selectedPreset.cplRange[1] && summary.roas >= 2.5) {
    queue.push({
      title: "Do not punish expensive leads too early",
      detail:
        "CPL is above the model, but ROAS is healthy. Keep the audience quality and inspect close quality before cutting spend.",
    });
  }

  if (weakest && weakest.campaign !== best.campaign) {
    queue.push({
      title: `Refresh ${weakest.campaign}`,
      detail: `${weakest.campaign} is trailing at ${ratio(weakest.roas)} ROAS. Test a new hook, stronger proof, or narrower audience before adding budget.`,
    });
  }

  if (summary.estimatedRows > 0) {
    queue.push({
      title: "Replace estimated revenue with closed-job revenue",
      detail:
        "Some report rows are using projected value. Add closed jobs or revenue to make the PDF defensible.",
    });
  }

  return queue.slice(0, 4);
}

function KpiCard({
  label,
  value,
  context,
  tone = "default",
}: {
  label: string;
  value: string;
  context: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className="border border-(--color-line-hairline) bg-(--color-bg-elevated) p-5 lg:p-6">
      <Caption className={tone === "accent" ? "text-(--color-accent-primary)" : ""}>
        {label}
      </Caption>
      <p
        className="mt-5 max-w-full break-words text-[30px] leading-[1.02] text-(--color-ink-primary) md:text-[38px]"
        style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
      >
        {value}
      </p>
      <Body className="mt-4 text-[15px] leading-[1.45]">{context}</Body>
    </div>
  );
}

function NumberInput({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block border-b border-(--color-line-hairline) py-5">
      <span className="flex items-center justify-between gap-4">
        <Caption className="text-(--color-ink-muted)">{label}</Caption>
        <span className="text-sm text-(--color-ink-primary)">
          {prefix}
          {numberFormatter.format(value)}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        className="mt-5 h-2 w-full accent-(--color-accent-primary)"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value || 0))}
        className="mt-4 min-h-[48px] w-full border border-(--color-line-hairline) bg-transparent px-4 text-[16px] text-(--color-ink-primary) outline-none focus:border-(--color-accent-primary)"
      />
    </label>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[48px] border px-4 text-sm font-medium uppercase transition-colors ${
        active
          ? "border-(--color-accent-primary) bg-(--color-accent-primary) text-(--color-accent-on-accent)"
          : "border-(--color-line-hairline) text-(--color-ink-secondary) hover:border-(--color-accent-primary) hover:text-(--color-ink-primary)"
      }`}
      style={{ fontFamily: "var(--font-sans)", letterSpacing: 0 }}
    >
      {children}
    </button>
  );
}

function RangeLine({
  label,
  low,
  high,
  formatter,
  max,
}: {
  label: string;
  low: number;
  high: number;
  formatter: (value: number) => string;
  max: number;
}) {
  const left = max > 0 ? Math.max(0, Math.min(100, (low / max) * 100)) : 0;
  const width = max > 0 ? Math.max(6, Math.min(100 - left, ((high - low) / max) * 100)) : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Caption className="text-(--color-ink-muted)">{label}</Caption>
        <span className="text-sm text-(--color-ink-primary)">
          {formatter(low)} - {formatter(high)}
        </span>
      </div>
      <div className="h-2 bg-(--color-ink-overlay-white-8)">
        <div
          className="h-full bg-(--color-accent-primary)"
          style={{ marginLeft: `${left}%`, width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function CampaignBar({
  campaign,
  maxRevenue,
}: {
  campaign: CampaignGroup;
  maxRevenue: number;
}) {
  const width = maxRevenue > 0 ? Math.max(5, (campaign.revenue / maxRevenue) * 100) : 0;

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-(--color-line-hairline) py-5 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-center">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <H3
            as="h4"
            className="text-[26px] leading-[1.05] tracking-[0] text-(--color-ink-primary)"
          >
            {campaign.campaign}
          </H3>
          <Caption>{campaign.creative}</Caption>
        </div>
        <div className="mt-4 h-2 bg-(--color-ink-overlay-white-8)">
          <div className="h-full bg-(--color-accent-primary)" style={{ width: `${width}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-left lg:text-right">
        <div>
          <Caption>Spend</Caption>
          <p className="mt-1 text-sm text-(--color-ink-primary)">{compactMoney(campaign.spend)}</p>
        </div>
        <div>
          <Caption>ROAS</Caption>
          <p className="mt-1 text-sm text-(--color-ink-primary)">{ratio(campaign.roas)}</p>
        </div>
        <div>
          <Caption>CPL</Caption>
          <p className="mt-1 text-sm text-(--color-ink-primary)">{money(campaign.cpl)}</p>
        </div>
      </div>
    </div>
  );
}

function PrintButton({ onClick }: { onClick: () => void }) {
  return (
    <PrimaryButton type="button" onClick={onClick} className="w-full sm:w-auto">
      Export Branded PDF
    </PrimaryButton>
  );
}

export function CampaignCommandCenter() {
  const [view, setView] = useState<ViewMode>("proposal");
  const [adSpend, setAdSpend] = useState(3200);
  const [averageJobSize, setAverageJobSize] = useState(8500);
  const [creativeId, setCreativeId] = useState<CreativeId>("proof");
  const [csvText, setCsvText] = useState(defaultCsv);
  const [fallbackCloseRate, setFallbackCloseRate] = useState(0.22);
  const [reportClient, setReportClient] = useState("Demo Builder");
  const [reportPeriod, setReportPeriod] = useState("May 2026");
  const [reportNote, setReportNote] = useState(
    "Creative that qualifies the prospect before the form fill is allowed to have a higher CPL when revenue per lead improves."
  );

  const selectedPreset = creativePresets.find((preset) => preset.id === creativeId) ?? creativePresets[2];
  const projection = useMemo(
    () => getProjection(adSpend, averageJobSize, selectedPreset),
    [adSpend, averageJobSize, selectedPreset]
  );
  const broadProjection = useMemo(
    () => getProjection(adSpend, averageJobSize, creativePresets[0]),
    [adSpend, averageJobSize]
  );
  const csvResult = useMemo(
    () => parseCampaignRows(csvText, averageJobSize, fallbackCloseRate),
    [averageJobSize, csvText, fallbackCloseRate]
  );
  const campaignGroups = useMemo(() => groupCampaigns(csvResult.rows), [csvResult.rows]);
  const summary = useMemo(() => getSummary(csvResult.rows), [csvResult.rows]);
  const optimizationQueue = useMemo(
    () => createOptimizationQueue(campaignGroups, summary, selectedPreset),
    [campaignGroups, selectedPreset, summary]
  );
  const maxRevenue = campaignGroups.reduce((max, campaign) => Math.max(max, campaign.revenue), 0);
  const reportUsesCsv = csvResult.rows.length > 0 && csvResult.errors.length === 0;

  function handleCsvFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCsvText(String(reader.result ?? ""));
      setView("csv");
    };
    reader.readAsText(file);
  }

  function printReport() {
    document.body.classList.add("is-campaign-printing");
    const clearPrintMode = () => {
      document.body.classList.remove("is-campaign-printing");
      window.removeEventListener("afterprint", clearPrintMode);
    };
    window.addEventListener("afterprint", clearPrintMode);
    window.print();
    window.setTimeout(clearPrintMode, 1000);
  }

  return (
    <div id="campaign-dashboard">
      <section
        aria-label="Campaign dashboard hero"
        className="min-h-[auto] px-6 pb-12 pt-32 lg:px-12 lg:pb-16 lg:pt-40"
      >
        <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-end">
          <div>
            <Eyebrow>Campaign Command Center</Eyebrow>
            <h1
              className="mt-6 max-w-[12ch] text-[48px] leading-[0.95] text-(--color-ink-primary) sm:text-[64px] lg:text-[96px]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
            >
              Make spend make sense.
            </h1>
            <Lead className="mt-8 max-w-2xl">
              A Crave-styled dashboard for Meta spend, creative optimization,
              discovery-call ROI modeling, CSV-based ROAS reporting, and a
              branded PDF clients can actually understand.
            </Lead>
          </div>

          <div className="border border-(--color-line-hairline) bg-(--color-bg-elevated) p-6 lg:p-8">
            <Caption>5-second read</Caption>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <BrassNumeral className="text-[42px] leading-none">
                  {reportUsesCsv ? ratio(summary.roas) : `${projection.roasLow.toFixed(1)}-${projection.roasHigh.toFixed(1)}x`}
                </BrassNumeral>
                <Body className="mt-2 text-[14px]">ROAS range</Body>
              </div>
              <div>
                <BrassNumeral className="text-[42px] leading-none">
                  {reportUsesCsv ? money(summary.cpl) : `${money(projection.cplLow)}-${money(projection.cplHigh)}`}
                </BrassNumeral>
                <Body className="mt-2 text-[14px]">CPL context</Body>
              </div>
            </div>
            <Body className="mt-6">
              The dashboard keeps CPL in the conversation, then moves the buyer
              to the number that matters: revenue returned per dollar of spend.
            </Body>
          </div>
        </div>
      </section>

      <section
        aria-label="Dashboard controls"
        className="sticky top-[73px] z-20 border-y border-(--color-line-hairline) bg-(--color-bg-canvas)/92 px-6 py-3 backdrop-blur-xl lg:px-12"
      >
        <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-3 gap-2">
            <TabButton active={view === "proposal"} onClick={() => setView("proposal")}>
              Proposal ROI
            </TabButton>
            <TabButton active={view === "csv"} onClick={() => setView("csv")}>
              CSV ROAS
            </TabButton>
            <TabButton active={view === "report"} onClick={() => setView("report")}>
              PDF Report
            </TabButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Caption>Data source</Caption>
            <span className="border border-(--color-line-hairline) px-3 py-2 text-sm text-(--color-ink-secondary)">
              Meta Sheet CSV
            </span>
            <PrintButton onClick={printReport} />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1680px]">
          {view === "proposal" && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,0.72fr)_minmax(0,1.28fr)]">
              <aside className="border border-(--color-line-hairline) bg-(--color-bg-elevated) p-6 lg:p-8">
                <Eyebrow>Discovery call model</Eyebrow>
                <H2
                  className="mt-4 text-[38px] leading-[1.05] tracking-[0]"
                >
                  Inputs that make the money story visible.
                </H2>
                <div className="mt-8">
                  <NumberInput
                    label="Monthly ad spend"
                    value={adSpend}
                    min={500}
                    max={50000}
                    step={100}
                    prefix="$"
                    onChange={setAdSpend}
                  />
                  <NumberInput
                    label="Average job size"
                    value={averageJobSize}
                    min={1000}
                    max={75000}
                    step={500}
                    prefix="$"
                    onChange={setAverageJobSize}
                  />
                </div>
              </aside>

              <div className="space-y-10">
                <div>
                  <Eyebrow>Creative type</Eyebrow>
                  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {creativePresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setCreativeId(preset.id)}
                        className={`min-h-[168px] border p-5 text-left transition-colors ${
                          preset.id === creativeId
                            ? "border-(--color-accent-primary) bg-(--color-accent-primary) text-(--color-accent-on-accent)"
                            : "border-(--color-line-hairline) bg-(--color-bg-elevated) text-(--color-ink-primary) hover:border-(--color-accent-primary)"
                        }`}
                      >
                        <Caption
                          className={
                            preset.id === creativeId
                              ? "text-(--color-accent-on-accent)"
                              : "text-(--color-accent-primary)"
                          }
                        >
                          {preset.shortLabel}
                        </Caption>
                        <H3
                          className="mt-5 text-[28px] leading-[1.05] tracking-[0]"
                        >
                          {preset.label}
                        </H3>
                        <p
                          className={`mt-4 text-sm leading-[1.45] ${
                            preset.id === creativeId
                              ? "text-(--color-accent-on-accent)/80"
                              : "text-(--color-ink-secondary)"
                          }`}
                        >
                          {preset.fit}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                  <KpiCard
                    label="Projected revenue"
                    value={`${compactMoney(projection.revenueLow)} - ${compactMoney(projection.revenueHigh)}`}
                    context="Range after lead quality, close rate, and job value lift."
                    tone="accent"
                  />
                  <KpiCard
                    label="Projected ROAS"
                    value={`${projection.roasLow.toFixed(1)}-${projection.roasHigh.toFixed(1)}x`}
                    context="Return modeled from revenue, not from cheap lead volume."
                  />
                  <KpiCard
                    label="Lead range"
                    value={`${Math.round(projection.leadsLow)}-${Math.round(projection.leadsHigh)}`}
                    context={`${money(projection.cplLow)}-${money(projection.cplHigh)} CPL for this creative.`}
                  />
                  <KpiCard
                    label="Close rate"
                    value={`${percent(projection.closeLow)}-${percent(projection.closeHigh)}`}
                    context="Higher-intent creative should improve fit and buying readiness."
                  />
                </div>

                <div className="grid grid-cols-1 gap-8 border border-(--color-line-hairline) p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
                  <div className="space-y-7">
                    <div>
                      <Eyebrow>CPL is not the finish line</Eyebrow>
                      <H2
                        className="mt-4 text-[38px] leading-[1.05] tracking-[0]"
                      >
                        The more targeted ad can win with the higher CPL.
                      </H2>
                      <Body className="mt-5 max-w-3xl">
                        {selectedPreset.readout} The question is not "How cheap
                        was the form fill?" The question is "What revenue did
                        that lead make possible?"
                      </Body>
                    </div>
                    <RangeLine
                      label="Revenue range"
                      low={projection.revenueLow}
                      high={projection.revenueHigh}
                      formatter={compactMoney}
                      max={Math.max(projection.revenueHigh, broadProjection.revenueHigh)}
                    />
                    <RangeLine
                      label="Revenue per lead"
                      low={projection.valuePerLeadLow}
                      high={projection.valuePerLeadHigh}
                      formatter={money}
                      max={Math.max(projection.valuePerLeadHigh, broadProjection.valuePerLeadHigh)}
                    />
                    <RangeLine
                      label="Closed jobs"
                      low={projection.closedLow}
                      high={projection.closedHigh}
                      formatter={(value) => numberFormatter.format(value)}
                      max={Math.max(projection.closedHigh, broadProjection.closedHigh)}
                    />
                  </div>

                  <div className="border border-(--color-line-hairline) bg-(--color-bg-elevated) p-5">
                    <Caption>Comparison frame</Caption>
                    <div className="mt-6 space-y-6">
                      <div>
                        <p
                          className="text-[30px] leading-none text-(--color-ink-primary)"
                          style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
                        >
                          {ratio(broadProjection.roasHigh)}
                        </p>
                        <Body className="mt-2 text-[14px]">
                          Broad reel high-case ROAS at {money(broadProjection.cplLow)} CPL.
                        </Body>
                      </div>
                      <div className="h-px bg-(--color-line-hairline)" />
                      <div>
                        <p
                          className="text-[30px] leading-none text-(--color-accent-primary)"
                          style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
                        >
                          {ratio(projection.roasHigh)}
                        </p>
                        <Body className="mt-2 text-[14px]">
                          {selectedPreset.label} high-case ROAS at {money(projection.cplLow)} CPL.
                        </Body>
                      </div>
                      <Body className="text-[14px]">
                        Use this frame on the call when a buyer says, "Can we
                        just get cheaper leads?"
                      </Body>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "csv" && (
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(360px,0.62fr)_minmax(0,1.38fr)]">
              <aside className="space-y-6">
                <div className="border border-(--color-line-hairline) bg-(--color-bg-elevated) p-6 lg:p-8">
                  <Eyebrow>CSV importer</Eyebrow>
                  <H2
                    className="mt-4 text-[38px] leading-[1.05] tracking-[0]"
                  >
                    Paste the Meta Sheet export.
                  </H2>
                  <Body className="mt-5">
                    Export the Google Sheet as CSV, then paste it here or upload
                    the file. Spend plus leads are required. Revenue or closed
                    jobs makes the ROAS report stronger.
                  </Body>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <label
                      htmlFor="campaign-csv-upload"
                      className="inline-flex min-h-[48px] cursor-pointer items-center justify-center border border-(--color-accent-primary) bg-(--color-accent-primary) px-6 text-sm font-medium uppercase text-(--color-accent-on-accent)"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: 0 }}
                    >
                      Upload CSV
                    </label>
                    <input
                      id="campaign-csv-upload"
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleCsvFile}
                      className="sr-only"
                    />
                    <button
                      type="button"
                      onClick={() => setCsvText(defaultCsv)}
                      className="min-h-[48px] border border-(--color-line-hairline) px-6 text-sm font-medium uppercase text-(--color-ink-primary) hover:border-(--color-accent-primary)"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: 0 }}
                    >
                      Load Sample
                    </button>
                  </div>
                </div>

                <div className="border border-(--color-line-hairline) p-6">
                  <Caption>Fallbacks when revenue is missing</Caption>
                  <NumberInput
                    label="Average job size"
                    value={averageJobSize}
                    min={1000}
                    max={75000}
                    step={500}
                    prefix="$"
                    onChange={setAverageJobSize}
                  />
                  <NumberInput
                    label="Estimated close rate"
                    value={Math.round(fallbackCloseRate * 100)}
                    min={2}
                    max={60}
                    step={1}
                    suffix="%"
                    onChange={(value) => setFallbackCloseRate(value / 100)}
                  />
                </div>
              </aside>

              <div className="space-y-8">
                <label className="block">
                  <Caption>CSV data</Caption>
                  <textarea
                    value={csvText}
                    onChange={(event) => setCsvText(event.currentTarget.value)}
                    className="mt-4 min-h-[260px] w-full border border-(--color-line-hairline) bg-(--color-bg-elevated) p-5 font-mono text-[13px] leading-[1.55] text-(--color-ink-primary) outline-none focus:border-(--color-accent-primary)"
                    spellCheck={false}
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                  <KpiCard
                    label="Tracked spend"
                    value={compactMoney(summary.spend)}
                    context={`${Math.round(summary.leads)} leads imported from ${csvResult.rows.length} rows.`}
                    tone="accent"
                  />
                  <KpiCard
                    label="Revenue"
                    value={compactMoney(summary.revenue)}
                    context={
                      summary.estimatedRows > 0
                        ? `${summary.estimatedRows} row(s) use fallback revenue.`
                        : "All imported rows include revenue."
                    }
                  />
                  <KpiCard
                    label="ROAS"
                    value={ratio(summary.roas)}
                    context={`Average CPL is ${money(summary.cpl)}.`}
                  />
                  <KpiCard
                    label="Close quality"
                    value={percent(summary.closeRate)}
                    context={`${numberFormatter.format(summary.closedJobs)} closed jobs from imported leads.`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="border border-(--color-line-hairline) p-6 lg:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <Eyebrow>Campaign performance</Eyebrow>
                        <H2
                          className="mt-4 text-[38px] leading-[1.05] tracking-[0]"
                        >
                          Spend, revenue, and the campaigns to optimize.
                        </H2>
                      </div>
                      <Caption>{campaignGroups.length} campaigns</Caption>
                    </div>
                    <div className="mt-6">
                      {campaignGroups.length > 0 ? (
                        campaignGroups.map((campaign) => (
                          <CampaignBar
                            key={campaign.campaign}
                            campaign={campaign}
                            maxRevenue={maxRevenue}
                          />
                        ))
                      ) : (
                        <Body className="border border-(--color-line-hairline) p-6">
                          Add CSV rows to generate campaign-level readouts.
                        </Body>
                      )}
                    </div>
                  </div>

                  <div className="border border-(--color-line-hairline) bg-(--color-bg-elevated) p-6 lg:p-8">
                    <Caption>Column detection</Caption>
                    <div className="mt-6 space-y-3">
                      {(["spend", "leads", "cpl", "closedJobs", "revenue"] as CsvField[]).map(
                        (field) => (
                          <div
                            key={field}
                            className="flex items-center justify-between gap-4 border-b border-(--color-line-hairline) pb-3"
                          >
                            <span className="text-sm text-(--color-ink-muted)">
                              {fieldLabels[field]}
                            </span>
                            <span className="max-w-[180px] truncate text-right text-sm text-(--color-ink-primary)">
                              {fieldStatus(field, csvResult.map, csvResult.headers)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    {csvResult.errors.length > 0 && (
                      <div className="mt-6 border border-(--color-state-error) p-4 text-sm text-(--color-state-error)">
                        {csvResult.errors.join(" ")}
                      </div>
                    )}
                    <Body className="mt-6 text-[14px]">
                      The importer accepts common Meta export names like Amount
                      Spent, Results, Leads, Cost Per Lead, Campaign Name, and
                      Purchase Conversion Value.
                    </Body>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "report" && (
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(320px,0.48fr)_minmax(0,1.52fr)]">
              <aside className="print-hide border border-(--color-line-hairline) bg-(--color-bg-elevated) p-6 lg:p-8">
                <Eyebrow>Report builder</Eyebrow>
                <H2
                  className="mt-4 text-[38px] leading-[1.05] tracking-[0]"
                >
                  Client-ready in one print.
                </H2>
                <div className="mt-8 space-y-5">
                  <label className="block">
                    <Caption>Client name</Caption>
                    <input
                      value={reportClient}
                      onChange={(event) => setReportClient(event.currentTarget.value)}
                      className="mt-3 min-h-[48px] w-full border border-(--color-line-hairline) bg-transparent px-4 text-[16px] outline-none focus:border-(--color-accent-primary)"
                    />
                  </label>
                  <label className="block">
                    <Caption>Report period</Caption>
                    <input
                      value={reportPeriod}
                      onChange={(event) => setReportPeriod(event.currentTarget.value)}
                      className="mt-3 min-h-[48px] w-full border border-(--color-line-hairline) bg-transparent px-4 text-[16px] outline-none focus:border-(--color-accent-primary)"
                    />
                  </label>
                  <label className="block">
                    <Caption>Executive note</Caption>
                    <textarea
                      value={reportNote}
                      onChange={(event) => setReportNote(event.currentTarget.value)}
                      className="mt-3 min-h-[150px] w-full border border-(--color-line-hairline) bg-transparent p-4 text-[16px] leading-[1.5] outline-none focus:border-(--color-accent-primary)"
                    />
                  </label>
                  <PrintButton onClick={printReport} />
                </div>
              </aside>

              <ReportPreview
                reportClient={reportClient}
                reportPeriod={reportPeriod}
                reportNote={reportNote}
                reportUsesCsv={reportUsesCsv}
                summary={summary}
                campaignGroups={campaignGroups}
                optimizationQueue={optimizationQueue}
                projection={projection}
                selectedPreset={selectedPreset}
              />
            </div>
          )}
        </div>
      </section>

      <ReportPreview
        hidden
        reportClient={reportClient}
        reportPeriod={reportPeriod}
        reportNote={reportNote}
        reportUsesCsv={reportUsesCsv}
        summary={summary}
        campaignGroups={campaignGroups}
        optimizationQueue={optimizationQueue}
        projection={projection}
        selectedPreset={selectedPreset}
      />
    </div>
  );
}

function ReportPreview({
  hidden = false,
  reportClient,
  reportPeriod,
  reportNote,
  reportUsesCsv,
  summary,
  campaignGroups,
  optimizationQueue,
  projection,
  selectedPreset,
}: {
  hidden?: boolean;
  reportClient: string;
  reportPeriod: string;
  reportNote: string;
  reportUsesCsv: boolean;
  summary: ReturnType<typeof getSummary>;
  campaignGroups: CampaignGroup[];
  optimizationQueue: ReturnType<typeof createOptimizationQueue>;
  projection: ReturnType<typeof getProjection>;
  selectedPreset: CreativePreset;
}) {
  const previewClass = hidden ? "hidden" : "";

  return (
    <article
      id={hidden ? "campaign-report" : undefined}
      className={`${previewClass} report-page border border-(--color-line-hairline) bg-(--color-bg-paper) p-6 text-[#0B0B0C] lg:p-10`}
      style={hidden ? { display: "none" } : undefined}
    >
      <header className="flex flex-col gap-8 border-b border-black/15 pb-8 md:flex-row md:items-start md:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark.webp" alt="Crave Collective" className="h-9 w-auto" />
          <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.55] text-black/65">
            Branded campaign performance report prepared for {reportClient}.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[13px] font-medium uppercase text-[#B88246]">
            {reportPeriod}
          </p>
          <h2
            className="mt-3 text-[42px] leading-[0.95]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
          >
            Campaign performance
          </h2>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-4 print-break-avoid">
        <ReportMetric
          label="Spend"
          value={reportUsesCsv ? compactMoney(summary.spend) : money(0)}
          detail={reportUsesCsv ? `${Math.round(summary.leads)} leads tracked` : "Use CSV import for actual spend"}
        />
        <ReportMetric
          label="Revenue"
          value={reportUsesCsv ? compactMoney(summary.revenue) : `${compactMoney(projection.revenueLow)}-${compactMoney(projection.revenueHigh)}`}
          detail={reportUsesCsv ? "Closed or projected value" : "Discovery-call projection"}
        />
        <ReportMetric
          label="ROAS"
          value={reportUsesCsv ? ratio(summary.roas) : `${projection.roasLow.toFixed(1)}-${projection.roasHigh.toFixed(1)}x`}
          detail={reportUsesCsv ? `${money(summary.cpl)} average CPL` : `${selectedPreset.label} model`}
        />
        <ReportMetric
          label="Close rate"
          value={reportUsesCsv ? percent(summary.closeRate) : `${percent(projection.closeLow)}-${percent(projection.closeHigh)}`}
          detail="Quality signal"
        />
      </section>

      <section className="grid grid-cols-1 gap-8 border-y border-black/15 py-8 lg:grid-cols-[minmax(0,1fr)_320px] print-break-avoid">
        <div>
          <p className="text-[13px] font-medium uppercase text-[#B88246]">
            Executive read
          </p>
          <p className="mt-4 text-[22px] leading-[1.35] text-black">
            {reportNote}
          </p>
        </div>
        <div className="border border-black/15 p-5">
          <p className="text-[13px] font-medium uppercase text-black/45">
            Scoreboard shift
          </p>
          <p className="mt-4 text-[16px] leading-[1.5] text-black/70">
            CPL explains acquisition cost. ROAS explains whether the creative
            found the right buyer.
          </p>
        </div>
      </section>

      <section className="py-8">
        <p className="text-[13px] font-medium uppercase text-[#B88246]">
          Optimization queue
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {optimizationQueue.slice(0, 3).map((item) => (
            <div key={item.title} className="border border-black/15 p-5 print-break-avoid">
              <h3
                className="text-[26px] leading-[1.05] text-black"
                style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.5] text-black/65">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {campaignGroups.length > 0 && (
        <section className="border-t border-black/15 pt-8">
          <p className="text-[13px] font-medium uppercase text-[#B88246]">
            Campaign detail
          </p>
          <div className="mt-5 overflow-hidden border border-black/15">
            <div className="grid grid-cols-[minmax(160px,1fr)_90px_90px_90px] bg-black text-[12px] font-medium uppercase text-white">
              <span className="p-3">Campaign</span>
              <span className="p-3 text-right">Spend</span>
              <span className="p-3 text-right">Revenue</span>
              <span className="p-3 text-right">ROAS</span>
            </div>
            {campaignGroups.slice(0, 6).map((campaign) => (
              <div
                key={campaign.campaign}
                className="grid grid-cols-[minmax(160px,1fr)_90px_90px_90px] border-t border-black/15 text-[13px]"
              >
                <span className="p-3">{campaign.campaign}</span>
                <span className="p-3 text-right">{compactMoney(campaign.spend)}</span>
                <span className="p-3 text-right">{compactMoney(campaign.revenue)}</span>
                <span className="p-3 text-right">{ratio(campaign.roas)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-10 border-t border-black/15 pt-5 text-[12px] uppercase text-black/45">
        Crave Collective - Meta spend, creative optimization, and campaign ROAS.
      </footer>
    </article>
  );
}

function ReportMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="border border-black/15 p-5">
      <p className="text-[12px] font-medium uppercase text-black/45">{label}</p>
      <p
        className="mt-4 text-[30px] leading-none text-black"
        style={{ fontFamily: "var(--font-display)", letterSpacing: 0 }}
      >
        {value}
      </p>
      <p className="mt-3 text-[13px] leading-[1.45] text-black/60">{detail}</p>
    </div>
  );
}
