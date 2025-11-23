import { MenuItemResponse, PriceResponse, MenuData } from "@/types/menu";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const fetchMenuData = async (): Promise<MenuData> => {
  try {
    const [itemsResponse, pricesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/menu-items`),
      fetch(`${API_BASE_URL}/prices`)
    ]);

    if (!itemsResponse.ok || !pricesResponse.ok) {
      throw new Error("Failed to fetch menu data");
    }

    const items: MenuItemResponse[] = await itemsResponse.json();
    const prices: PriceResponse[] = await pricesResponse.json();

    return { items, prices };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error;
  }
};
