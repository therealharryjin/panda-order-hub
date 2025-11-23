import React, { createContext, useContext, useState, useEffect } from "react";
import { Side, Entree, Drink, Appetizer } from "@/types/order";
import { MenuData, MenuItemResponse, PriceResponse } from "@/types/menu";
import { fetchMenuData } from "@/services/menuService";

interface MenuContextType {
  sides: Side[];
  entrees: Entree[];
  drinks: Drink[];
  appetizers: Appetizer[];
  isLoading: boolean;
  error: Error | null;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const getPrice = (prices: PriceResponse[], type: string, itemName?: string): number => {
  // Find the price for this type
  const priceEntry = prices.find(p => p.type === type);
  return priceEntry ? priceEntry.price : 0;
};

const transformMenuData = (data: MenuData): Omit<MenuContextType, 'isLoading' | 'error'> => {
  const activeItems = data.items.filter(item => item.is_active);

  const sides: Side[] = activeItems
    .filter(item => item.type === "Side")
    .map(item => ({
      id: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      price: getPrice(data.prices, "Side", item.name)
    }));

  const entrees: Entree[] = activeItems
    .filter(item => item.type === "Entree")
    .map(item => ({
      id: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      price: getPrice(data.prices, "Entree", item.name)
    }));

  const drinks: Drink[] = activeItems
    .filter(item => item.type === "Drink")
    .map(item => ({
      id: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      price: getPrice(data.prices, "Drink", item.name)
    }));

  const appetizers: Appetizer[] = activeItems
    .filter(item => item.type === "Appetizer")
    .map(item => ({
      id: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      price: getPrice(data.prices, "Appetizer", item.name)
    }));

  return { sides, entrees, drinks, appetizers };
};

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuData, setMenuData] = useState<Omit<MenuContextType, 'isLoading' | 'error'>>({
    sides: [],
    entrees: [],
    drinks: [],
    appetizers: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMenuData();
        const transformed = transformMenuData(data);
        setMenuData(transformed);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to load menu data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuData();
  }, []);

  return (
    <MenuContext.Provider value={{ ...menuData, isLoading, error }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within MenuProvider");
  }
  return context;
};
