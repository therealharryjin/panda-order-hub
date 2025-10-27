import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";


interface ItemSelectionProps {
  title: string;
  items: { id: string; name: string; price: number }[];
  maxSelection: number;
  selectedItems: { id: string; name: string; price: number }[];
  onSelect: (items: { id: string; name: string; price: number }[]) => void;
  onContinue: () => void;
  allowDuplicates?: boolean;
}

export const ItemSelection = ({
  title,
  items,
  maxSelection,
  selectedItems,
  onSelect,
  onContinue,
  allowDuplicates = true,
}: ItemSelectionProps) => {
  const toggleItem = (item: { id: string; name: string; price: number }) => {
    const count = getItemCount(item.id);
    
    if (allowDuplicates) {
      // For entrees: clicking adds another, or removes one if it exists
      if (count > 0 && selectedItems.length <= maxSelection) {
        // Remove one instance
        const index = selectedItems.findIndex((i) => i.id === item.id);
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        onSelect(newItems);
      } else if (selectedItems.length < maxSelection) {
        // Add one instance
        onSelect([...selectedItems, item]);
      }
    } else {
      // For sides: toggle on/off
      if (count > 0) {
        onSelect(selectedItems.filter((i) => i.id !== item.id));
      } else if (selectedItems.length < maxSelection) {
        onSelect([...selectedItems, item]);
      }
    }
  };

  const getItemCount = (itemId: string) => {
    return selectedItems.filter((i) => i.id === itemId).length;
  };

  const canContinue = selectedItems.length === maxSelection;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl font-bold text-primary">{title}</h2>
          <Badge variant="outline" className="text-2xl px-6 py-3">
            {selectedItems.length} / {maxSelection} selected
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {items.map((item) => {
            const count = getItemCount(item.id);
            const isSelected = count > 0;
            return (
              <Card
                key={item.id}
                className={`p-6 hover:shadow-lg transition-all cursor-pointer border-2 relative ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleItem(item)}
              >
                {isSelected && (
                  allowDuplicates ? (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                      {count}
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-5 w-5" />
                    </div>
                  )
                )}
                <h3 className="text-lg font-semibold text-center text-foreground">
                  {item.name}
                </h3>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            variant="kiosk"
            size="xl"
            onClick={onContinue}
            disabled={!canContinue}
            className="min-w-[300px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
