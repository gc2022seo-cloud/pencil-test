import React, { createContext, useContext, useMemo, useState } from 'react';
import { MenuItem, Restaurant } from '../data/mockData';

export interface CartItem {
  item: MenuItem;
  qty: number;
}

interface CartContextValue {
  restaurant: Restaurant | null;
  items: CartItem[];
  totalQty: number;
  subtotal: number;
  setRestaurant: (r: Restaurant) => void;
  add: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [restaurant, setRestaurantState] = useState<Restaurant | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  const setRestaurant = (r: Restaurant) => {
    // 切換店家時清空購物車（Demo 一次只支援單一店家）
    setRestaurantState((prev) => {
      if (prev?.id !== r.id) setItems([]);
      return r;
    });
  };

  const add = (item: MenuItem) => {
    setItems((prev) => {
      const found = prev.find((c) => c.item.id === item.id);
      if (found) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const increment = (id: string) =>
    setItems((prev) =>
      prev.map((c) => (c.item.id === id ? { ...c, qty: c.qty + 1 } : c))
    );

  const decrement = (id: string) =>
    setItems((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );

  const clear = () => setItems([]);

  const totalQty = useMemo(
    () => items.reduce((s, c) => s + c.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((s, c) => s + c.qty * c.item.price, 0),
    [items]
  );

  const value: CartContextValue = {
    restaurant,
    items,
    totalQty,
    subtotal,
    setRestaurant,
    add,
    increment,
    decrement,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart 必須在 CartProvider 內使用');
  return ctx;
}
