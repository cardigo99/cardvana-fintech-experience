export interface Transaction {
  id: string;
  userId: string;
  type: 'recharge' | 'payment';
  amount: number;
  date: string;
  description: string;
  status: string;
}

export interface UserWallet {
  userId: string;
  balance: number;
  transactions: Transaction[];
}

const WALLET_STORAGE_KEY = 'cardvana_wallets';

export const getWallets = (): UserWallet[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(WALLET_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveWallets = (wallets: UserWallet[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallets));
};

export const getUserWallet = (userId: string): UserWallet => {
  const wallets = getWallets();
  let wallet = wallets.find(w => w.userId === userId);
  
  if (!wallet) {
    wallet = {
      userId,
      balance: 0,
      transactions: []
    };
    wallets.push(wallet);
    saveWallets(wallets);
  }
  
  return wallet;
};

export const addBalance = (userId: string, amount: number, description: string = 'Rechargement par crypto'): Transaction => {
  const wallets = getWallets();
  const walletIndex = wallets.findIndex(w => w.userId === userId);
  
  const transaction: Transaction = {
    id: `TRX${Date.now()}`,
    userId,
    type: 'recharge',
    amount,
    date: new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    description,
    status: 'Confirmé'
  };
  
  if (walletIndex !== -1) {
    wallets[walletIndex].balance += amount;
    wallets[walletIndex].transactions.push(transaction);
  } else {
    wallets.push({
      userId,
      balance: amount,
      transactions: [transaction]
    });
  }
  
  saveWallets(wallets);
  return transaction;
};

export const deductBalance = (userId: string, amount: number, description: string): boolean => {
  const wallets = getWallets();
  const walletIndex = wallets.findIndex(w => w.userId === userId);
  
  if (walletIndex === -1 || wallets[walletIndex].balance < amount) {
    return false;
  }
  
  const transaction: Transaction = {
    id: `TRX${Date.now()}`,
    userId,
    type: 'payment',
    amount: -amount,
    date: new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    description,
    status: 'Confirmé'
  };
  
  wallets[walletIndex].balance -= amount;
  wallets[walletIndex].transactions.push(transaction);
  saveWallets(wallets);
  
  return true;
};

export const getBalance = (userId: string): number => {
  const wallet = getUserWallet(userId);
  return wallet.balance;
};

export const getTransactions = (userId: string): Transaction[] => {
  const wallet = getUserWallet(userId);
  return wallet.transactions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
