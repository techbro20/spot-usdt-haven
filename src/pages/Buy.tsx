
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Buy = () => {
  const [amount, setAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
      // Calculate USDT amount (assuming 1:1 conversion for simplicity)
      setReceiveAmount(value ? value : "");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Buy & Sell USDT</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Buy or Sell USDT</CardTitle>
              <CardDescription>Exchange local currency for USDT or vice versa</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buy">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="buy">Buy USDT</TabsTrigger>
                  <TabsTrigger value="sell">Sell USDT</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buy">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Fiat Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input 
                        type="text" 
                        placeholder="0.00" 
                        value={amount}
                        onChange={handleAmountChange}
                      />
                      <div className="text-sm text-muted-foreground">
                        Min: $20.00 | Max: $10,000.00
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>You will receive (USDT)</Label>
                      <Input 
                        type="text" 
                        placeholder="0.00" 
                        value={receiveAmount}
                        readOnly 
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select defaultValue="bank">
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full mt-4">Continue to Payment</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="sell">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>USDT Amount</Label>
                      <Input 
                        type="text" 
                        placeholder="0.00" 
                        value={amount}
                        onChange={handleAmountChange}
                      />
                      <div className="text-sm text-muted-foreground">
                        Min: 20 USDT | Max: 10,000 USDT
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fiat Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>You will receive</Label>
                      <Input 
                        type="text" 
                        placeholder="0.00" 
                        value={receiveAmount}
                        readOnly 
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Payout Method</Label>
                      <Select defaultValue="bank">
                        <SelectTrigger>
                          <SelectValue placeholder="Select payout method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full mt-4">Continue to Payout</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 USDT =</span>
                    <span>$1.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 USDT =</span>
                    <span>€0.92 EUR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1 USDT =</span>
                    <span>£0.79 GBP</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaction Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buy Fee</span>
                    <span>1.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sell Fee</span>
                    <span>1.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Transfer</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Card Payment</span>
                    <span>2.0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Having trouble with your purchase or sale? Our support team is here to help.
                </p>
                <Button variant="outline" className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Buy;
