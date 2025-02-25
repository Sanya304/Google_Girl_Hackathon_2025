import dynamic from "next/dynamic";

// ✅ Dynamically import the PredictiveTaxPlanning component
const PredictiveTaxPlanning = dynamic(
  () => import("@/components/PredictiveTaxPlanning"),
  { ssr: false }
);

export default function GetStartedPage() {
  return <PredictiveTaxPlanning />;
}
