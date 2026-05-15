import type { Metadata } from "next";
import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { CampaignCommandCenter } from "@/components/dashboard/CampaignCommandCenter";

export const metadata: Metadata = {
  title: "Meta Campaign Dashboard - Crave Collective",
  description:
    "Crave Collective Meta campaign performance dashboard, discovery-call ROI model, CSV ROAS importer, and branded report generator.",
};

export default function MetaPage() {
  return (
    <main
      id="main-content"
      className="bg-(--color-bg-canvas) text-(--color-ink-primary)"
    >
      <Nav state="condensed" />
      <CampaignCommandCenter />
      <Footer />
    </main>
  );
}
