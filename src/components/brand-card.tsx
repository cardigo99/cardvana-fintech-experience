import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BrandCardProps {
  name: string;
  logo: string;
  color: string;
  textColor?: string;
  className?: string;
  isImage?: boolean;
}

export const BrandCard = ({ 
  name, 
  logo, 
  color, 
  textColor = "white",
  className,
  isImage = false
}: BrandCardProps) => {
  return (
    <div className="flex flex-col items-center group">
      <Card 
        className={cn(
          "relative cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 w-full aspect-square",
          className
        )}
        style={{ backgroundColor: color }}
      >
        <div className="h-full flex items-center justify-center p-4">
          {/* Brand Logo/Icon */}
          {isImage ? (
            <img 
              src={logo} 
              alt={`${name} logo`}
              className="w-28 h-28 object-contain"
            />
          ) : (
            <div className="text-7xl" style={{ color: textColor }}>
              {logo}
            </div>
          )}
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        </div>
      </Card>
      
      {/* Brand Name outside the card */}
      <h3 className="text-base font-semibold tracking-wide text-center mt-3 text-foreground">
        {name}
      </h3>
    </div>
  );
};