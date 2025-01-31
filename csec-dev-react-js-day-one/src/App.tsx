import "./App.css";
import { PricingCard } from "./components/PricingCard";
import { PricingCardProps } from "./components/PricingCard";
function App() {
  const pricingDetails: PricingCardProps[] = [
    {
      planName: "Basic",
      pricePerMonth: 10,
      storage: "10GB",
      features: ["Unlimited Bandwidth", "10 Email Accounts", "Basic Support"],
    },
    {
      planName: "Pro",
      pricePerMonth: 20,
      storage: "20GB",
      features: [
        "Unlimited Bandwidth",
        "50 Email Accounts",
        "Priority Support",
      ],
    },
    {
      planName: "Enterprise",
      pricePerMonth: 30,
      storage: "30GB",
      features: [
        "Unlimited Bandwidth",
        "Unlimited Email Accounts",
        "Dedicated Support",
      ],
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-800">
        <div className="flex flex-col my-6 space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:my-0">
          {pricingDetails.map((pricingDetail, index) => (
            <PricingCard key={index} {...pricingDetail} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
