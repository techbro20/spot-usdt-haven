
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/hooks/useWallet';
import { Wallet, Send, Download, ArrowRightLeft, Copy, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WalletManager = () => {
  const { 
    wallet, 
    transactions, 
    createWallet, 
    createTransaction, 
    transferFromSpot,
    isWalletLoading,
    isCreatingWallet,
    isCreatingTransaction,
    isTransferringFromSpot
  } = useWallet();
  
  const { toast } = useToast();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Address copied to clipboard',
    });
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    
    createTransaction({
      type: 'deposit',
      amount: parseFloat(depositAmount)
    });
    setDepositAmount('');
    setDepositDialogOpen(false);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !withdrawAddress || parseFloat(withdrawAmount) <= 0) return;
    
    createTransaction({
      type: 'withdrawal',
      amount: parseFloat(withdrawAmount),
      toAddress: withdrawAddress
    });
    setWithdrawAmount('');
    setWithdrawAddress('');
    setWithdrawDialogOpen(false);
  };

  const handleTransferFromSpot = () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) return;
    
    transferFromSpot({ amount: parseFloat(transferAmount) });
    setTransferAmount('');
    setTransferDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isWalletLoading) {
    return <div className="flex justify-center p-8">Loading wallet...</div>;
  }

  if (!wallet) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Crypto Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">You don't have a wallet yet. Create one to start depositing and withdrawing crypto.</p>
            <Button 
              onClick={() => createWallet()} 
              disabled={isCreatingWallet}
              className="crypto-gradient"
            >
              {isCreatingWallet ? 'Creating...' : 'Create Tron Wallet'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Tron Wallet (TRC20)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Wallet Address</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input 
                  value={wallet.wallet_address} 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(wallet.wallet_address)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Balance</Label>
              <div className="text-2xl font-bold mt-1">
                {Number(wallet.balance || 0).toFixed(8)} USDT
              </div>
            </div>

            <div>
              <Label>Private Key</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input 
                  type={showPrivateKey ? 'text' : 'password'}
                  value={showPrivateKey ? wallet.private_key_encrypted : '••••••••••••••••'}
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                >
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep your private key secure. Never share it with anyone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Deposit */}
        <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Deposit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deposit USDT</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount">Amount (USDT)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Send USDT (TRC20) to your wallet address above. This will simulate a deposit.
              </p>
              <Button 
                onClick={handleDeposit} 
                disabled={isCreatingTransaction || !depositAmount}
                className="w-full"
              >
                {isCreatingTransaction ? 'Processing...' : 'Simulate Deposit'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Withdraw */}
        <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw USDT</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="withdraw-address">Recipient Address</Label>
                <Input
                  id="withdraw-address"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  placeholder="TR..."
                />
              </div>
              <div>
                <Label htmlFor="withdraw-amount">Amount (USDT)</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Network fee: ~1 USDT (TRC20)
              </p>
              <Button 
                onClick={handleWithdraw} 
                disabled={isCreatingTransaction || !withdrawAmount || !withdrawAddress}
                className="w-full"
              >
                {isCreatingTransaction ? 'Processing...' : 'Withdraw'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Transfer from Spot */}
        <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transfer from Spot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer from Spot Wallet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="transfer-amount">Amount (USDT)</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Transfer funds from your spot trading wallet to your crypto wallet for on-chain transactions.
              </p>
              <Button 
                onClick={handleTransferFromSpot} 
                disabled={isTransferringFromSpot || !transferAmount}
                className="w-full"
              >
                {isTransferringFromSpot ? 'Processing...' : 'Transfer'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions && transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(tx.status)}`} />
                    <div>
                      <div className="font-medium capitalize">
                        {tx.transaction_type.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </div>
                      {tx.transaction_hash && (
                        <div className="text-xs font-mono text-muted-foreground">
                          {tx.transaction_hash.substring(0, 16)}...
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {tx.transaction_type === 'withdrawal' ? '-' : '+'}
                      {Number(tx.amount).toFixed(8)} {tx.currency}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No transactions yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletManager;
