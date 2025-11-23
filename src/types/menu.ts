export interface MenuItemResponse {
  menu_item_id: number;
  name: string;
  type: "Side" | "Entree" | "Drink" | "Appetizer";
  is_premium: boolean;
  is_active: boolean;
}

export interface PriceResponse {
  price_id: number;
  type: string;
  size: string;
  price: number;
}

export interface MenuData {
  items: MenuItemResponse[];
  prices: PriceResponse[];
}
