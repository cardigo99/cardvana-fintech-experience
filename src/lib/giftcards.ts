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

const GIFTCARDS_STORAGE_KEY = 'cardvana_giftcards';

export const getGiftCards = (): GiftCard[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(GIFTCARDS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveGiftCards = (cards: GiftCard[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GIFTCARDS_STORAGE_KEY, JSON.stringify(cards));
};

export const generateGiftCardCode = (brand: string): string => {
  const prefix = brand.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const createGiftCards = (
  userId: string,
  orderId: string,
  items: Array<{ brand: string; quantity: number; price: number }>
): GiftCard[] => {
  const giftCards = getGiftCards();
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

  giftCards.push(...newCards);
  saveGiftCards(giftCards);
  
  return newCards;
};

export const getUserGiftCards = (userId: string): GiftCard[] => {
  const cards = getGiftCards();
  return cards.filter(card => card.userId === userId);
};

export const getGiftCardsByOrder = (orderId: string): GiftCard[] => {
  const cards = getGiftCards();
  return cards.filter(card => card.orderId === orderId);
};

export const markGiftCardAsUsed = (cardId: string): void => {
  const cards = getGiftCards();
  const cardIndex = cards.findIndex(c => c.id === cardId);
  
  if (cardIndex !== -1) {
    cards[cardIndex].status = 'used';
    saveGiftCards(cards);
  }
};
