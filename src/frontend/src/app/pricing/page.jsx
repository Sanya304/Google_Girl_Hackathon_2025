import dynamic from "next/dynamic";

// ✅ Dynamically import the PricingPlans component to ensure it runs as a Client Component
const PricingPlans = dynamic(() => import("@/components/PricingPlans"), {
  ssr: false,
});

export default function PricingPage() {
  return <PricingPlans />;
}
