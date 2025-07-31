import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cog, Database, BarChart3, ArrowRight } from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      icon: Cog,
      title: "Automatisation",
      description: "Automatisez vos processus de distribution de cartes cadeaux avec nos outils intelligents.",
      features: ["Distribution automatique", "Gestion des stocks", "Notifications en temps réel"]
    },
    {
      icon: Database,
      title: "API B2B",
      description: "Intégrez facilement nos services dans votre système existant avec notre API robuste.",
      features: ["API REST complète", "Documentation détaillée", "Support technique dédié"]
    },
    {
      icon: BarChart3,
      title: "Statistiques temps réel",
      description: "Suivez vos performances avec des tableaux de bord avancés et des analyses détaillées.",
      features: ["Dashboard en temps réel", "Rapports personnalisés", "Analytics avancées"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des solutions complètes pour optimiser votre gestion de cartes cadeaux, 
            que vous soyez une PME ou une grande entreprise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="gradient-card border-subtle shadow-card hover:shadow-elegant transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group border-subtle hover:border-primary/50">
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};