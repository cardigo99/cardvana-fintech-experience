import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { getCart, saveCart, updateCartItemQuantity, removeFromCart, CartItem } from "@/lib/cart";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Panier = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const updateQuantity = (id: string, change: number) => {
    updateCartItemQuantity(id, change);
    setCartItems(getCart());
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const applyPromoCode = () => {
    const validCodes: Record<string, number> = {
      "BIENVENUE": 10,
      "PROMO20": 20,
      "VIP30": 30,
      "CARDI567": 70
    };

    const code = promoCode.trim().toUpperCase();
    if (validCodes[code]) {
      setAppliedPromo({ code, discount: validCodes[code] });
      toast({
        title: "Code promo appliqué !",
        description: `Vous bénéficiez de ${validCodes[code]}% de réduction`,
      });
    } else {
      toast({
        title: "Code invalide",
        description: "Ce code promo n'existe pas",
        variant: "destructive"
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-6">
                Ajoutez des cartes cadeaux pour commencer vos achats
              </p>
              <Button asChild>
                <a href="/">Découvrir nos cartes</a>
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.brand}
                        className="w-24 h-24 object-contain rounded-lg bg-muted"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.brand}</h3>
                        <p className="text-muted-foreground">{item.name}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold">
                              {item.price}€
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 sticky top-4">
                  <h2 className="text-xl font-semibold mb-4">Résumé</h2>
                  
                  {/* Promo Code Section */}
                  <div className="mb-4 space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Code promo
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Entrez votre code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        onClick={applyPromoCode}
                        disabled={!promoCode.trim()}
                      >
                        Appliquer
                      </Button>
                    </div>
                    {appliedPromo && (
                      <p className="text-sm text-green-600 font-medium">
                        Code "{appliedPromo.code}" appliqué (-{appliedPromo.discount}%)
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)}€</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Réduction (-{appliedPromo.discount}%)</span>
                        <span>-{discount.toFixed(2)}€</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" size="lg" asChild>
                    <a 
                      href="/paiement-crypto"
                      onClick={() => {
                        localStorage.setItem('payment_amount', total.toFixed(2));
                        localStorage.setItem('payment_subtotal', subtotal.toFixed(2));
                        if (appliedPromo) {
                          localStorage.setItem('payment_discount', discount.toFixed(2));
                          localStorage.setItem('payment_promo', appliedPromo.code);
                        } else {
                          localStorage.removeItem('payment_discount');
                          localStorage.removeItem('payment_promo');
                        }
                      }}
                    >
                      Procéder au paiement
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full mt-3" asChild>
                    <a href="/">Continuer mes achats</a>
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Panier;
