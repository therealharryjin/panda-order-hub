import React, { createContext, useContext, useState } from "react";
import { OrderItem, MealOrderItem, DrinkOrderItem, Order, Drink } from "@/types/order";

interface OrderContextType {
  currentItem: Partial<MealOrderItem> | null;
  order: Order;
  setCurrentItem: (item: Partial<MealOrderItem> | null) => void;
  addMealToOrder: () => void;
  addDrinkToOrder: (drink: Drink) => void;
  removeItem: (index: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentItem, setCurrentItem] = useState<Partial<MealOrderItem> | null>(null);
  const [order, setOrder] = useState<Order>({ items: [], totalPrice: 0 });

  const addMealToOrder = () => {
    if (currentItem && currentItem.mealType) {
      const newItem: MealOrderItem = {
        type: "meal",
        mealType: currentItem.mealType,
        alacarteSize: currentItem.alacarteSize,
        sides: currentItem.sides || [],
        entrees: currentItem.entrees || [],
      };
      
      setOrder(prev => ({
        items: [...prev.items, newItem],
        totalPrice: prev.totalPrice,
      }));
      
      setCurrentItem(null);
    }
  };

  const addDrinkToOrder = (drink: Drink) => {
    const newItem: DrinkOrderItem = {
      type: "drink",
      drink,
    };
    
    setOrder(prev => ({
      items: [...prev.items, newItem],
      totalPrice: prev.totalPrice,
    }));
  };

  const removeItem = (index: number) => {
    setOrder(prev => ({
      items: prev.items.filter((_, i) => i !== index),
      totalPrice: prev.totalPrice,
    }));
  };

  const clearOrder = () => {
    setOrder({ items: [], totalPrice: 0 });
    setCurrentItem(null);
  };

  return (
    <OrderContext.Provider
      value={{ currentItem, order, setCurrentItem, addMealToOrder, addDrinkToOrder, removeItem, clearOrder }}
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
