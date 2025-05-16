
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderBookEntry {
  price: string;
  amount: string;
  total: string;
}

const OrderBook = () => {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [lastPrice, setLastPrice] = useState("60,123.45");
  const [priceDirection, setPriceDirection] = useState<"up" | "down" | null>(null);

  // Generate mock order book data
  useEffect(() => {
    const generateOrderBookData = () => {
      const basePrice = 60100;
      const newAsks: OrderBookEntry[] = [];
      const newBids: OrderBookEntry[] = [];
      
      // Generate asks (sell orders)
      for (let i = 0; i < 12; i++) {
        const price = (basePrice + i * 2 + Math.random() * 2).toFixed(2);
        const amount = (0.01 + Math.random() * 2).toFixed(6);
        const total = (parseFloat(price) * parseFloat(amount)).toFixed(2);
        
        newAsks.push({
          price: price,
          amount: amount,
          total: total
        });
      }
      
      // Generate bids (buy orders)
      for (let i = 0; i < 12; i++) {
        const price = (basePrice - i * 2 - Math.random() * 2).toFixed(2);
        const amount = (0.01 + Math.random() * 2).toFixed(6);
        const total = (parseFloat(price) * parseFloat(amount)).toFixed(2);
        
        newBids.push({
          price: price,
          amount: amount,
          total: total
        });
      }
      
      // Sort asks in ascending order (lowest first)
      newAsks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      
      // Sort bids in descending order (highest first)
      newBids.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      
      setAsks(newAsks);
      setBids(newBids);
    };
    
    generateOrderBookData();
    const interval = setInterval(() => {
      generateOrderBookData();
      
      // Update last price
      const newPrice = 60123.45 + (Math.random() * 200 - 100);
      const formattedPrice = newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
      setLastPrice(prev => {
        const prevPrice = parseFloat(prev.replace(/,/g, ''));
        const direction = newPrice > prevPrice ? "up" : "down";
        setPriceDirection(direction);
        return formattedPrice;
      });
      
      // Reset price direction indicator after a brief delay
      setTimeout(() => setPriceDirection(null), 1000);
      
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate total volume and maximum total for visualization
  const calculateMaxTotal = (entries: OrderBookEntry[]) => {
    if (entries.length === 0) return 0;
    return Math.max(...entries.map(entry => parseFloat(entry.total)));
  };

  const maxAskTotal = calculateMaxTotal(asks);
  const maxBidTotal = calculateMaxTotal(bids);

  return (
    <Card>
      <CardHeader className="py-4 px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Order Book</CardTitle>
          <div className={`text-lg font-bold ${priceDirection === 'up' ? 'price-up' : priceDirection === 'down' ? 'price-down' : ''}`}>
            ${lastPrice}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="standard">
          <div className="px-4 border-b">
            <TabsList className="h-9">
              <TabsTrigger value="standard" className="text-xs">Standard</TabsTrigger>
              <TabsTrigger value="depth" className="text-xs">Market Depth</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="standard" className="mt-0">
            <div className="grid grid-cols-3 text-xs text-muted-foreground py-2 px-4 border-b">
              <div>Price (USDT)</div>
              <div className="text-right">Amount (BTC)</div>
              <div className="text-right">Total (USDT)</div>
            </div>
            
            <div className="order-book-container">
              {/* Asks (Sell Orders) */}
              <div className="max-h-[240px] overflow-y-auto">
                {asks.map((ask, index) => (
                  <div key={`ask-${index}`} className="grid grid-cols-3 text-xs py-1 px-4 relative">
                    <div className="absolute right-0 top-0 bottom-0 bg-red-500/10" style={{ width: `${(parseFloat(ask.total) / maxAskTotal) * 100}%` }}></div>
                    <div className="z-10 text-red-500">{parseFloat(ask.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <div className="text-right z-10">{ask.amount}</div>
                    <div className="text-right z-10">{parseFloat(ask.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </div>
                ))}
              </div>
              
              {/* Price indicator */}
              <div className={`grid grid-cols-3 text-xs py-1 px-4 border-y ${priceDirection === 'up' ? 'bg-green-500/10' : priceDirection === 'down' ? 'bg-red-500/10' : 'bg-accent/50'}`}>
                <div className={`${priceDirection === 'up' ? 'text-green-500' : priceDirection === 'down' ? 'text-red-500' : ''} font-medium`}>
                  {lastPrice}
                </div>
                <div className="text-right"></div>
                <div className="text-right"></div>
              </div>
              
              {/* Bids (Buy Orders) */}
              <div className="max-h-[240px] overflow-y-auto">
                {bids.map((bid, index) => (
                  <div key={`bid-${index}`} className="grid grid-cols-3 text-xs py-1 px-4 relative">
                    <div className="absolute right-0 top-0 bottom-0 bg-green-500/10" style={{ width: `${(parseFloat(bid.total) / maxBidTotal) * 100}%` }}></div>
                    <div className="z-10 text-green-500">{parseFloat(bid.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <div className="text-right z-10">{bid.amount}</div>
                    <div className="text-right z-10">{parseFloat(bid.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="depth" className="mt-0">
            <div className="p-8 text-center text-muted-foreground">
              Market depth visualization coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrderBook;
