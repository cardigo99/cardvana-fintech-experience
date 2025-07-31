import { BrandCard } from "./brand-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import logos
import amazonLogo from "@/assets/logos/amazon.svg";
import appleLogo from "@/assets/logos/apple.png";
import sephoraLogo from "@/assets/logos/sephora.png";
import auchanLogo from "@/assets/logos/auchan.png";
import decathlonLogo from "@/assets/logos/decathlon.png";
import fnacLogo from "@/assets/logos/fnac.png";
import zalandoLogo from "@/assets/logos/zalando.png";
import playstationLogo from "@/assets/logos/playstation.png";
import spotifyLogo from "@/assets/logos/spotify.png";
import netflixLogo from "@/assets/logos/netflix.png";
import uberLogo from "@/assets/logos/uber.png";

const brands = [
  { name: "Amazon", logo: amazonLogo, color: "#232F3E", isImage: true },
  { name: "Nike", logo: "✓", color: "#FF6B35", textColor: "white" },
  { name: "Sephora", logo: sephoraLogo, color: "#000000", isImage: true },
  { name: "Auchan", logo: auchanLogo, color: "#E31E24", isImage: true },
  { name: "Decathlon", logo: decathlonLogo, color: "#0082C3", isImage: true },
  { name: "Apple", logo: appleLogo, color: "#000000", isImage: true },
  { name: "Fnac", logo: fnacLogo, color: "#E1A13A", isImage: true },
  { name: "Zalando", logo: zalandoLogo, color: "#FF6900", isImage: true },
  { name: "PlayStation", logo: playstationLogo, color: "#003791", isImage: true },
  { name: "Spotify", logo: spotifyLogo, color: "#1DB954", isImage: true },
  { name: "Netflix", logo: netflixLogo, color: "#E50914", isImage: true },
  { name: "Uber", logo: uberLogo, color: "#000000", isImage: true },
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
                isImage={brand.isImage}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="cta" size="lg" className="group">
            Voir toutes les cartes
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};