import { BrandCard } from "@/components/brand-card";
import { addToCart } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import nikeLogo from "@/assets/logos/nike.svg";
import sephoraLogo from "@/assets/logos/sephora.png";
import appleLogo from "@/assets/logos/apple.png";
import uberLogo from "@/assets/logos/uber-new.png";
import airbnbLogo from "@/assets/logos/airbnb.svg";

export const CardsSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (brand: string, logo: string) => {
    addToCart(brand, logo);
    toast({
      title: "Ajouté au panier",
      description: `Carte cadeau ${brand} ajoutée (1000 €)`,
    });
    navigate("/panier");
  };
  const brands = [
    { name: "Amazon", logo: "/lovable-uploads/506a8cf4-4173-4136-8112-01665a8a31be.png", color: "hsl(0, 0%, 95%)" },
    { name: "Nike", logo: nikeLogo, color: "hsl(0, 0%, 95%)" },
    { name: "Sephora", logo: sephoraLogo, color: "hsl(0, 0%, 95%)" },
    { name: "Auchan", logo: "/lovable-uploads/a0843980-93a2-4054-9177-3a52e55bde5a.png", color: "hsl(0, 0%, 95%)" },
    { name: "Decathlon", logo: "/lovable-uploads/5ffa54bf-4bab-45da-a30e-2f9cab2ef77f.png", color: "hsl(0, 0%, 95%)" },
    { name: "Apple", logo: appleLogo, color: "hsl(0, 0%, 95%)" },
    { name: "Fnac", logo: "/lovable-uploads/f55d6a71-ef59-4a09-a9a7-dce1e8b3a4f5.png", color: "hsl(0, 0%, 95%)" },
    { name: "Zalando", logo: "/lovable-uploads/ae46c9f1-e8b3-4d26-acda-fc827e65ef80.png", color: "hsl(0, 0%, 95%)" },
    { name: "PlayStation", logo: "/lovable-uploads/340c09f1-3a7e-4515-8eac-6f523c02309a.png", color: "hsl(0, 0%, 95%)" },
    { name: "Samsung", logo: "/lovable-uploads/fea72e54-439a-4060-bc56-01c80eb7a5a5.png", color: "hsl(0, 0%, 95%)" },
    { name: "Uber", logo: uberLogo, color: "hsl(0, 0%, 95%)" },
    { name: "Airbnb", logo: airbnbLogo, color: "hsl(0, 0%, 95%)" },
    { name: "Transcash", logo: "/lovable-uploads/4476bbbf-9f85-4fbb-ae2f-07d33934de59.png", color: "hsl(0, 0%, 95%)" },
    { name: "PCS", logo: "/lovable-uploads/b56f24a8-7c02-4790-9394-28a7aeedf45a.png", color: "hsl(0, 0%, 95%)" },
    { name: "Paysafecard", logo: "/lovable-uploads/0933b458-6ac9-4244-8d74-28f920c03d87.png", color: "hsl(0, 0%, 95%)" }
  ];

  return (
    <section id="cards" className="py-24 bg-background">
      <div className="container mx-auto px-4">
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
        
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {brands.map((brand, index) => (
            <BrandCard 
              key={index}
              name={brand.name}
              logo={brand.logo}
              color={brand.color}
              isImage={true}
              onClick={() => handleCardClick(brand.name, brand.logo)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};