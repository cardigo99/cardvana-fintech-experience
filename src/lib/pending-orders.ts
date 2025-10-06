export interface PendingOrder {
  id: string;
  userId: string;
  items: Array<{ brand: string; quantity: number; price: number }>;
  amount: number;
  paymentMethod: string;
  createdAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

const PENDING_ORDERS_KEY = 'cardvana_pending_orders';

export const getPendingOrders = (): PendingOrder[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(PENDING_ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePendingOrders = (orders: PendingOrder[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PENDING_ORDERS_KEY, JSON.stringify(orders));
};

export const createPendingOrder = (
  userId: string,
  items: Array<{ brand: string; quantity: number; price: number }>,
  amount: number,
  paymentMethod: string
): PendingOrder => {
  const orders = getPendingOrders();
  
  const newOrder: PendingOrder = {
    id: `PO${Date.now()}${Math.random().toString(36).substring(7)}`,
    userId,
    items,
    amount,
    paymentMethod,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  orders.push(newOrder);
  savePendingOrders(orders);
  
  return newOrder;
};

export const getUserPendingOrders = (userId: string): PendingOrder[] => {
  const orders = getPendingOrders();
  return orders.filter(order => order.userId === userId && order.status === 'pending');
};

export const updatePendingOrderStatus = (
  orderId: string,
  status: 'verified' | 'rejected'
): void => {
  const orders = getPendingOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    savePendingOrders(orders);
  }
};
