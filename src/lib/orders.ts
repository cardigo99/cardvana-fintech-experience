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
}

export const saveOrder = (userId: string, orderData: Omit<Order, 'id' | 'userId' | 'date' | 'status' | 'transactionId'>): Order => {
  const orders = getOrders();
  
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
  
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  return newOrder;
};

export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const getUserOrders = (userId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.userId === userId);
};

export const updateOrderStatus = (orderId: string, status: string) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
  }
};
