import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle2, ArrowLeft, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { getCart, clearCart } from "@/lib/cart";
import { saveOrder } from "@/lib/orders";

const PaiementCrypto = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x37B70E97244EAcfBA47EAc8b27Adb1536C808FfC";
  
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    subtotal: 0,
    discount: 0,
    promoCode: ""
  });

  useEffect(() => {
    const amount = parseFloat(localStorage.getItem('payment_amount') || '0');
    const subtotal = parseFloat(localStorage.getItem('payment_subtotal') || '0');
    const discount = parseFloat(localStorage.getItem('payment_discount') || '0');
    const promoCode = localStorage.getItem('payment_promo') || '';
    
    if (amount === 0) {
      navigate("/panier");
      return;
    }
    
    setPaymentDetails({ amount, subtotal, discount, promoCode });
  }, [navigate]);

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
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour effectuer un paiement",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    toast({
      title: "Paiement en cours de vérification",
      description: "Nous vérifions votre transaction...",
    });
    
    // Récupérer les articles du panier
    const cartItems = getCart();
    
    // Sauvegarder la commande
    const order = saveOrder(user.id, {
      items: cartItems.map(item => ({
        brand: item.brand,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: paymentDetails.subtotal,
      discount: paymentDetails.discount,
      promoCode: paymentDetails.promoCode,
      total: paymentDetails.amount,
      paymentMethod: "Crypto (USDT)"
    });
    
    // Vider le panier
    clearCart();
    
    // Nettoyer les données de paiement
    localStorage.removeItem('payment_amount');
    localStorage.removeItem('payment_subtotal');
    localStorage.removeItem('payment_discount');
    localStorage.removeItem('payment_promo');
    
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
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sous-total</p>
                      <p className="text-2xl font-bold">{paymentDetails.subtotal.toFixed(2)} €</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Réseau</p>
                      <p className="font-semibold">ERC-20 (Ethereum)</p>
                    </div>
                  </div>
                  {paymentDetails.discount > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-green-600">
                        <span className="text-sm">
                          Réduction ({paymentDetails.promoCode})
                        </span>
                        <span className="font-semibold">-{paymentDetails.discount.toFixed(2)} €</span>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Montant total à payer</p>
                    <p className="text-3xl font-bold text-primary">{paymentDetails.amount.toFixed(2)} €</p>
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
                    Copiez cette adresse et envoyez exactement {paymentDetails.amount.toFixed(2)} € en USDT depuis votre portefeuille crypto
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
                <li>3. Vous recevrez vos codes par email sous 1 minute</li>
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
