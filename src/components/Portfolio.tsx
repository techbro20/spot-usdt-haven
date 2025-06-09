
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";
import WalletManager from './WalletManager';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

const Portfolio = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', price: 60123.45, change24h: 2.5 },
    { symbol: 'ETH', price: 3456.78, change24h: 1.8 },
    { symbol: 'USDT', price: 1.00, change24h: 0.1 },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => 
        prev.map(crypto => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.01),
          change24h: crypto.change24h + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const assets = [
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      balance: '0.0345', 
      value: (0.0345 * cryptoPrices.find(p => p.symbol === 'BTC')?.price || 60123.45).toFixed(2), 
      allocation: 45,
      price: cryptoPrices.find(p => p.symbol === 'BTC')?.price || 60123.45,
      change24h: cryptoPrices.find(p => p.symbol === 'BTC')?.change24h || 2.5
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      balance: '0.512', 
      value: (0.512 * cryptoPrices.find(p => p.symbol === 'ETH')?.price || 3456.78).toFixed(2), 
      allocation: 35,
      price: cryptoPrices.find(p => p.symbol === 'ETH')?.price || 3456.78,
      change24h: cryptoPrices.find(p => p.symbol === 'ETH')?.change24h || 1.8
    },
    { 
      name: 'Tether', 
      symbol: 'USDT', 
      balance: '1500.00', 
      value: '1500.00', 
      allocation: 20,
      price: 1.00,
      change24h: 0.1
    },
  ];

  const orders = [
    { pair: 'BTC/USDT', type: 'Buy', price: '60,123.45', amount: '0.01', total: '601.23', status: 'Completed', date: '2023-05-15 14:30' },
    { pair: 'ETH/USDT', type: 'Sell', price: '3,456.78', amount: '0.2', total: '691.36', status: 'Completed', date: '2023-05-14 09:15' },
    { pair: 'BTC/USDT', type: 'Buy', price: '59,800.00', amount: '0.005', total: '299.00', status: 'Completed', date: '2023-05-13 16:45' },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#0088FE'];

  const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.value.replace(/,/g, '')), 0);
  
  const pieData = assets.map((asset) => ({
    name: asset.symbol,
    value: parseFloat(asset.value.replace(/,/g, ''))
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="text-muted-foreground">Total Balance</div>
                <div className="text-3xl font-bold mt-1">${totalValue.toLocaleString()}</div>
                <div className="text-sm text-green-500 mt-1">+$230.45 (24h)</div>
                
                <div className="mt-6 space-y-4">
                  <Button>Deposit</Button>
                  <Button variant="outline" className="ml-2">Withdraw</Button>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 h-[200px] w-full md:w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Buy Crypto</Button>
            <Button className="w-full" variant="outline">Sell Crypto</Button>
            <Button className="w-full" variant="outline">Send / Receive</Button>
            <Button className="w-full" variant="outline">View History</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="assets" className="w-full">
            <CardHeader className="pb-0">
              <TabsList>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wallet">Crypto Wallet</TabsTrigger>
              </TabsList>
            </CardHeader>
            <div className="p-6">
              <TabsContent value="assets" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2">Asset</th>
                        <th className="text-right pb-2">Price</th>
                        <th className="text-right pb-2">24h Change</th>
                        <th className="text-right pb-2">Balance</th>
                        <th className="text-right pb-2">Value (USDT)</th>
                        <th className="text-right pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((asset) => (
                        <tr key={asset.symbol} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                                {asset.symbol.substring(0, 1)}
                              </div>
                              <div>
                                <div>{asset.name}</div>
                                <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-3">
                            ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className={`text-right py-3 ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <div className="flex items-center justify-end">
                              {asset.change24h >= 0 ? 
                                <TrendingUp className="h-4 w-4 mr-1" /> : 
                                <TrendingDown className="h-4 w-4 mr-1" />
                              }
                              {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(1)}%
                            </div>
                          </td>
                          <td className="text-right py-3">{asset.balance}</td>
                          <td className="text-right py-3">${asset.value}</td>
                          <td className="text-right py-3">
                            <Button variant="ghost" size="sm">Trade</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2">Pair</th>
                        <th className="pb-2">Type</th>
                        <th className="text-right pb-2">Price</th>
                        <th className="text-right pb-2">Amount</th>
                        <th className="text-right pb-2">Total</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{order.pair}</td>
                          <td className={`py-3 ${order.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{order.type}</td>
                          <td className="text-right py-3">${order.price}</td>
                          <td className="text-right py-3">{order.amount}</td>
                          <td className="text-right py-3">${order.total}</td>
                          <td className="py-3">
                            <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">
                              {order.status}
                            </div>
                          </td>
                          <td className="py-3 text-muted-foreground text-sm">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="wallet" className="mt-0">
                <WalletManager />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
