import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Clock } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Livraison instantanée",
      description: "Recevez vos cartes cadeaux par email en moins de 30 secondes"
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Paiements sécurisés et codes de cartes authentiques vérifiés"
    },
    {
      icon: Zap,
      title: "Interface moderne",
      description: "Une expérience utilisateur fluide et intuitive sur tous vos appareils"
    }
  ];

  return (
    <section id="about" className="py-24 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-accent/50 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-subtle">
              <span className="text-sm font-medium text-foreground">
                L'avenir de la carte commence ici
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              À propos de Cardvana
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Cardvana révolutionne la gestion et la distribution des cartes cadeaux. 
              Notre plateforme moderne facilite l'achat, la gestion et l'utilisation de cartes cadeaux 
              pour les entreprises et les particuliers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="gradient-card border-subtle shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-accent/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-subtle">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-accent"></div>
                <div className="w-10 h-10 rounded-full bg-primary/30 border-2 border-accent"></div>
                <div className="w-10 h-10 rounded-full bg-primary/40 border-2 border-accent"></div>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">+10,000 clients satisfaits</p>
                <p className="text-xs text-foreground/70">Font confiance à Cardvana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};