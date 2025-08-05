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
    <Card 
      className={cn(
        "relative group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <div className="aspect-[3/2] flex flex-col items-center justify-center p-6">
        {/* Brand Logo/Icon */}
        {isImage ? (
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="w-20 h-20 object-contain mb-4"
          />
        ) : (
          <div className="text-6xl mb-4" style={{ color: textColor }}>
            {logo}
          </div>
        )}
        
        {/* Brand Name */}
        <h3 
          className="text-lg font-semibold tracking-wide"
          style={{ color: textColor }}
        >
          {name}
        </h3>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </div>
      </div>
    </Card>
  );
};