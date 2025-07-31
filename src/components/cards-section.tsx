import { BrandCard } from "./brand-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const brands = [
  { name: "Amazon", logo: "🛒", color: "#232F3E" },
  { name: "Nike", logo: "✓", color: "#FF6B35", textColor: "white" },
  { name: "Sephora", logo: "💄", color: "#000000" },
  { name: "Auchan", logo: "🛍️", color: "#E31E24" },
  { name: "Decathlon", logo: "⛰️", color: "#0082C3" },
  { name: "Apple", logo: "🍎", color: "#000000" },
  { name: "Fnac", logo: "📚", color: "#E1A13A", textColor: "black" },
  { name: "Zalando", logo: "👗", color: "#FF6900" },
  { name: "PlayStation", logo: "🎮", color: "#003791" },
  { name: "Spotify", logo: "🎵", color: "#1DB954", textColor: "black" },
  { name: "Netflix", logo: "🎬", color: "#E50914" },
  { name: "Uber", logo: "🚗", color: "#000000" },
];

export const CardsSection = () => {
  return (
    <section id="cards" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos cartes cadeaux
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de cartes cadeaux des plus grandes marques, 
            disponibles instantanément et en toute sécurité.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {brands.map((brand, index) => (
            <div 
              key={brand.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BrandCard
                name={brand.name}
                logo={brand.logo}
                color={brand.color}
                textColor={brand.textColor}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="outline" className="group border-subtle hover:border-primary/50">
            Voir toutes les cartes
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};