import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Smartphone, DollarSign } from "lucide-react";

interface PaymentScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
  { id: "mobile", label: "Mobile Payment", icon: Smartphone },
  { id: "cash", label: "Cash", icon: DollarSign },
];

export const PaymentScreen = ({ onComplete, onBack }: PaymentScreenProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-5xl font-bold text-center text-primary">
          Select Payment Method
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.id}
                className={`p-8 hover:shadow-glow transition-all cursor-pointer border-2 text-center ${
                  selectedMethod === method.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <Icon className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {method.label}
                </h3>
              </Card>
            );
          })}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="kioskOutline"
            size="xl"
            onClick={onBack}
            disabled={processing}
          >
            Back to Order
          </Button>
          <Button
            variant="kiosk"
            size="xl"
            onClick={handlePayment}
            disabled={!selectedMethod || processing}
            className="min-w-[300px]"
          >
            {processing ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};
