export type MealType = "alacarte" | "bowl" | "plate" | "biggerplate" | "appetizer";
export type AlaCarteSize = "small" | "medium" | "large";
export type AppetizerSize = "small" | "large";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export interface Side extends MenuItem {}
export interface Entree extends MenuItem {}
export interface Drink extends MenuItem {}

export interface Appetizer extends MenuItem {}

export interface MealOrderItem {
  type: "meal";
  mealType: MealType;
  alacarteSize?: AlaCarteSize;
  appetizerSize?: AppetizerSize;
  sides: Side[];
  entrees: Entree[];
  appetizers?: Appetizer[];
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
