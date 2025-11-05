import { Side, Entree, Drink, Appetizer } from "@/types/order";

export const SIDES: Side[] = [
  { id: "white-rice", name: "White Steamed Rice", price: -1 },
  { id: "fried-rice", name: "Fried Rice", price: -1 },
  { id: "chow-mein", name: "Chow Mein", price: -1 },
  { id: "super-greens", name: "Super Greens", price: -1 },
];

export const ENTREES: Entree[] = [
  { id: "honey-walnut-shrimp", name: "Honey Walnut Shrimp", price: -1 },
  { id: "black-pepper-steak", name: "Black Pepper Sirloin Steak", price: -1 },
  { id: "mushroom-chicken", name: "Mushroom Chicken", price: -1 },
  { id: "kung-pao-chicken", name: "Kung Pao Chicken", price: -1 },
  { id: "string-bean-chicken", name: "String Bean Chicken Breast", price: -1 },
  { id: "orange-chicken", name: "Orange Chicken", price: -1 },
  { id: "honey-sesame-chicken", name: "Honey Sesame Chicken Breast", price: -1 },
  { id: "broccoli-chicken", name: "Broccoli Chicken", price: -1 },
  { id: "broccoli-beef", name: "Broccoli Beef", price: -1 },
  { id: "beijing-beef", name: "Beijing Beef", price: -1 },
  { id: "black-pepper-chicken", name: "Black Pepper Chicken", price: -1 },
];

export const DRINKS: Drink[] = [
  { id: "fountain-refill", name: "Medium Fountain Refill", price: -1 },
  { id: "bottled-water", name: "Bottled Water", price: -1 },
];

export const APPETIZERS: Appetizer[] = [
  { id: "veggie-spring-roll", name: "Veggie Spring Roll", price: -1 },
  { id: "chicken-egg-roll", name: "Chicken Egg Roll", price: -1 },
  { id: "cream-cheese-rangoon", name: "Cream Cheese Rangoon", price: -1 },
];

export const MEAL_CONFIGS = {
  alacarte: { sides: 0, entrees: 1, appetizers: 0 },
  bowl: { sides: 1, entrees: 1, appetizers: 0 },
  plate: { sides: 1, entrees: 2, appetizers: 0 },
  biggerplate: { sides: 1, entrees: 3, appetizers: 0 },
  appetizer: { sides: 0, entrees: 0, appetizers: 3 },
};
