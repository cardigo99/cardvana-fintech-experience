import { BrandCard } from "@/components/brand-card";

export const CardsSection = () => {
  const brands = [
    { name: "Amazon", logo: "/lovable-uploads/506a8cf4-4173-4136-8112-01665a8a31be.png", color: "hsl(35, 88%, 52%)" },
    { name: "Nike", logo: "/lovable-uploads/27a5124b-3253-4886-90e9-b2c6a2c0792e.png", color: "hsl(0, 0%, 0%)", textColor: "white" },
    { name: "Sephora", logo: "/lovable-uploads/cfe240b2-ff6b-4e89-be4d-b8d655f46394.png", color: "hsl(0, 0%, 0%)", textColor: "white" },
    { name: "Auchan", logo: "/lovable-uploads/a0843980-93a2-4054-9177-3a52e55bde5a.png", color: "hsl(197, 100%, 50%)" },
    { name: "Decathlon", logo: "/lovable-uploads/5ffa54bf-4bab-45da-a30e-2f9cab2ef77f.png", color: "hsl(212, 100%, 50%)" },
    { name: "Apple", logo: "/lovable-uploads/605d3b6a-939e-4c7b-b5d1-0f47e30d1d5f.png", color: "hsl(0, 0%, 15%)", textColor: "white" },
    { name: "Fnac", logo: "/lovable-uploads/f55d6a71-ef59-4a09-a9a7-dce1e8b3a4f5.png", color: "hsl(348, 100%, 47%)" },
    { name: "Zalando", logo: "/lovable-uploads/ae46c9f1-e8b3-4d26-acda-fc827e65ef80.png", color: "hsl(23, 100%, 50%)" },
    { name: "PlayStation", logo: "/lovable-uploads/340c09f1-3a7e-4515-8eac-6f523c02309a.png", color: "hsl(214, 100%, 47%)" },
    { name: "Samsung", logo: "/lovable-uploads/fea72e54-439a-4060-bc56-01c80eb7a5a5.png", color: "hsl(211, 100%, 50%)" },
    { name: "Uber", logo: "/lovable-uploads/6a08984d-0c1f-463f-acd7-e7810e927292.png", color: "hsl(0, 0%, 0%)", textColor: "white" },
    { name: "Airbnb", logo: "/lovable-uploads/27a5124b-3253-4886-90e9-b2c6a2c0792e.png", color: "hsl(348, 100%, 47%)" },
    { name: "Transcash", logo: "/lovable-uploads/4476bbbf-9f85-4fbb-ae2f-07d33934de59.png", color: "hsl(197, 100%, 50%)" },
    { name: "PCS", logo: "/lovable-uploads/b56f24a8-7c02-4790-9394-28a7aeedf45a.png", color: "hsl(120, 100%, 25%)" },
    { name: "Paysafecard", logo: "/lovable-uploads/0933b458-6ac9-4244-8d74-28f920c03d87.png", color: "hsl(52, 100%, 50%)" }
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {brands.map((brand, index) => (
            <BrandCard 
              key={index}
              name={brand.name}
              logo={brand.logo}
              color={brand.color}
              textColor={brand.textColor}
              isImage={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};