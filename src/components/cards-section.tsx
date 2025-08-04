import { Card } from "@/components/ui/card";

export const CardsSection = () => {
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {/* Placeholders pour logos - modifiables dans l'éditeur visuel */}
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 1</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 2</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 3</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 4</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 5</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 6</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 7</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 8</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 9</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 10</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 11</div>
          </Card>
          <Card className="aspect-[3/2] flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-sm text-muted-foreground">Logo 12</div>
          </Card>
        </div>
        
      </div>
    </section>
  );
};