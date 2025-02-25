import dynamic from "next/dynamic";

// ✅ Dynamically import the ConsultantForm to make sure it's a Client Component
const ConsultantForm = dynamic(() => import("@/components/ConsultantForm"), {
  ssr: false,
});

export default function ConsultantPage() {
  return <ConsultantForm />;
}
