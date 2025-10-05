import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle2, ArrowLeft, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const PaiementCrypto = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x1234567890ABCDEF1234567890ABCDEF12345678";
  const amount = 50; // Montant à payer en USDT

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast({
      title: "Adresse copiée",
      description: "L'adresse du portefeuille a été copiée dans le presse-papiers",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    toast({
      title: "Paiement en cours de vérification",
      description: "Nous vérifions votre transaction...",
    });
    
    // Simulation de vérification
    setTimeout(() => {
      navigate("/confirmation-commande");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/panier")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Button>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold">Paiement Crypto</h1>
              <p className="text-muted-foreground">
                Envoyez le montant exact en USDT à l'adresse ci-dessous
              </p>
            </div>

            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Montant à payer</p>
                    <p className="text-3xl font-bold">{amount} USDT</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Réseau</p>
                    <p className="font-semibold">ERC-20 (Ethereum)</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Adresse du portefeuille</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={walletAddress} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button 
                      onClick={handleCopy}
                      variant="outline"
                      className="shrink-0"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Copiez cette adresse et envoyez exactement {amount} USDT depuis votre portefeuille crypto
                  </p>
                </div>

                <Separator />

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    ⚠️ Instructions importantes
                  </h3>
                  <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                    <li>• Envoyez uniquement des USDT (Tether)</li>
                    <li>• Utilisez le réseau ERC-20 (Ethereum)</li>
                    <li>• Vérifiez bien l'adresse avant d'envoyer</li>
                    <li>• Indiquez votre email dans le libellé du virement pour l'authentification</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePaymentConfirm}
                >
                  J'ai effectué le paiement
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/panier")}
                >
                  Annuler
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Après le paiement
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Cliquez sur "J'ai effectué le paiement"</li>
                <li>2. Nous vérifions automatiquement votre transaction</li>
                <li>3. Vous recevrez vos codes par email 1 minutes</li>
                <li>4. Les codes seront également disponibles dans votre compte</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaiementCrypto;
