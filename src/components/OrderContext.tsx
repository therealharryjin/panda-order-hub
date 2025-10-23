import React, { createContext, useContext, useState } from "react";
import { OrderItem, Order } from "@/types/order";

interface OrderContextType {
  currentItem: Partial<OrderItem> | null;
  order: Order;
  setCurrentItem: (item: Partial<OrderItem> | null) => void;
  addItemToOrder: () => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentItem, setCurrentItem] = useState<Partial<OrderItem> | null>(null);
  const [order, setOrder] = useState<Order>({ items: [], totalPrice: 0 });

  const addItemToOrder = () => {
    if (currentItem && currentItem.mealType) {
      const newItem: OrderItem = {
        mealType: currentItem.mealType,
        alacarteSize: currentItem.alacarteSize,
        sides: currentItem.sides || [],
        entrees: currentItem.entrees || [],
        drink: currentItem.drink,
      };
      
      setOrder(prev => ({
        items: [...prev.items, newItem],
        totalPrice: prev.totalPrice,
      }));
      
      setCurrentItem(null);
    }
  };

  const clearOrder = () => {
    setOrder({ items: [], totalPrice: 0 });
    setCurrentItem(null);
  };

  return (
    <OrderContext.Provider
      value={{ currentItem, order, setCurrentItem, addItemToOrder, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};
