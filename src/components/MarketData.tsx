
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoCurrency {
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  volume: string;
}

const initialData: CryptoCurrency[] = [
  { name: "Bitcoin", symbol: "BTC/USDT", price: "60,123.45", change24h: "+2.5%", volume: "1.2B" },
  { name: "Ethereum", symbol: "ETH/USDT", price: "3,456.78", change24h: "+1.8%", volume: "430.5M" },
  { name: "Binance Coin", symbol: "BNB/USDT", price: "456.78", change24h: "-0.5%", volume: "120.3M" },
  { name: "XRP", symbol: "XRP/USDT", price: "0.5673", change24h: "+3.2%", volume: "89.7M" },
  { name: "Cardano", symbol: "ADA/USDT", price: "0.5123", change24h: "-1.2%", volume: "45.6M" },
  { name: "Solana", symbol: "SOL/USDT", price: "132.45", change24h: "+4.7%", volume: "234.1M" },
  { name: "Polkadot", symbol: "DOT/USDT", price: "7.89", change24h: "-0.8%", volume: "22.3M" },
];

const MarketData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>(initialData);
  const [sortConfig, setSortConfig] = useState<{key: keyof CryptoCurrency, direction: 'asc' | 'desc'} | null>(null);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => 
        prev.map(crypto => {
          const priceChange = Math.random() > 0.5 ? 
            parseFloat(crypto.price.replace(/,/g, '')) * (1 + Math.random() * 0.005) : 
            parseFloat(crypto.price.replace(/,/g, '')) * (1 - Math.random() * 0.005);
          
          const changeValue = Math.random() > 0.5 ? 
            parseFloat(crypto.change24h.replace('%', '').replace('+', '')) + Math.random() * 0.3 : 
            parseFloat(crypto.change24h.replace('%', '').replace('+', '')) - Math.random() * 0.3;
          
          const formattedPrice = priceChange >= 1000 ? 
            priceChange.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 
            priceChange.toFixed(4);

          const formattedChange = changeValue >= 0 ? 
            `+${changeValue.toFixed(1)}%` : 
            `${changeValue.toFixed(1)}%`;
          
          return {
            ...crypto,
            price: formattedPrice,
            change24h: formattedChange
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const requestSort = (key: keyof CryptoCurrency) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...cryptoData].sort((a, b) => {
    if (!sortConfig) return 0;

    if (sortConfig.key === 'price' || sortConfig.key === 'change24h' || sortConfig.key === 'volume') {
      const valueA = parseFloat(a[sortConfig.key].replace(/[^0-9.-]+/g, ''));
      const valueB = parseFloat(b[sortConfig.key].replace(/[^0-9.-]+/g, ''));
      return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
    }

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th onClick={() => requestSort('name')} className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50">
                  Name
                </th>
                <th onClick={() => requestSort('symbol')} className="px-4 py-3 text-left cursor-pointer hover:bg-muted/50">
                  Pair
                </th>
                <th onClick={() => requestSort('price')} className="px-4 py-3 text-right cursor-pointer hover:bg-muted/50">
                  Price
                </th>
                <th onClick={() => requestSort('change24h')} className="px-4 py-3 text-right cursor-pointer hover:bg-muted/50">
                  24h Change
                </th>
                <th onClick={() => requestSort('volume')} className="px-4 py-3 text-right cursor-pointer hover:bg-muted/50">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((crypto, index) => (
                <tr key={crypto.symbol} className="border-b hover:bg-muted/20">
                  <td className="px-4 py-3">
                    {crypto.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {crypto.symbol}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${crypto.price}
                  </td>
                  <td className={`px-4 py-3 text-right ${crypto.change24h.startsWith('+') ? 'price-up' : 'price-down'}`}>
                    <div className="flex items-center justify-end">
                      {crypto.change24h.startsWith('+') ? 
                        <TrendingUp className="h-4 w-4 mr-1" /> : 
                        <TrendingDown className="h-4 w-4 mr-1" />
                      }
                      {crypto.change24h}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    ${crypto.volume}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketData;
