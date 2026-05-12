#!/usr/bin/env bash
set -e
mkdir -p public/store/luts

dl() {
  local key="$1" url="$2"
  curl -sL -A "Mozilla/5.0" -e "https://www.cravecollective.co/store" -o "public/store/luts/${key}.jpg" "$url"
}

dl thumbnail   "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/1748280854218-GISUXPPXD2A38Y66U2NH/Thumbnail_2.1.1.jpg?format=2500w" &
dl after-1     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/3a4beb20-72d9-4fe8-a04f-2bf671fa8e18/After1_1.1.1.jpg?format=2500w" &
dl before-1    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/281d3d06-4a5e-43af-a2ea-9a1a0d4c49e7/Before1_1.1.2.jpg?format=2500w" &
dl after-2     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/59d930fb-5732-4d5e-8dde-a773cb54d2b2/After2_1.2.1.jpg?format=2500w" &
dl before-2    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/88d042ac-04d7-4a33-b0b9-7e7464fb23df/Before2_1.2.2.jpg?format=2500w" &
dl after-3     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/33e53bed-7151-420d-845b-3adcc4224061/After4_1.3.1.jpg?format=2500w" &
dl before-3    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/39acee6e-013f-48de-9e3f-d039a1f244cb/Before4_1.3.2.jpg?format=2500w" &
dl after-4     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/209c398d-a58e-4317-bce2-aa0190c946e4/After1_1.4.1.jpg?format=2500w" &
dl before-4    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/4b40856e-d71d-4b22-a503-3b11125fe6a4/Before1_1.4.2.jpg?format=2500w" &
dl after-5     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/0bc869a0-7c58-4ea0-9daf-456165c9a10e/After_1.5.1.jpg?format=2500w" &
dl before-5    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/404eff6f-e6de-4a00-bc23-e099742f8a15/Before_1.5.2.jpg?format=2500w" &
dl after-6     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/94e6ba1f-1248-4958-b998-de6c329ba596/After3_1.6.1.jpg?format=2500w" &
dl before-6    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/8c732a44-150c-4316-b118-e656a9530eb4/Before3_1.6.2.jpg?format=2500w" &
dl after-7     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/ca087bf5-1e74-49de-9401-9ed350ea7363/After_1.7.1.jpg?format=2500w" &
dl before-7    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/60081a0b-2bd4-4a48-b679-3aa933045088/Before_1.7.2.jpg?format=2500w" &
dl after-8     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/49905be8-25dd-4f0d-90c3-d590f48d4907/After_1.8.1.jpg?format=2500w" &
dl before-8    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/b09c38d3-6e97-4166-a077-79a82a9cbdab/Before_1.8.2.jpg?format=2500w" &
dl after-9     "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/63ed7f60-6e23-4164-aea5-845dd270b47e/After3_1.9.1.jpg?format=2500w" &
dl before-9    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/ee4e44f0-8742-426a-b0df-841a3ab41b2b/Before3_1.9.2.jpg?format=2500w" &
dl after-10    "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/84692408-e098-4fd1-9775-7bd5ddcebbc0/After2_1.10.1.jpg?format=2500w" &
dl before-10   "https://images.squarespace-cdn.com/content/v1/649711570f0b782bd0056702/a8959134-7192-4c3d-bcfb-0459c5cc33a6/Before2_1.10.2.jpg?format=2500w" &
wait
echo "done"
ls public/store/luts/ | wc -l
du -sh public/store/luts/
