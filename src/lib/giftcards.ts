import { supabase } from "@/integrations/supabase/client";

export interface GiftCard {
  id: string;
  userId: string;
  orderId: string;
  brand: string;
  amount: number;
  code: string;
  purchaseDate: string;
  status: 'active' | 'used';
}

const generateGiftCardCode = (brand: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 4;
  const segmentLength = 4;
  
  const code = Array.from({ length: segments }, () => {
    return Array.from({ length: segmentLength }, () => {
      return chars.charAt(Math.floor(Math.random() * chars.length));
    }).join('');
  }).join('-');
  
  return code;
};

export const createGiftCards = async (
  userId: string,
  orderId: string,
  items: Array<{ brand: string; quantity: number; price: number }>
): Promise<GiftCard[]> => {
  const newCards: GiftCard[] = [];

  items.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      const card: GiftCard = {
        id: `GC${Date.now()}${Math.random().toString(36).substring(7)}`,
        userId,
        orderId,
        brand: item.brand,
        amount: item.price,
        code: generateGiftCardCode(item.brand),
        purchaseDate: new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'active'
      };
      newCards.push(card);
    }
  });

  const { error } = await supabase.from('gift_cards').insert(
    newCards.map(card => ({
      user_id: card.userId,
      order_id: card.orderId,
      brand: card.brand,
      code: card.code,
      pin: null,
      amount: card.amount,
      status: card.status,
    }))
  );

  if (error) {
    console.error('Error creating gift cards:', error);
    throw error;
  }
  
  return newCards;
};

export const getGiftCards = async (): Promise<GiftCard[]> => {
  const { data, error } = await supabase.from('gift_cards').select('*').order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching gift cards:', error);
    return [];
  }
  
  return (data || []).map(card => ({
    id: card.id,
    userId: card.user_id,
    orderId: card.order_id,
    brand: card.brand,
    code: card.code,
    amount: Number(card.amount),
    purchaseDate: new Date(card.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: card.status as 'active' | 'used',
  }));
};

export const getUserGiftCards = async (userId: string): Promise<GiftCard[]> => {
  const { data, error } = await supabase
    .from('gift_cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user gift cards:', error);
    return [];
  }
  
  return (data || []).map(card => ({
    id: card.id,
    userId: card.user_id,
    orderId: card.order_id,
    brand: card.brand,
    code: card.code,
    amount: Number(card.amount),
    purchaseDate: new Date(card.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: card.status as 'active' | 'used',
  }));
};

export const getGiftCardsByOrder = async (orderId: string): Promise<GiftCard[]> => {
  const { data, error } = await supabase
    .from('gift_cards')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) {
    console.error('Error fetching gift cards by order:', error);
    return [];
  }
  
  return (data || []).map(card => ({
    id: card.id,
    userId: card.user_id,
    orderId: card.order_id,
    brand: card.brand,
    code: card.code,
    amount: Number(card.amount),
    purchaseDate: new Date(card.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: card.status as 'active' | 'used',
  }));
};

export const markGiftCardAsUsed = async (cardId: string): Promise<void> => {
  const { error } = await supabase
    .from('gift_cards')
    .update({ status: 'used' })
    .eq('id', cardId);
  
  if (error) {
    console.error('Error marking gift card as used:', error);
    throw error;
  }
};