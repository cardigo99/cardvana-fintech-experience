import { supabase } from "@/integrations/supabase/client";

export interface PendingRecharge {
  id: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  date?: string;
}

export const getPendingRecharges = async (): Promise<PendingRecharge[]> => {
  const { data, error } = await supabase
    .from('recharges')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching recharges:', error);
    return [];
  }
  
  return (data || []).map(recharge => ({
    id: recharge.id,
    userId: recharge.user_id,
    amount: Number(recharge.amount),
    paymentMethod: recharge.payment_method,
    status: recharge.status,
    transactionId: recharge.transaction_id,
    date: new Date(recharge.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
  }));
};

export const addPendingRecharge = async (recharge: Omit<PendingRecharge, 'id' | 'date'>) => {
  const { error } = await supabase.from('recharges').insert({
    user_id: recharge.userId,
    amount: recharge.amount,
    payment_method: recharge.paymentMethod,
    status: recharge.status,
    transaction_id: recharge.transactionId,
  });

  if (error) {
    console.error('Error adding recharge:', error);
    throw error;
  }
};

export const updateRechargeStatus = async (rechargeId: string, status: string) => {
  const { error } = await supabase
    .from('recharges')
    .update({ status })
    .eq('id', rechargeId);
  
  if (error) {
    console.error('Error updating recharge status:', error);
    throw error;
  }
};