
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const assets = [
  { name: 'Bitcoin', symbol: 'BTC', balance: '0.0345', value: '2,073.45', allocation: 45 },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.512', value: '1,768.32', allocation: 35 },
  { name: 'Tether', symbol: 'USDT', balance: '1,500.00', value: '1,500.00', allocation: 20 },
];

const orders = [
  { pair: 'BTC/USDT', type: 'Buy', price: '60,123.45', amount: '0.01', total: '601.23', status: 'Completed', date: '2023-05-15 14:30' },
  { pair: 'ETH/USDT', type: 'Sell', price: '3,456.78', amount: '0.2', total: '691.36', status: 'Completed', date: '2023-05-14 09:15' },
  { pair: 'BTC/USDT', type: 'Buy', price: '59,800.00', amount: '0.005', total: '299.00', status: 'Completed', date: '2023-05-13 16:45' },
];

const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#0088FE'];

const Portfolio = () => {
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
        <CardHeader className="pb-0">
          <Tabs defaultValue="assets">
            <TabsList>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="assets" className="mt-0 pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Asset</th>
                    <th className="text-right pb-2">Balance</th>
                    <th className="text-right pb-2">Value (USDT)</th>
                    <th className="text-right pb-2">Allocation</th>
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
                      <td className="text-right py-3">{asset.balance}</td>
                      <td className="text-right py-3">${asset.value}</td>
                      <td className="text-right py-3">{asset.allocation}%</td>
                      <td className="text-right py-3">
                        <Button variant="ghost" size="sm">Trade</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="orders" className="mt-0 pt-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
