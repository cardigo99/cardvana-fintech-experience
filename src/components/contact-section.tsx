import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@cardvana.fr",
      href: "mailto:contact@cardvana.fr"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+33 1 23 45 67 89",
      href: "tel:+33123456789"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "123 Avenue des Champs-Élysées, 75008 Paris",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un projet ? Notre équipe est là pour vous accompagner 
            dans votre transformation digitale.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="gradient-card border-subtle shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Envoyez-nous un message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Votre prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Votre nom" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Entreprise (optionnel)</Label>
                <Input id="company" placeholder="Nom de votre entreprise" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Décrivez votre projet ou votre question..."
                  rows={6}
                />
              </div>
              
              <Button className="w-full group">
                Envoyer le message
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Informations de contact
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Notre équipe d'experts est disponible pour répondre à toutes vos questions 
                et vous accompagner dans vos projets de cartes cadeaux.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {info.content}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="pt-8">
              <div className="bg-accent/30 rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Horaires d'ouverture
                </h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Lundi - Vendredi: 9h00 - 18h00</p>
                  <p>Samedi: 10h00 - 16h00</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};