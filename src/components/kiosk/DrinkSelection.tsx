import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drink } from "@/types/order";
import { DRINKS } from "@/data/menu";

interface DrinkSelectionProps {
  onSelect: (drink?: Drink) => void;
}

export const DrinkSelection = ({ onSelect }: DrinkSelectionProps) => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-5xl font-bold text-center text-primary">
          Add a Drink? (Optional)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {DRINKS.map((drink) => (
            <Card
              key={drink.id}
              className="p-8 hover:shadow-glow transition-all cursor-pointer border-2 text-center"
              onClick={() => onSelect(drink)}
            >
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                {drink.name}
              </h3>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="kioskOutline"
            size="xl"
            onClick={() => onSelect(undefined)}
            className="min-w-[300px]"
          >
            No Drink, Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
