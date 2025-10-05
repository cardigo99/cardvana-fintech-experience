import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Mail, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConfirmationMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="max-w-2xl w-full p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Message envoyé avec succès !
              </h1>
              <p className="text-lg text-muted-foreground">
                Merci de nous avoir contactés
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <p>Notre équipe vous répondra dans les plus brefs délais</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Délai de réponse habituel : 24-48 heures
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/contact")}
              >
                Envoyer un autre message
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationMessage;
