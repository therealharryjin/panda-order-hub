import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/order";

interface OrderSummaryProps {
  order: Order;
  onAddMeal: () => void;
  onAddDrink: () => void;
  onCheckout: () => void;
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

export const OrderSummary = ({ order, onAddMeal, onAddDrink, onCheckout }: OrderSummaryProps) => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-5xl font-bold text-center text-primary">
          Your Order
        </h2>
        
        {order.items.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-2xl text-muted-foreground mb-6">Your order is empty</p>
            <Button variant="kiosk" size="xl" onClick={onAddMeal}>
              Start Order
            </Button>
          </Card>
        ) : (
          <>
            <Card className="p-8 mb-6">
              {order.items.map((item, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-6" />}
                  
                  {item.type === "meal" ? (
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {getMealTypeLabel(item.mealType, item.alacarteSize)}
                      </h3>
                      
                      {item.sides.length > 0 && (
                        <div className="mb-2">
                          <span className="font-semibold text-lg">Side: </span>
                          <span className="text-lg">{item.sides.map(s => s.name).join(", ")}</span>
                        </div>
                      )}
                      
                      {item.entrees.length > 0 && (
                        <div className="mb-2">
                          <span className="font-semibold text-lg">
                            {item.entrees.length > 1 ? "Entrees: " : "Entree: "}
                          </span>
                          <span className="text-lg">{item.entrees.map(e => e.name).join(", ")}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground">
                        {item.drink.name}
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </Card>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button variant="kioskOutline" size="xl" onClick={onAddMeal}>
                Add Meal
              </Button>
              <Button variant="kioskOutline" size="xl" onClick={onAddDrink}>
                Add Drink
              </Button>
              <Button variant="kiosk" size="xl" onClick={onCheckout}>
                Complete Order
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
