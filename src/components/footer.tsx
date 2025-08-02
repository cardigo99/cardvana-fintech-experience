import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    "Support": [
      "Centre d'aide",
      "Contact"
    ],
    "Entreprise": [
      "À propos"
    ],
    "Légal": [
      "Conditions générales",
      "Politique de remboursement", 
      "Politique de réclamation",
      "Politique de confidentialité",
      "Cookies",
      "Mentions légales"
    ]
  };


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
        </div>
      </div>
    </footer>
  );
};