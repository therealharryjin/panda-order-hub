import { useState } from "react";
import { OrderProvider, useOrder } from "@/components/OrderContext";
import { MenuProvider, useMenu } from "@/components/MenuContext";
import { WelcomeScreen } from "@/components/kiosk/WelcomeScreen";
import { MealTypeSelection } from "@/components/kiosk/MealTypeSelection";
import { SizeSelection } from "@/components/kiosk/SizeSelection";
import { ItemSelection } from "@/components/kiosk/ItemSelection";
import { DrinkSelection } from "@/components/kiosk/DrinkSelection";
import { OrderSummary } from "@/components/kiosk/OrderSummary";
import { PaymentScreen } from "@/components/kiosk/PaymentScreen";
import { ConfirmationScreen } from "@/components/kiosk/ConfirmationScreen";
import { OrderDisplay } from "@/components/kiosk/OrderDisplay";
import { MEAL_CONFIGS } from "@/data/menu";
import { MealType, AlaCarteSize, AppetizerSize, Side, Entree, Drink, Appetizer } from "@/types/order";

type Step = 
  | "welcome" 
  | "mealType" 
  | "size" 
  | "appetizerSize"
  | "sides" 
  | "entrees" 
  | "appetizers"
  | "drinks" 
  | "summary"
  | "payment"
  | "confirmation";

const KioskFlow = () => {
  const [step, setStep] = useState<Step>("welcome");
  const { currentItem, setCurrentItem, addMealToOrder, addDrinkToOrder, removeItem, order, clearOrder } = useOrder();
  const { sides, entrees, drinks, appetizers, isLoading, error } = useMenu();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-4">Loading Menu...</div>
          <div className="text-muted-foreground">Please wait</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-destructive mb-4">Error Loading Menu</div>
          <div className="text-muted-foreground">{error.message}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleMealTypeSelect = (mealType: MealType) => {
    setCurrentItem({ type: "meal", mealType, sides: [], entrees: [], appetizers: [] });
    
    if (mealType === "alacarte") {
      setStep("size");
    } else if (mealType === "appetizer") {
      setStep("appetizerSize");
    } else if (MEAL_CONFIGS[mealType].sides > 0) {
      setStep("sides");
    } else {
      setStep("entrees");
    }
  };

  const handleSizeSelect = (size: AlaCarteSize) => {
    setCurrentItem({ ...currentItem, alacarteSize: size });
    setStep("entrees");
  };

  const handleAppetizerSizeSelect = (size: AppetizerSize) => {
    setCurrentItem({ ...currentItem, appetizerSize: size });
    setStep("appetizers");
  };

  const handleSidesSelect = (sides: Side[]) => {
    setCurrentItem({ ...currentItem, sides });
  };

  const handleSidesContinue = () => {
    setStep("entrees");
  };

  const handleEntreesSelect = (entrees: Entree[]) => {
    setCurrentItem({ ...currentItem, entrees });
  };

  const handleEntreesContinue = () => {
    addMealToOrder();
    setStep("mealType");
  };

  const handleAppetizersSelect = (appetizers: Appetizer[]) => {
    setCurrentItem({ ...currentItem, appetizers });
  };

  const handleAppetizersContinue = () => {
    addMealToOrder();
    setStep("mealType");
  };

  const handleDrinkSelect = (drink: Drink) => {
    addDrinkToOrder(drink);
    setStep("mealType");
  };

  const handleCheckout = () => {
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setStep("confirmation");
  };

  const handleBackToSummary = () => {
    setStep("summary");
  };

  const handleNewOrder = () => {
    clearOrder();
    setStep("welcome");
  };

  const getMealConfig = () => {
    if (!currentItem?.mealType) return { sides: 0, entrees: 0, appetizers: 0 };
    return MEAL_CONFIGS[currentItem.mealType];
  };

  const showOrderDisplay = step !== "welcome" && step !== "confirmation" && step !== "payment";

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        {step === "welcome" && <WelcomeScreen onStart={() => setStep("mealType")} />}
        
        {step === "mealType" && (
          <MealTypeSelection 
            onSelect={handleMealTypeSelect} 
            onSelectDrinks={() => setStep("drinks")}
          />
        )}
        
        {step === "size" && <SizeSelection onSelect={handleSizeSelect} type="alacarte" />}
        
        {step === "appetizerSize" && <SizeSelection onSelect={handleAppetizerSizeSelect} type="appetizer" />}
        
        {step === "sides" && (
          <ItemSelection
            title="Choose Your Side"
            items={sides}
            maxSelection={getMealConfig().sides}
            selectedItems={currentItem?.sides || []}
            onSelect={handleSidesSelect}
            onContinue={handleSidesContinue}
            allowDuplicates={false}
          />
        )}
        
        {step === "entrees" && (
          <ItemSelection
            title={getMealConfig().entrees > 1 ? "Choose Your Entrees" : "Choose Your Entree"}
            items={entrees}
            maxSelection={getMealConfig().entrees}
            selectedItems={currentItem?.entrees || []}
            onSelect={handleEntreesSelect}
            onContinue={handleEntreesContinue}
            allowDuplicates={true}
          />
        )}
        
        {step === "appetizers" && (
          <ItemSelection
            title="Choose Your Appetizers"
            items={appetizers}
            maxSelection={getMealConfig().appetizers}
            selectedItems={currentItem?.appetizers || []}
            onSelect={handleAppetizersSelect}
            onContinue={handleAppetizersContinue}
            allowDuplicates={true}
          />
        )}
        
        {step === "drinks" && <DrinkSelection onSelect={handleDrinkSelect} onBack={() => setStep("mealType")} />}

        {step === "payment" && (
          <PaymentScreen 
            onComplete={handlePaymentComplete}
            onBack={() => setStep("mealType")}
          />
        )}
        
        {step === "confirmation" && <ConfirmationScreen onNewOrder={handleNewOrder} />}
      </div>

      {showOrderDisplay && (
        <div className="w-96 border-l bg-card/50 backdrop-blur p-6 overflow-y-auto">
          <OrderDisplay order={order} onRemoveItem={removeItem} onCheckout={handleCheckout} />
        </div>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <MenuProvider>
      <OrderProvider>
        <KioskFlow />
      </OrderProvider>
    </MenuProvider>
  );
};

export default Index;
