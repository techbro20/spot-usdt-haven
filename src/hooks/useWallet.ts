
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useWallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wallet, isLoading: isWalletLoading } = useQuery({
    queryKey: ['wallet', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('network', 'tron')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['wallet-transactions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createWallet = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      // Generate a dummy wallet address for demo purposes
      // In production, this would integrate with actual Tron wallet generation
      const walletAddress = `TR${Math.random().toString(36).substring(2, 34).toUpperCase()}`;
      const privateKeyEncrypted = 'encrypted_private_key_placeholder';

      const { data, error } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          wallet_address: walletAddress,
          private_key_encrypted: privateKeyEncrypted,
          network: 'tron',
          balance: 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      toast({
        title: 'Wallet Created',
        description: 'Your Tron wallet has been created successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create wallet. Please try again.',
        variant: 'destructive',
      });
      console.error('Wallet creation error:', error);
    },
  });

  const createTransaction = useMutation({
    mutationFn: async ({ 
      type, 
      amount, 
      toAddress 
    }: { 
      type: 'deposit' | 'withdrawal' | 'transfer_from_spot' | 'transfer_to_spot';
      amount: number;
      toAddress?: string;
    }) => {
      if (!user?.id || !wallet?.id) throw new Error('User or wallet not found');

      const { data, error } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: wallet.id,
          user_id: user.id,
          transaction_type: type,
          amount,
          currency: 'USDT',
          network: 'tron',
          to_address: toAddress,
          status: type === 'transfer_from_spot' || type === 'transfer_to_spot' ? 'confirmed' : 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      
      const action = data.transaction_type === 'deposit' ? 'Deposit' : 
                    data.transaction_type === 'withdrawal' ? 'Withdrawal' : 'Transfer';
      
      toast({
        title: `${action} Initiated`,
        description: `Your ${action.toLowerCase()} has been processed successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Transaction Failed',
        description: 'Failed to process transaction. Please try again.',
        variant: 'destructive',
      });
      console.error('Transaction error:', error);
    },
  });

  const transferFromSpot = useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!user?.id) throw new Error('User not authenticated');

      // Create spot to wallet transfer record
      const { data, error } = await supabase
        .from('spot_to_wallet_transfers')
        .insert({
          user_id: user.id,
          amount,
          currency: 'USDT',
          transfer_type: 'spot_to_wallet',
          status: 'completed'
        })
        .select()
        .single();

      if (error) throw error;

      // Create corresponding wallet transaction
      await createTransaction.mutateAsync({
        type: 'transfer_from_spot',
        amount
      });

      return data;
    },
  });

  return {
    wallet,
    transactions,
    isWalletLoading,
    isTransactionsLoading,
    createWallet: createWallet.mutate,
    createTransaction: createTransaction.mutate,
    transferFromSpot: transferFromSpot.mutate,
    isCreatingWallet: createWallet.isPending,
    isCreatingTransaction: createTransaction.isPending,
    isTransferringFromSpot: transferFromSpot.isPending,
  };
};
