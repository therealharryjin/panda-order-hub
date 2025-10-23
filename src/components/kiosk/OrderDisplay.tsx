import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { Order } from "@/types/order";

interface OrderDisplayProps {
  order: Order;
  onRemoveItem: (index: number) => void;
}

const getMealTypeLabel = (mealType: string, alacarteSize?: string) => {
  if (mealType === "alacarte") {
    return `A La Carte (${alacarteSize})`;
  }
  if (mealType === "bowl") return "Bowl";
  if (mealType === "plate") return "Plate";
  if (mealType === "biggerplate") return "Bigger Plate";
  return mealType;
};

export const OrderDisplay = ({ order, onRemoveItem }: OrderDisplayProps) => {
  if (order.items.length === 0) {
    return (
      <Card className="p-6 bg-card/95 backdrop-blur">
        <h3 className="text-2xl font-bold mb-4 text-primary">Your Order</h3>
        <p className="text-muted-foreground">No items yet</p>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-primary">$0.00</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/95 backdrop-blur max-h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-bold mb-4 text-primary">Your Order</h3>
      
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div key={index} className="relative">
            {index > 0 && <Separator className="mb-4" />}
            
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                {item.type === "meal" ? (
                  <>
                    <h4 className="font-bold text-foreground">
                      {getMealTypeLabel(item.mealType, item.alacarteSize)}
                    </h4>
                    {item.sides.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Side: {item.sides.map(s => s.name).join(", ")}
                      </p>
                    )}
                    {item.entrees.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {item.entrees.length > 1 ? "Entrees" : "Entree"}: {item.entrees.map(e => e.name).join(", ")}
                      </p>
                    )}
                  </>
                ) : (
                  <h4 className="font-bold text-foreground">{item.drink.name}</h4>
                )}
                <p className="text-sm font-semibold text-primary mt-1">$--.--</p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(index)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between text-lg">
          <span className="text-muted-foreground">Items:</span>
          <span>{order.items.length}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold">
          <span>Total:</span>
          <span className="text-primary">$--.--</span>
        </div>
      </div>
    </Card>
  );
};
