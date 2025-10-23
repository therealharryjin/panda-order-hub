import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MealType } from "@/types/order";

interface MealTypeSelectionProps {
  onSelect: (mealType: MealType) => void;
}

const mealTypes = [
  {
    type: "alacarte" as MealType,
    title: "A La Carte",
    description: "Choose your favorite entree in 3 sizes",
    details: "Small, Medium, or Large",
  },
  {
    type: "bowl" as MealType,
    title: "Bowl",
    description: "1 Side & 1 Entree",
    details: "Perfect single serving",
  },
  {
    type: "plate" as MealType,
    title: "Plate",
    description: "1 Side & 2 Entrees",
    details: "More variety",
  },
  {
    type: "biggerplate" as MealType,
    title: "Bigger Plate",
    description: "1 Side & 3 Entrees",
    details: "Maximum flavor",
  },
];

export const MealTypeSelection = ({ onSelect }: MealTypeSelectionProps) => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-8 text-5xl font-bold text-center text-primary">
          Choose Your Meal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealTypes.map((meal) => (
            <Card
              key={meal.type}
              className="p-8 hover:shadow-glow transition-all cursor-pointer border-2"
              onClick={() => onSelect(meal.type)}
            >
              <h3 className="text-3xl font-bold mb-3 text-foreground">
                {meal.title}
              </h3>
              <p className="text-xl mb-2 text-primary font-semibold">
                {meal.description}
              </p>
              <p className="text-muted-foreground text-lg">
                {meal.details}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
