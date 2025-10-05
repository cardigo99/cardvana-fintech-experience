import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

type CryptoType = "USDT";

interface CryptoOption {
  id: CryptoType;
  name: string;
  rate: number;
  address: string;
  symbol: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    id: "USDT",
    name: "Tether (USDT)",
    rate: 1.0,
    address: "TYASr5UV6HEcXatwdFQfqLvdLcIVjHg7tW",
    symbol: "USDT",
  },
];

const PaiementCrypto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const total = location.state?.total || 0;

  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>("USDT");
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const currentCrypto = cryptoOptions.find((c) => c.id === selectedCrypto);
  const cryptoAmount = currentCrypto ? (total * currentCrypto.rate).toFixed(8) : "0";

  const handleCopyAddress = () => {
    if (currentCrypto) {
      navigator.clipboard.writeText(currentCrypto.address);
      setCopied(true);
      toast({
        title: "Adresse copiée",
        description: "L'adresse du portefeuille a été copiée dans le presse-papier",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmPayment = () => {
    setConfirmed(true);
    toast({
      title: "Transaction enregistrée",
      description: "Nous vérifions votre paiement",
    });
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Merci pour votre commande !
            </h1>
            <p className="text-lg text-muted-foreground">
              Votre paiement est en cours de validation. Vous recevrez votre carte cadeau par e-mail sous peu.
            </p>
            <p className="text-sm text-muted-foreground">
              Le processus de confirmation peut prendre quelques minutes selon le réseau blockchain.
            </p>
            <Button onClick={() => navigate("/")} className="mt-8">
              Retour à l'accueil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/panier")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Button>

          <h1 className="text-3xl font-bold mb-2 text-foreground">Paiement en cryptomonnaie</h1>
          <p className="text-muted-foreground mb-8">
            Choisissez votre cryptomonnaie et effectuez le paiement
          </p>

          <div className="space-y-6">
            {/* Total */}
            <Card className="p-6 bg-card border-border">
              <div className="flex justify-between items-center">
                <span className="text-lg text-muted-foreground">Montant total</span>
                <span className="text-2xl font-bold text-foreground">{total.toFixed(2)} €</span>
              </div>
            </Card>

            {/* Crypto Selection */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Choisissez votre cryptomonnaie
              </h2>
              <RadioGroup
                value={selectedCrypto}
                onValueChange={(value) => setSelectedCrypto(value as CryptoType)}
                className="space-y-3"
              >
                {cryptoOptions.map((crypto) => (
                  <div
                    key={crypto.id}
                    className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <RadioGroupItem value={crypto.id} id={crypto.id} />
                    <Label
                      htmlFor={crypto.id}
                      className="flex-1 cursor-pointer text-foreground font-medium"
                    >
                      {crypto.name} ({crypto.symbol})
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            {/* Payment Details */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Détails du paiement
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                  <span className="text-muted-foreground">Montant à envoyer</span>
                  <span className="text-xl font-bold text-foreground">
                    {cryptoAmount} {currentCrypto?.symbol}
                  </span>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Adresse du portefeuille
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex-1 p-4 bg-accent/30 rounded-lg font-mono text-sm break-all text-foreground">
                      {currentCrypto?.address}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyAddress}
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Important :</strong> Envoyez exactement{" "}
                    <strong>{cryptoAmount} {currentCrypto?.symbol}</strong> à l'adresse
                    ci-dessus. Tout montant différent pourrait retarder votre commande.
                  </p>
                </div>
              </div>
            </Card>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmPayment}
              className="w-full"
              size="lg"
            >
              J'ai effectué le paiement
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaiementCrypto;
