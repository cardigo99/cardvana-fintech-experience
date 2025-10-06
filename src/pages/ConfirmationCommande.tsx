import { useState } from "react";
import { Check, Eye, EyeOff, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import type { GiftCard } from "@/lib/giftcards";

const ConfirmationCommande = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { giftCards = [] } = location.state || {};
  
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(new Set());

  const toggleCodeVisibility = (cardId: string) => {
    setVisibleCodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copié",
      description: "Le code a été copié dans le presse-papiers",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
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
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Merci pour votre achat !
            </h1>
            <p className="text-xl text-muted-foreground">
              Vos cartes cadeaux ont été générées avec succès
            </p>
          </div>

          {/* Gift Cards */}
          {giftCards.length > 0 && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Vos codes de cartes cadeaux</h2>
                  <p className="text-muted-foreground">
                    Retrouvez vos codes ci-dessous et dans votre historique d'achats
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  {giftCards.map((card: GiftCard) => (
                    <div
                      key={card.id}
                      className="border rounded-lg p-4 space-y-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-lg">{card.brand}</p>
                          <p className="text-sm text-muted-foreground">
                            Valeur : {card.amount.toFixed(2)} €
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </span>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Code de la carte cadeau</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-background border rounded p-3 font-mono text-sm">
                            {visibleCodes.has(card.id) ? (
                              <span className="select-all">{card.code}</span>
                            ) : (
                              <span className="blur-sm select-none">{card.code}</span>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleCodeVisibility(card.id)}
                            title={visibleCodes.has(card.id) ? "Masquer" : "Afficher"}
                          >
                            {visibleCodes.has(card.id) ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          {visibleCodes.has(card.id) && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => copyCode(card.code)}
                              title="Copier"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Information */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                📧 Informations importantes
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>• Vos codes sont maintenant disponibles et utilisables</li>
                <li>• Conservez-les précieusement ou retrouvez-les dans votre compte</li>
                <li>• En cas de problème, contactez notre service client</li>
                <li>• Ces codes sont valables selon les conditions du commerçant</li>
              </ul>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/")}
            >
              Retour à l'accueil
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/mon-compte")}
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
