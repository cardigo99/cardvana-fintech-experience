import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { addBalance } from "@/lib/wallet";
import walletQR from "@/assets/wallet-qr-new.jpeg";

const AlimenterCompte = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const walletAddress = "0x37B70E97244EAcfBA47EAc8b27Adb1536C808FfC";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Adresse copiée",
      description: "L'adresse du portefeuille a été copiée",
    });
  };

  const handleConfirm = async () => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté",
        variant: "destructive",
      });
      return;
    }

    if (amount <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simuler l'envoi de la demande de vérification
    setTimeout(() => {
      // Stocker la demande de rechargement en attente
      const pendingRecharges = JSON.parse(localStorage.getItem('pendingRecharges') || '[]');
      pendingRecharges.push({
        id: `PENDING${Date.now()}`,
        userId: user.id,
        amount,
        date: new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'En cours de vérification'
      });
      localStorage.setItem('pendingRecharges', JSON.stringify(pendingRecharges));
      
      toast({
        title: "Demande envoyée",
        description: "Votre rechargement est en cours de vérification",
      });

      setIsProcessing(false);
      navigate("/mon-compte");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/mon-compte")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à mon compte
        </Button>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Alimenter mon compte</h1>
            <p className="text-muted-foreground">
              Rechargez votre solde Cardvana par crypto
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Montant à recharger (€)
              </label>
              <Input
                type="number"
                placeholder="Ex: 1000"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
              />
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Adresse du portefeuille</h3>
              <p className="text-xs text-muted-foreground mb-2">
                Réseau : ERC-20 (USDT)
              </p>
              <div className="flex items-center gap-2 bg-muted p-3 rounded">
                <code className="text-sm flex-1 break-all">{walletAddress}</code>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center py-4">
              <img
                src={walletQR}
                alt="QR Code"
                className="w-48 h-48 object-contain border rounded"
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ⚠️ Instructions importantes
              </h4>
              <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>• Envoyez uniquement des USDT (Tether)</li>
                <li>• Utilisez le réseau ERC-20 (Ethereum)</li>
                <li>• Vérifiez bien l'adresse avant d'envoyer</li>
                <li>• Le montant sera converti automatiquement</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/mon-compte")}
              >
                Annuler
              </Button>
              <Button
                className="flex-1"
                onClick={handleConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? "Traitement..." : "J'ai effectué le paiement"}
              </Button>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              ⚠️ Après avoir envoyé le paiement, cliquez sur "J'ai effectué le paiement". 
              Votre rechargement sera vérifié et le montant ajouté à votre solde.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlimenterCompte;
