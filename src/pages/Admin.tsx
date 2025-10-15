import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { addBalance } from "@/lib/wallet";
import { getOrders, updateOrderStatus, type Order } from "@/lib/orders";
import { createGiftCards } from "@/lib/giftcards";

interface PendingRecharge {
  id: string;
  userId: string;
  amount: number;
  date: string;
  status: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingRecharges, setPendingRecharges] = useState<PendingRecharge[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Vérifier si déjà authentifié
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(isAdmin);
    
    if (isAdmin) {
      loadPendingTransactions();
    }
  }, []);

  const loadPendingTransactions = () => {
    // Charger les rechargements en attente
    const recharges = JSON.parse(localStorage.getItem('pendingRecharges') || '[]');
    const pendingRecharges = recharges.filter((r: PendingRecharge) => r.status === 'En cours de vérification');
    setPendingRecharges(pendingRecharges);

    // Charger toutes les commandes en attente (crypto, paysafecard, transcash, etc.)
    const allOrders = getOrders();
    const pendingOrdersList = allOrders.filter(order => 
      order.status === 'En cours de vérification'
    );
    setPendingOrders(pendingOrdersList);
  };

  const handleAdminLogin = () => {
    // Mot de passe admin simple (à améliorer avec une vraie authentification)
    if (adminPassword === 'azerty93270') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
      loadPendingTransactions();
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleApproveRecharge = (recharge: PendingRecharge) => {
    // Créditer le solde
    addBalance(recharge.userId, recharge.amount, `Rechargement approuvé - ${recharge.id}`);

    // Mettre à jour le statut
    const allRecharges = JSON.parse(localStorage.getItem('pendingRecharges') || '[]');
    const updated = allRecharges.map((r: PendingRecharge) => 
      r.id === recharge.id ? { ...r, status: 'Approuvé' } : r
    );
    localStorage.setItem('pendingRecharges', JSON.stringify(updated));

    loadPendingTransactions();
    
    toast({
      title: "Rechargement approuvé",
      description: `${recharge.amount}€ crédité sur le compte`,
    });
  };

  const handleRejectRecharge = (recharge: PendingRecharge) => {
    const allRecharges = JSON.parse(localStorage.getItem('pendingRecharges') || '[]');
    const updated = allRecharges.map((r: PendingRecharge) => 
      r.id === recharge.id ? { ...r, status: 'Rejeté' } : r
    );
    localStorage.setItem('pendingRecharges', JSON.stringify(updated));

    loadPendingTransactions();
    
    toast({
      title: "Rechargement rejeté",
      description: "La transaction a été refusée",
      variant: "destructive",
    });
  };

  const handleApproveOrder = (order: Order) => {
    // Générer les codes de cartes cadeaux
    const giftCards = createGiftCards(
      order.userId,
      order.id,
      order.items.map(item => ({
        brand: item.brand,
        quantity: item.quantity,
        price: item.price
      }))
    );

    // Mettre à jour le statut de la commande
    updateOrderStatus(order.id, 'Livré');

    loadPendingTransactions();
    
    toast({
      title: "Commande approuvée",
      description: `${giftCards.length} codes générés et disponibles`,
    });
  };

  const handleRejectOrder = (order: Order) => {
    updateOrderStatus(order.id, 'Annulé');

    loadPendingTransactions();
    
    toast({
      title: "Commande rejetée",
      description: "La commande a été annulée",
      variant: "destructive",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Administration</h1>
              <p className="text-muted-foreground mt-2">
                Accès restreint - Connexion requise
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Mot de passe administrateur
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  placeholder="Entrez le mot de passe"
                />
              </div>
              <Button className="w-full" onClick={handleAdminLogin}>
                Se connecter
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                Retour à l'accueil
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold">Administration</h1>
              <p className="text-muted-foreground mt-2">
                Gestion des transactions en attente
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem('isAdmin');
                toast({
                  title: "Déconnexion",
                  description: "Vous avez été déconnecté",
                });
              }}
            >
              Déconnexion
            </Button>
          </div>

          <Tabs defaultValue="recharges" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recharges">
                Rechargements ({pendingRecharges.length})
              </TabsTrigger>
              <TabsTrigger value="orders">
                Commandes ({pendingOrders.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recharges">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Rechargements en attente</h2>
                
                {pendingRecharges.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Aucun rechargement en attente
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRecharges.map((recharge) => (
                        <TableRow key={recharge.id}>
                          <TableCell className="font-mono text-sm">
                            {recharge.id.substring(0, 12)}...
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {recharge.userId.substring(0, 8)}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {recharge.amount.toFixed(2)} €
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {recharge.date}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleApproveRecharge(recharge)}
                                className="gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Approuver
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectRecharge(recharge)}
                                className="gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Rejeter
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Commandes en attente de vérification</h2>
                
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Aucune commande en attente
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Commande</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Mode de paiement</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">
                            #{order.id}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {order.userId.substring(0, 8)}...
                          </TableCell>
                          <TableCell className="text-sm">
                            {order.paymentMethod}
                          </TableCell>
                          <TableCell className="text-sm">
                            {order.items.length} article(s)
                          </TableCell>
                          <TableCell className="font-semibold">
                            {order.total.toFixed(2)} €
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {order.date}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleApproveOrder(order)}
                                className="gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Approuver
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectOrder(order)}
                                className="gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Rejeter
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
