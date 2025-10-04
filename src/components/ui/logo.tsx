import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <a href="/" className={cn("flex items-center space-x-3 cursor-pointer", className)}>
      <div className="relative">
        <div className="w-10 h-10 gradient-cta rounded-lg flex items-center justify-center shadow-glow">
          {/* Carte minimaliste */}
          <div className="w-7 h-5 rounded-md bg-white/90 relative overflow-hidden">
            {/* Chip de carte */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-primary/70 rounded-sm"></div>
            {/* Lignes de la carte */}
            <div className="absolute bottom-2 left-1 right-1 space-y-0.5">
              <div className="h-0.5 bg-primary/40 rounded-full w-3/4"></div>
              <div className="h-0.5 bg-primary/40 rounded-full w-1/2"></div>
            </div>
            {/* Effet holographique */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/20 to-transparent rounded-md"></div>
          </div>
        </div>
        <div className="absolute inset-0 gradient-cta rounded-lg blur-lg opacity-50 animate-glow"></div>
      </div>
      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent tracking-tight">
          Cardvana
        </span>
      )}
    </a>
  );
};