import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

const Panier = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Carte cadeau",
      brand: "Amazon",
      price: 50,
      quantity: 1,
      image: "/lovable-uploads/a0843980-93a2-4054-9177-3a52e55bde5a.png"
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

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
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)}€</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" size="lg">
                    Procéder au paiement
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
