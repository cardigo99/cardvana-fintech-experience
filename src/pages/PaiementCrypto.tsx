import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PaiementCrypto = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const walletAddress = "TXxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast({
      title: "Adresse copiée",
      description: "L'adresse du wallet a été copiée dans le presse-papier",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirmation = () => {
    toast({
      title: "Paiement en cours de vérification",
      description: "Nous vérifions votre transaction...",
    });
    setTimeout(() => {
      navigate("/confirmation-commande");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Paiement en Cryptomonnaie
            </h1>
            <p className="text-lg text-muted-foreground">
              Envoyez le montant exact en USDT (TRC20) à l'adresse ci-dessous
            </p>
          </div>

          {/* Payment Card */}
          <Card className="p-6 md:p-8 space-y-6 shadow-xl">
            {/* Amount */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Montant à payer</Label>
              <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-4 text-center">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  50.00 USDT
                </span>
                <p className="text-sm text-muted-foreground mt-2">
                  Réseau: TRC20 (Tron)
                </p>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Adresse du wallet
              </Label>
              <div className="flex gap-2">
                <Input
                  value={walletAddress}
                  readOnly
                  className="font-mono text-sm bg-muted"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div className="flex justify-center py-4">
              <div className="bg-muted border-2 border-border rounded-lg p-8 w-64 h-64 flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  QR Code<br />du wallet
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
                ⚠️ Instructions importantes
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
                <li>Envoyez uniquement de l'USDT sur le réseau TRC20</li>
                <li>Vérifiez bien l'adresse avant d'envoyer</li>
                <li>Le montant doit être exact (50.00 USDT)</li>
                <li>La livraison se fait après confirmation de la transaction</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handlePaymentConfirmation}
              >
                J'ai effectué le paiement
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/panier")}
              >
                Retour au panier
              </Button>
            </div>
          </Card>

          {/* Support Info */}
          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
            <p className="text-sm text-muted-foreground">
              En cas de problème avec votre paiement, contactez notre support avec votre ID de transaction.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaiementCrypto;
