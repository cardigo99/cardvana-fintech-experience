import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    "Produits": [
      "Cartes cadeaux",
      "API Entreprise",
      "Solutions B2B",
      "Tarifs"
    ],
    "Support": [
      "Centre d'aide",
      "Contact",
      "Documentation",
      "Statut des services"
    ],
    "Entreprise": [
      "À propos",
      "Carrières",
      "Presse",
      "Partenaires"
    ],
    "Légal": [
      "Conditions d'utilisation",
      "Politique de confidentialité",
      "Cookies",
      "Mentions légales"
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-card/50 border-t border-subtle">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Logo className="mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
                Cardvana révolutionne la gestion des cartes cadeaux avec une plateforme 
                moderne, sécurisée et intuitive.
              </p>
              
              {/* Newsletter */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Newsletter</h4>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="votre@email.com" 
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-foreground mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="bg-border" />
        
        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Cardvana. Tous droits réservés.
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 bg-accent hover:bg-accent/80 rounded-lg flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};