
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketData from "@/components/MarketData";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Cryptocurrency Markets</h1>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search markets..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <MarketData />
          </TabsContent>
          <TabsContent value="favorites" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">You don't have any favorites yet.</p>
            </div>
          </TabsContent>
          <TabsContent value="gainers" className="mt-6">
            <MarketData />
          </TabsContent>
          <TabsContent value="losers" className="mt-6">
            <MarketData />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Market;
