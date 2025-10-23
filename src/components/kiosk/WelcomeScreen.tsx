import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      
      <div className="relative z-10 text-center px-8 max-w-2xl">
        <h1 className="mb-4 text-7xl font-black text-primary drop-shadow-lg">
          Panda Express
        </h1>
        <p className="mb-12 text-3xl font-semibold text-foreground">
          Welcome! Let's start your order
        </p>
        
        <Button
          variant="kiosk"
          size="xl"
          onClick={onStart}
          className="min-w-[300px]"
        >
          Start Order
        </Button>
        
        <p className="mt-8 text-sm text-muted-foreground">
          Touch anywhere to begin
        </p>
      </div>
    </div>
  );
};
