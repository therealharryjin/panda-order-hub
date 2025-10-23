import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmationScreenProps {
  onNewOrder: () => void;
}

export const ConfirmationScreen = ({ onNewOrder }: ConfirmationScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="h-32 w-32 text-primary" />
        </div>
        
        <h2 className="mb-4 text-6xl font-bold text-primary">
          Order Complete!
        </h2>
        
        <p className="mb-8 text-3xl text-foreground">
          Thank you for your order
        </p>
        
        <p className="mb-12 text-xl text-muted-foreground">
          Your order number will be called when ready
        </p>
        
        <Button variant="kiosk" size="xl" onClick={onNewOrder} className="min-w-[300px]">
          Start New Order
        </Button>
      </div>
    </div>
  );
};
