import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice RH, TechCorp",
      content: "Cardvana a transformé notre façon de gérer les récompenses employés. Interface intuitive et service client exceptionnel.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Pierre Martin",
      role: "CEO, StartupLab",
      content: "L'API de Cardvana s'est intégrée parfaitement à notre plateforme. Nos clients adorent la simplicité du processus.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Sophie Chen",
      role: "Manager, RetailPlus",
      content: "Excellent service ! La livraison instantanée et la variété des cartes disponibles font toute la différence.",
      rating: 5,
      avatar: "👩‍🏫"
    }
  ];

  return (
    <section className="py-24 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez pourquoi plus de 10,000 entreprises font confiance à Cardvana 
            pour leurs besoins en cartes cadeaux.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="gradient-card border-subtle shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};