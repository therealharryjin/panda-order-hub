import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlaCarteSize } from "@/types/order";

interface SizeSelectionProps {
  onSelect: (size: AlaCarteSize) => void;
}

const sizes = [
  { value: "small" as AlaCarteSize, label: "Small", description: "Perfect for a light meal" },
  { value: "medium" as AlaCarteSize, label: "Medium", description: "Most popular choice" },
  { value: "large" as AlaCarteSize, label: "Large", description: "For bigger appetites" },
];

export const SizeSelection = ({ onSelect }: SizeSelectionProps) => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-5xl font-bold text-center text-primary">
          Select Size
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map((size) => (
            <Card
              key={size.value}
              className="p-8 hover:shadow-glow transition-all cursor-pointer border-2 flex flex-col items-center text-center"
              onClick={() => onSelect(size.value)}
            >
              <h3 className="text-3xl font-bold mb-3 text-foreground">
                {size.label}
              </h3>
              <p className="text-muted-foreground text-lg">
                {size.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
