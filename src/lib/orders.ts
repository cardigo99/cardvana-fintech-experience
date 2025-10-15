import { supabase } from "@/integrations/supabase/client";

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: Array<{
    brand: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  promoCode: string;
  total: number;
  status: string;
  paymentMethod: string;
  transactionId: string;
  guestEmail?: string;
}

export const saveOrder = async (userId: string, orderData: Omit<Order, 'id' | 'userId' | 'date' | 'status' | 'transactionId'> & { guestEmail?: string }): Promise<Order> => {
  // Si paiement par solde Cardvana, le statut est "Livrée", sinon "En cours de vérification"
  const status = orderData.paymentMethod === 'Solde Cardvana' ? 'Livrée' : 'En cours de vérification';
  
  const newOrder: Order = {
    ...orderData,
    id: `CMD${Date.now()}`,
    userId,
    date: new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    status,
    transactionId: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
  };
  
  const { error } = await supabase.from('orders').insert({
    id: newOrder.id,
    user_id: newOrder.userId,
    date: newOrder.date,
    items: newOrder.items,
    subtotal: newOrder.subtotal,
    discount: newOrder.discount,
    promo_code: newOrder.promoCode,
    total: newOrder.total,
    status: newOrder.status,
    payment_method: newOrder.paymentMethod,
    transaction_id: newOrder.transactionId,
    guest_email: newOrder.guestEmail,
  });

  if (error) {
    console.error('Error saving order:', error);
    throw error;
  }
  
  return newOrder;
};

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return (data || []).map(order => ({
    id: order.id,
    userId: order.user_id,
    date: order.date,
    items: order.items as Order['items'],
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    promoCode: order.promo_code || '',
    total: Number(order.total),
    status: order.status,
    paymentMethod: order.payment_method,
    transactionId: order.transaction_id,
    guestEmail: order.guest_email || undefined,
  }));
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
  
  return (data || []).map(order => ({
    id: order.id,
    userId: order.user_id,
    date: order.date,
    items: order.items as Order['items'],
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    promoCode: order.promo_code || '',
    total: Number(order.total),
    status: order.status,
    paymentMethod: order.payment_method,
    transactionId: order.transaction_id,
    guestEmail: order.guest_email || undefined,
  }));
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
  
  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
