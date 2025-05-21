
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginTab, setLoginTab] = useState("login");
  const { user } = useAuth();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trade Crypto With <span className="text-primary">Confidence</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Buy, sell, and trade cryptocurrencies with our secure and user-friendly platform. 
              Get started with USDT trading in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <>
                  <Button 
                    size="lg" 
                    className="crypto-gradient hover:opacity-90 transition-opacity"
                    asChild
                  >
                    <Link to="/trade">Start Trading</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    asChild
                  >
                    <Link to="/portfolio">My Portfolio</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => {
                      setLoginTab("register");
                      setShowLogin(true);
                    }}
                    size="lg"
                    className="crypto-gradient hover:opacity-90 transition-opacity"
                  >
                    Create Account
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      setLoginTab("login");
                      setShowLogin(true);
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
            <div className="mt-6 flex items-center text-sm text-muted-foreground">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800"
                  />
                ))}
              </div>
              <p>Trusted by <span className="font-semibold text-primary">10,000+</span> traders worldwide</p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Bitcoin", symbol: "BTC", price: "$60,123.45", change: "+2.5%" },
                  { name: "Ethereum", symbol: "ETH", price: "$3,456.78", change: "+1.8%" },
                  { name: "Tether", symbol: "USDT", price: "$1.00", change: "+0.1%" },
                  { name: "BNB", symbol: "BNB", price: "$456.78", change: "-0.5%" },
                ].map((coin) => (
                  <div key={coin.symbol} className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{coin.name}</span>
                      <span className="text-xs text-muted-foreground">{coin.symbol}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-bold">{coin.price}</span>
                      <span className={coin.change.startsWith("+") ? "price-up" : "price-down"}>
                        {coin.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal 
        open={showLogin} 
        onOpenChange={setShowLogin} 
        defaultTab={loginTab}
      />
    </section>
  );
};

export default Hero;
