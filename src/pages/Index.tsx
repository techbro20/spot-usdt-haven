
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MarketData from "@/components/MarketData";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Market Trends</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest cryptocurrency prices and market movements
              </p>
            </div>
            
            <MarketData />
            
            <div className="text-center mt-8">
              <Link to="/market">
                <Button variant="outline">View Full Markets</Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 crypto-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of traders worldwide and start your cryptocurrency trading journey today.
            </p>
            <Link to="/trade">
              <Button size="lg" variant="secondary">
                Start Trading Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
