
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Portfolio</h1>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
