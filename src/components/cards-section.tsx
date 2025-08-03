import { BrandCard } from "./brand-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import logos
import amazonLogo from "@/assets/logos/amazon.svg";
import appleLogo from "@/assets/logos/apple.png";
import sephoraLogo from "@/assets/logos/sephora.png";
import auchanLogo from "@/assets/logos/auchan-official.png";
import decathlonLogo from "@/assets/logos/decathlon-official.png";
import fnacLogo from "@/assets/logos/fnac-official.png";
import zalandoLogo from "@/assets/logos/zalando-official.png";
import playstationLogo from "@/assets/logos/playstation.png";
import samsungLogo from "@/assets/logos/samsung.png";
import uberLogo from "@/assets/logos/uber-new.png";
import nikeLogo from "@/assets/logos/nike-clean.png";
import airbnbLogo from "@/assets/logos/airbnb.svg";
import transcashLogo from "@/assets/logos/transcash.png";
import pcsLogo from "@/assets/logos/pcs.png";
import paysafecardLogo from "@/assets/logos/paysafecard.png";

const brands = [
  { name: "Amazon", logo: amazonLogo, color: "#232F3E", isImage: true },
  { name: "Nike", logo: nikeLogo, color: "#FF6B35", textColor: "white", isImage: true },
  { name: "Sephora", logo: sephoraLogo, color: "#000000", isImage: true },
  { name: "Auchan", logo: auchanLogo, color: "#E31E24", isImage: true },
  { name: "Decathlon", logo: decathlonLogo, color: "#0082C3", isImage: true },
  { name: "Apple", logo: appleLogo, color: "#000000", isImage: true },
  { name: "Fnac", logo: fnacLogo, color: "#E1A13A", isImage: true },
  { name: "Zalando", logo: zalandoLogo, color: "#FF6900", isImage: true },
  { name: "PlayStation", logo: playstationLogo, color: "#003791", isImage: true },
  { name: "Samsung", logo: samsungLogo, color: "#1428A0", isImage: true },
  { name: "Uber", logo: uberLogo, color: "#000000", isImage: true },
  { name: "Airbnb", logo: airbnbLogo, color: "#FF5A5F", isImage: true },
  { name: "Transcash", logo: transcashLogo, color: "#2E8B57", isImage: true },
  { name: "PCS", logo: pcsLogo, color: "#1F4E79", isImage: true },
  { name: "Paysafecard", logo: paysafecardLogo, color: "#00A651", isImage: true },
];

export const CardsSection = () => {
  return (
    <section id="cards" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Découvrez Cardvana
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            La plateforme nouvelle génération pour vos cartes cadeaux.
          </p>
        </div>
        
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Nos cartes cadeaux
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de cartes cadeaux des plus grandes marques, 
            disponibles instantanément et en toute sécurité. Simple, élégant, instantané.
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
        
      </div>
    </section>
  );
};