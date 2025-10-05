import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface CryptoOption {
  id: "BTC" | "ETH" | "USDT" | "LTC";
  name: string;
  eurPerUnit: number; // EUR needed to buy 1 unit
  address: string;
}

const CRYPTOS: CryptoOption[] = [
  { id: "BTC", name: "Bitcoin", eurPerUnit: 60000, address: "bc1qxexamplebtcaddress000000000" },
  { id: "ETH", name: "Ethereum", eurPerUnit: 2500, address: "0xExampleEthereumAddress0000000000000000" },
  { id: "USDT", name: "Tether (USDT)", eurPerUnit: 1, address: "TRC20-USDT-Example-Address-000000" },
  { id: "LTC", name: "Litecoin", eurPerUnit: 70, address: "ltc1qexamplelitecoinaddress000000" },
];

const PaiementCrypto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalEUR = (location.state as { total?: number } | undefined)?.total ?? 0;
  const [selected, setSelected] = useState<CryptoOption["id"]>("BTC");
  const [confirmed, setConfirmed] = useState(false);

  const current = CRYPTOS.find(c => c.id === selected)!;
  const amountInCrypto = useMemo(() => {
    if (!totalEUR || !current) return 0;
    return totalEUR / current.eurPerUnit;
  }, [totalEUR, current]);

  useEffect(() => {
    // Basic SEO updates
    document.title = "Paiement crypto - Cardvana";
    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    ensureMeta("description", "Payez en cryptomonnaie (Bitcoin, Ethereum, USDT, Litecoin) sur Cardvana.");

    // Canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(current.address);
      toast({ title: "Adresse copiée", description: "L'adresse du portefeuille a été copiée." });
    } catch {
      toast({ title: "Impossible de copier", description: "Veuillez copier l'adresse manuellement.", variant: "destructive" });
    }
  };

  if (!totalEUR || totalEUR <= 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-16">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Paiement crypto</h1>
            <p className="text-muted-foreground mb-6">Aucun montant n'a été transmis. Retournez au panier pour recommencer.</p>
            <Button onClick={() => navigate("/panier")}>Retour au panier</Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Paiement en cryptomonnaie</h1>
          <p className="text-muted-foreground mt-2">Montant de votre commande: <span className="font-semibold">{totalEUR.toFixed(2)}€</span></p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Choisissez une cryptomonnaie</h2>
            <RadioGroup value={selected} onValueChange={(v) => setSelected(v as CryptoOption["id"]) } className="grid sm:grid-cols-2 gap-4">
              {CRYPTOS.map((c) => (
                <label key={c.id} className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:shadow-card">
                  <RadioGroupItem id={c.id} value={c.id} />
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">1 {c.id} ≈ {c.eurPerUnit.toLocaleString("fr-FR")}€</div>
                  </div>
                </label>
              ))}
            </RadioGroup>

            <Separator className="my-6" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Montant à envoyer</span>
                <span className="text-lg font-semibold">{amountInCrypto.toFixed(8)} {current.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Adresse de réception</span>
                <code className="px-2 py-1 rounded bg-muted">{current.address}</code>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={copyAddress}>Copier l'adresse</Button>
                <Button onClick={() => setConfirmed(true)}>Confirmer la transaction</Button>
              </div>
            </div>
          </Card>

          <aside>
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground"><span>Total commande</span><span>{totalEUR.toFixed(2)}€</span></div>
                <div className="flex justify-between"><span className="font-medium">Vous payez</span><span className="font-semibold">{amountInCrypto.toFixed(8)} {current.id}</span></div>
              </div>
              <Separator className="my-4" />
              <Button className="w-full" onClick={() => setConfirmed(true)}>J'ai envoyé le paiement</Button>
            </Card>
          </aside>
        </div>

        {confirmed && (
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-semibold mb-2">Merci ! Paiement en cours de validation</h2>
            <p className="text-muted-foreground">Votre transaction est en cours de confirmation sur la blockchain. Vous recevrez votre carte cadeau par e-mail sous peu.</p>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaiementCrypto;
