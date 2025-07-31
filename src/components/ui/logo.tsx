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
        <div className="w-10 h-10 gradient-cta rounded-xl flex items-center justify-center shadow-glow transform rotate-3">
          <div className="w-6 h-4 rounded-sm bg-background/20 relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-0.5 bg-white/80 rounded-full"></div>
          </div>
        </div>
        <div className="absolute inset-0 gradient-cta rounded-xl blur-lg opacity-50 animate-glow"></div>
      </div>
      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent tracking-tight">
          Cardvana
        </span>
      )}
    </div>
  );
};