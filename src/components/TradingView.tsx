
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderBook from "./OrderBook";

// Sample chart data
const data = Array.from({ length: 100 }, (_, i) => {
  const baseValue = 60000 + Math.random() * 2000;
  return {
    timestamp: new Date(Date.now() - (100 - i) * 900000).toISOString(),
    price: baseValue * (1 + Math.sin(i / 10) * 0.02)
  };
});

const TradingView = () => {
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('60100.25');
  const [sliderValue, setSliderValue] = useState([0]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (value[0] > 0) {
      setAmount((parseFloat(price) * value[0] / 100).toFixed(8));
    } else {
      setAmount('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg">BTC/USDT</CardTitle>
          <Select defaultValue="15m">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="4h">4h</SelectItem>
              <SelectItem value="1d">1D</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] w-full px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  domain={['dataMin - 100', 'dataMax + 100']} 
                  tickFormatter={(value) => value.toLocaleString()} 
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  formatter={(value: any) => [`$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 'Price']}
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader className="p-4">
          <Tabs defaultValue="spot" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="spot">Spot</TabsTrigger>
              <TabsTrigger value="convert">Convert</TabsTrigger>
            </TabsList>
            <TabsContent value="spot" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={side === 'buy' ? 'default' : 'outline'}
                    onClick={() => setSide('buy')}
                    className={side === 'buy' ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    Buy
                  </Button>
                  <Button
                    variant={side === 'sell' ? 'default' : 'outline'}
                    onClick={() => setSide('sell')}
                    className={side === 'sell' ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    Sell
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={orderType === 'limit' ? 'secondary' : 'outline'}
                    onClick={() => setOrderType('limit')}
                    size="sm"
                  >
                    Limit
                  </Button>
                  <Button
                    variant={orderType === 'market' ? 'secondary' : 'outline'}
                    onClick={() => setOrderType('market')}
                    size="sm"
                  >
                    Market
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {orderType === 'limit' && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USDT)</Label>
                      <Input 
                        id="price" 
                        value={price} 
                        onChange={handlePriceChange} 
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (BTC)</Label>
                    <Input 
                      id="amount" 
                      value={amount} 
                      onChange={handleAmountChange} 
                      placeholder="0.00000000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={100}
                      step={1}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      className={`w-full ${side === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                      {side === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground pt-2">
                    <span>Available:</span>
                    <span>12,500 USDT</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="convert" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                Convert functionality coming soon
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      <div className="lg:col-span-3">
        <OrderBook />
      </div>
    </div>
  );
};

export default TradingView;
