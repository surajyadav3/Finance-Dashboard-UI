import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type Role = 'viewer' | 'admin';

interface StoreState {
  role: Role;
  setRole: (role: Role) => void;

  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updated: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;

  filters: {
    search: string;
    category: string;
    sortBy: 'date' | 'amount';
    sortOrder: 'asc' | 'desc';
  };
  setFilter: <K extends keyof StoreState['filters']>(key: K, value: StoreState['filters'][K]) => void;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '20/03/2026', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '22/03/2026', amount: 12000, category: 'Freelance', type: 'income', description: 'Logo Design Project' },
  { id: '3', date: '25/03/2026', amount: 4500, category: 'Food', type: 'expense', description: 'Dinner at Taj' },
  { id: '4', date: '28/03/2026', amount: 25000, category: 'Gadgets', type: 'expense', description: 'PlayStation 5' },
  { id: '5', date: '01/04/2026', amount: 95000, category: 'Salary', type: 'income', description: 'April Salary + Bonus' },
  { id: '6', date: '02/04/2026', amount: 850, category: 'Streaming', type: 'expense', description: 'Netflix Premium' },
  { id: '7', date: '03/04/2026', amount: 3200, category: 'Transportation', type: 'expense', description: 'Uber Rides' },
  { id: '8', date: '04/04/2026', amount: 15400, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '9', date: '05/04/2026', amount: 22000, category: 'Investment', type: 'income', description: 'Stock Dividends' },
  { id: '10', date: '06/04/2026', amount: 1200, category: 'Software', type: 'expense', description: 'Claude API' },
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      role: 'admin',
      setRole: (role) => set({ role }),

      transactions: mockTransactions,
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Math.random().toString(36).substr(2, 9) },
          ...state.transactions,
        ],
      })),
      updateTransaction: (id, updated) => set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, ...updated } : t
        ),
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),

      filters: {
        search: '',
        category: 'All',
        sortBy: 'date',
        sortOrder: 'desc',
      },
      setFilter: (key, value) => set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      })),
    }),
    {
      name: 'finova-dashboard-v2-storage',
    }
  )
);
