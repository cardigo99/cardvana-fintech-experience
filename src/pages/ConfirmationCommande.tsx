import { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const ConfirmationCommande = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart after successful order
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-primary rounded-full p-6 inline-block">
                <Check className="w-16 h-16 text-primary-foreground" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Merci pour votre commande !
            </h1>
            <p className="text-xl text-muted-foreground">
              Votre commande a été confirmée avec succès
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-card border border-border rounded-xl p-8 space-y-6 shadow-lg">
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Statut</span>
                <span className="font-semibold text-foreground">Confirmée</span>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Nous avons bien reçu votre paiement et votre commande est en cours de traitement.
                </p>
                <p>
                  Vous recevrez vos codes par email dans les plus brefs délais.
                </p>
                <p className="font-medium text-foreground pt-2">
                  Merci de votre confiance ! 🎉
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="text-lg"
            >
              Retour à l'accueil
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/mon-compte")}
              className="text-lg"
            >
              Mon compte
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationCommande;
