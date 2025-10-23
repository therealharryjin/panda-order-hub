import { useState } from "react";
import { OrderProvider, useOrder } from "@/components/OrderContext";
import { WelcomeScreen } from "@/components/kiosk/WelcomeScreen";
import { MealTypeSelection } from "@/components/kiosk/MealTypeSelection";
import { SizeSelection } from "@/components/kiosk/SizeSelection";
import { ItemSelection } from "@/components/kiosk/ItemSelection";
import { DrinkSelection } from "@/components/kiosk/DrinkSelection";
import { OrderSummary } from "@/components/kiosk/OrderSummary";
import { ConfirmationScreen } from "@/components/kiosk/ConfirmationScreen";
import { SIDES, ENTREES, MEAL_CONFIGS } from "@/data/menu";
import { MealType, AlaCarteSize, Side, Entree, Drink } from "@/types/order";

type Step = 
  | "welcome" 
  | "mealType" 
  | "size" 
  | "sides" 
  | "entrees" 
  | "drinks" 
  | "summary" 
  | "confirmation";

const KioskFlow = () => {
  const [step, setStep] = useState<Step>("welcome");
  const { currentItem, setCurrentItem, addItemToOrder, order, clearOrder } = useOrder();

  const handleMealTypeSelect = (mealType: MealType) => {
    setCurrentItem({ mealType, sides: [], entrees: [] });
    
    if (mealType === "alacarte") {
      setStep("size");
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
    setStep("drinks");
  };

  const handleDrinkSelect = (drink?: Drink) => {
    setCurrentItem({ ...currentItem, drink });
    addItemToOrder();
    setStep("summary");
  };

  const handleAddAnother = () => {
    setStep("mealType");
  };

  const handleCheckout = () => {
    setStep("confirmation");
  };

  const handleNewOrder = () => {
    clearOrder();
    setStep("welcome");
  };

  const getMealConfig = () => {
    if (!currentItem?.mealType) return { sides: 0, entrees: 0 };
    return MEAL_CONFIGS[currentItem.mealType];
  };

  return (
    <>
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("mealType")} />}
      
      {step === "mealType" && <MealTypeSelection onSelect={handleMealTypeSelect} />}
      
      {step === "size" && <SizeSelection onSelect={handleSizeSelect} />}
      
      {step === "sides" && (
        <ItemSelection
          title="Choose Your Side"
          items={SIDES}
          maxSelection={getMealConfig().sides}
          selectedItems={currentItem?.sides || []}
          onSelect={handleSidesSelect}
          onContinue={handleSidesContinue}
        />
      )}
      
      {step === "entrees" && (
        <ItemSelection
          title={getMealConfig().entrees > 1 ? "Choose Your Entrees" : "Choose Your Entree"}
          items={ENTREES}
          maxSelection={getMealConfig().entrees}
          selectedItems={currentItem?.entrees || []}
          onSelect={handleEntreesSelect}
          onContinue={handleEntreesContinue}
        />
      )}
      
      {step === "drinks" && <DrinkSelection onSelect={handleDrinkSelect} />}
      
      {step === "summary" && (
        <OrderSummary
          order={order}
          onAddAnother={handleAddAnother}
          onCheckout={handleCheckout}
        />
      )}
      
      {step === "confirmation" && <ConfirmationScreen onNewOrder={handleNewOrder} />}
    </>
  );
};

const Index = () => {
  return (
    <OrderProvider>
      <KioskFlow />
    </OrderProvider>
  );
};

export default Index;
