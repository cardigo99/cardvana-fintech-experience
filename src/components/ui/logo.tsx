import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-card">
          <CreditCard className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl animate-glow"></div>
      </div>
      {showText && (
        <span className="text-2xl font-bold text-foreground tracking-tight">
          Cardvana
        </span>
      )}
    </div>
  );
};