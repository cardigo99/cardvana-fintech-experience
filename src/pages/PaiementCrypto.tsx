import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle2, ArrowLeft, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { getCart, clearCart } from "@/lib/cart";
import { saveOrder } from "@/lib/orders";
import { deductBalance, getBalance } from "@/lib/wallet";
import { createGiftCards } from "@/lib/giftcards";
import walletQR from "@/assets/wallet-qr-new.jpeg";

const PaiementCrypto = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [showGuestDialog, setShowGuestDialog] = useState(false);
  const walletAddress = "0x37B70E97244EAcfBA47EAc8b27Adb1536C808FfC";
  
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    subtotal: 0,
    discount: 0,
    promoCode: "",
    method: "crypto"
  });

  useEffect(() => {
    const amount = localStorage.getItem('paymentAmount');
    const subtotal = localStorage.getItem('paymentSubtotal');
    const discount = localStorage.getItem('paymentDiscount');
    const promoCode = localStorage.getItem('paymentPromoCode');
    const method = localStorage.getItem('paymentMethod') || 'crypto';
    const isGuest = localStorage.getItem('isGuestCheckout') === 'true';
    
    if (!amount) {
      navigate('/panier');
      return;
    }

    setIsGuestCheckout(isGuest);
    if (isGuest && !user) {
      setShowGuestDialog(true);
    }

    setPaymentDetails({
      amount: parseFloat(amount),
      subtotal: parseFloat(subtotal || amount),
      discount: parseFloat(discount || '0'),
      promoCode: promoCode || '',
      method
    });
  }, [navigate, user]);

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
    // Validation pour les invités
    if (isGuestCheckout && !user) {
      if (!guestEmail || !guestEmail.includes('@')) {
        toast({
          title: "Email requis",
          description: "Veuillez entrer une adresse email valide",
          variant: "destructive",
        });
        setShowGuestDialog(true);
        return;
      }
    } else if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour confirmer le paiement",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(async () => {
      const cartItems = getCart();
      let paymentMethod = "Crypto (USDT ERC-20)";
      
      if (paymentDetails.method === 'balance') {
        const balance = getBalance(user.id);
        
        if (balance < paymentDetails.amount) {
          toast({
            title: "Solde insuffisant",
            description: "Veuillez recharger votre compte",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }
        
        const success = deductBalance(
          user.id, 
          paymentDetails.amount, 
          `Achat de cartes cadeaux - ${cartItems.length} article(s)`
        );
        
        if (!success) {
          toast({
            title: "Erreur de paiement",
            description: "Impossible de débiter votre solde",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }
        
        paymentMethod = "Solde Cardvana";
      }
      
      const userId = user?.id || `GUEST-${guestEmail}`;
      const order = await saveOrder(userId, {
        items: cartItems.map(item => ({
          brand: item.brand,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: paymentDetails.subtotal,
        discount: paymentDetails.discount,
        promoCode: paymentDetails.promoCode,
        total: paymentDetails.amount,
        paymentMethod,
      });

      // Générer les codes uniquement pour les paiements par solde (déjà vérifiés)
      let giftCards = [];
      if (paymentDetails.method === 'balance' && user) {
        giftCards = await createGiftCards(
          userId,
          order.id,
          cartItems.map(item => ({
            brand: item.brand,
            quantity: item.quantity,
            price: item.price
          }))
        );
      }

      clearCart();
      
      localStorage.removeItem('paymentAmount');
      localStorage.removeItem('paymentSubtotal');
      localStorage.removeItem('paymentDiscount');
      localStorage.removeItem('paymentPromoCode');
      localStorage.removeItem('paymentMethod');
      localStorage.removeItem('isGuestCheckout');

      if (paymentDetails.method === 'balance') {
        toast({
          title: "Paiement confirmé",
          description: "Vos cartes cadeaux ont été générées",
        });
      } else {
        toast({
          title: "Commande enregistrée",
          description: isGuestCheckout 
            ? `Nous vérifions votre paiement. Vous recevrez vos codes à ${guestEmail} après validation.`
            : "Nous vérifions votre paiement. Vous recevrez vos codes après validation.",
        });
      }

      setIsProcessing(false);
      navigate("/confirmation-commande", { 
        state: { order, giftCards, isGuest: isGuestCheckout, guestEmail }
      });
    }, 2000);
  };

  const handleGuestEmailSubmit = () => {
    if (!guestEmail || !guestEmail.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      });
      return;
    }
    setShowGuestDialog(false);
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
              <h1 className="text-4xl font-bold">
                {paymentDetails.method === 'balance' ? 'Confirmation de paiement' : 'Paiement Crypto'}
              </h1>
              <p className="text-muted-foreground">
                {paymentDetails.method === 'balance' 
                  ? 'Confirmez votre achat avec votre solde Cardvana' 
                  : 'Envoyez le montant exact en USDT à l\'adresse ci-dessous'}
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
                    {paymentDetails.method !== 'balance' && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Réseau</p>
                        <p className="font-semibold">ERC-20 (Ethereum)</p>
                      </div>
                    )}
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

                {paymentDetails.method === 'balance' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Paiement avec votre solde</h3>
                    <p className="text-muted-foreground mb-6">
                      Le montant sera débité de votre solde Cardvana
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => navigate("/panier")}
                        disabled={isProcessing}
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handlePaymentConfirm}
                        disabled={isProcessing}
                        size="lg"
                      >
                        {isProcessing ? "Traitement..." : "Confirmer le paiement"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
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

                    <div className="space-y-3">
                      <Label>Scanner le QR Code</Label>
                      <div className="flex justify-center p-4 bg-white rounded-lg">
                        <img 
                          src={walletQR} 
                          alt="QR Code du portefeuille" 
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Scannez ce QR code avec votre application crypto pour payer rapidement
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
                        <li>• <strong>Ajoutez votre adresse email dans le libellé du virement</strong> pour l'authentification</li>
                        <li>• Le montant sera converti automatiquement</li>
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handlePaymentConfirm}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Traitement..." : "J'ai effectué le paiement"}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate("/panier")}
                        disabled={isProcessing}
                      >
                        Annuler
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {paymentDetails.method !== 'balance' && (
              <Card className="p-6 bg-muted/50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Après le paiement
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Cliquez sur "J'ai effectué le paiement"</li>
                  <li>2. Nous vérifions automatiquement votre transaction</li>
                  <li>3. Vous recevrez vos codes par email instantanément après réception du paiement</li>
                  <li>4. Les codes seront également disponibles dans votre compte</li>
                </ul>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Dialog open={showGuestDialog} onOpenChange={setShowGuestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paiement invité</DialogTitle>
            <DialogDescription>
              Veuillez entrer votre adresse email pour recevoir vos codes de cartes cadeaux après validation du paiement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="guest-email">Adresse email *</Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="votre@email.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGuestEmailSubmit()}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleGuestEmailSubmit}
            >
              Continuer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PaiementCrypto;
