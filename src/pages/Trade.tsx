
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TradingView from "@/components/TradingView";

const Trade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Spot Trading</h1>
        <TradingView />
      </main>
      <Footer />
    </div>
  );
};

export default Trade;
