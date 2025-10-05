export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_STORAGE_KEY = "cardvana_cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCart = (items: CartItem[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const addToCart = (brand: string, logo: string): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.brand === brand);
  
  if (existingItem) {
    existingItem.quantity += 1;
    saveCart(cart);
  } else {
    const newItem: CartItem = {
      id: `${brand}-${Date.now()}`,
      name: "Carte cadeau",
      brand,
      price: 1000,
      quantity: 1,
      image: logo
    };
    saveCart([...cart, newItem]);
  }
};

export const updateCartItemQuantity = (id: string, change: number): void => {
  const cart = getCart();
  const updatedCart = cart.map(item =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + change) }
      : item
  );
  saveCart(updatedCart);
};

export const removeFromCart = (id: string): void => {
  const cart = getCart();
  saveCart(cart.filter(item => item.id !== id));
};

export const clearCart = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
};
