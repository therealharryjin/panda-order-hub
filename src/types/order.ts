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

export interface MealOrderItem {
  type: "meal";
  mealType: MealType;
  alacarteSize?: AlaCarteSize;
  sides: Side[];
  entrees: Entree[];
}

export interface DrinkOrderItem {
  type: "drink";
  drink: Drink;
}

export type OrderItem = MealOrderItem | DrinkOrderItem;

export interface Order {
  items: OrderItem[];
  totalPrice: number;
}
