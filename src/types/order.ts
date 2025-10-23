export type MealType = "alacarte" | "bowl" | "plate" | "biggerplate";
export type AlaCarteSize = "small" | "medium" | "large";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export interface Side extends MenuItem {}
export interface Entree extends MenuItem {}
export interface Drink extends MenuItem {}

export interface OrderItem {
  mealType: MealType;
  alacarteSize?: AlaCarteSize;
  sides: Side[];
  entrees: Entree[];
  drink?: Drink;
}

export interface Order {
  items: OrderItem[];
  totalPrice: number;
}
