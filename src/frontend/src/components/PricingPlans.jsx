"use client";

const pricingPlans = [
  {
    title: "Basic Plan",
    price: "₹999",
    description: "Perfect for individuals looking for basic tax guidance.",
    features: ["Income Tax Filing", "Basic Consultation", "Email Support"],
  },
  {
    title: "Pro Plan",
    price: "₹2,499",
    description:
      "For professionals and small businesses needing detailed tax assistance.",
    features: [
      "Advanced Tax Filing",
      "Phone & Email Support",
      "Investment Planning",
    ],
  },
  {
    title: "Premium Plan",
    price: "₹4,999",
    description:
      "Best for businesses & high-income individuals with complex tax needs.",
    features: [
      "Personalized Tax Planning",
      "Dedicated Consultant",
      "Priority Support",
    ],
  },
];

const PricingPlans = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Our Pricing Plans</h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Choose a plan that best fits your tax filing needs.
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-semibold">{plan.title}</h2>
            <p className="text-3xl font-bold text-blue-400 my-3">
              {plan.price}
            </p>
            <p className="text-gray-300">{plan.description}</p>
            <ul className="mt-4 space-y-2 text-gray-400">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
