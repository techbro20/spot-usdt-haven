
import { Bitcoin, ChartBar, ChartCandlestick, Coins, DollarSign } from "lucide-react";

const features = [
  {
    title: "Buy & Sell USDT",
    description: "Purchase USDT with local currency or sell to withdraw funds securely.",
    icon: DollarSign,
  },
  {
    title: "Spot Trading",
    description: "Trade various cryptocurrency pairs with advanced spot trading tools.",
    icon: ChartCandlestick,
  },
  {
    title: "Market Analysis",
    description: "Access real-time data and charts to make informed trading decisions.",
    icon: ChartBar,
  },
  {
    title: "Diverse Assets",
    description: "Trade Bitcoin, Ethereum, and other popular cryptocurrencies.",
    icon: Bitcoin,
  },
  {
    title: "Secure Custody",
    description: "Your assets are protected with industry-leading security measures.",
    icon: Coins,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Trade With Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to trade cryptocurrencies effectively
            and securely, from beginners to advanced traders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg crypto-gradient flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
