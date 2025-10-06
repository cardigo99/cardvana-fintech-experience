import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, ShoppingBag, Settings, Eye, Package, Calendar, CreditCard, Wallet, Plus, Copy, EyeOff, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { getUserOrders, Order } from "@/lib/orders";
import { getUserWallet, getTransactions, Transaction } from "@/lib/wallet";
import { getUserGiftCards, type GiftCard } from "@/lib/giftcards";
import { useNavigate } from "react-router-dom";

const MonCompte = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pendingRecharges, setPendingRecharges] = useState<any[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(new Set());
  
  // État pour les informations du profil
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  // État pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // États pour les modales
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

  // Charger les données de l'utilisateur
  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      setOrders(userOrders);
      
      const wallet = getUserWallet(user.id);
      setBalance(wallet.balance);
      
      const userTransactions = getTransactions(user.id);
      setTransactions(userTransactions);
      
      // Charger les rechargements en attente
      const pending = JSON.parse(localStorage.getItem('pendingRecharges') || '[]');
      const userPending = pending.filter((p: any) => p.userId === user.id);
      setPendingRecharges(userPending);
      
      // Charger les cartes cadeaux achetées
      const userCards = getUserGiftCards(user.id);
      setGiftCards(userCards);
    }
  }, [user]);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profileData));
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive"
      });
      return;
    }

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été changé avec succès",
    });
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("cart");
    
    toast({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé avec succès",
    });
    
    setIsDeleteDialogOpen(false);
    
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Mon Compte</h1>
          </div>

          <Tabs defaultValue="wallet" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="wallet">
                <Wallet className="w-4 h-4 mr-2" />
                Portefeuille
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Mes achats
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wallet">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Mon Portefeuille</h2>
                    <p className="text-muted-foreground">Gérez votre solde et rechargez votre compte</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-2">Solde disponible</p>
                    <p className="text-4xl font-bold mb-4">{balance.toFixed(2)} €</p>
                    <Button onClick={() => navigate("/alimenter-compte")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Alimenter mon compte
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Rechargements en attente de vérification</h3>
                    {pendingRecharges.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8 text-sm">
                        Aucun rechargement en attente
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {pendingRecharges.map((recharge) => (
                          <div key={recharge.id} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-lg">{recharge.amount.toFixed(2)} €</p>
                                  <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                    {recharge.status}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Demandé le {recharge.date}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded">
                              💡 Votre rechargement sera vérifié et ajouté à votre solde une fois la transaction confirmée
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Historique des transactions</h3>
                    {transactions.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Aucune transaction pour le moment
                      </p>
                    ) : (
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">Montant</TableHead>
                              <TableHead>Statut</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell className="text-sm">{transaction.date}</TableCell>
                                <TableCell>
                                  <span className={`text-xs px-2 py-1 rounded ${
                                    transaction.type === 'recharge' 
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  }`}>
                                    {transaction.type === 'recharge' ? 'Rechargement' : 'Paiement'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-sm">{transaction.description}</TableCell>
                                <TableCell className={`text-right font-semibold ${
                                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} €
                                </TableCell>
                                <TableCell>
                                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    {transaction.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Mes achats</h2>
                <div className="space-y-4">
                  {orders.map((order) => {
                    const orderCards = giftCards.filter(card => card.orderId === order.id);
                    const statusColor = order.status === 'Livré' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500';
                    return (
                      <Card key={order.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold">Commande #{order.id}</h3>
                                <span className={`text-sm px-2 py-1 rounded-full ${statusColor}`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-sm">
                                {order.date} • {order.items.length} article(s) • {order.total.toFixed(2)}€
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Voir détails
                            </Button>
                          </div>
                          
                          {orderCards.length > 0 && (
                            <>
                              <Separator />
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <Gift className="w-4 h-4" />
                                  Codes de cartes cadeaux
                                </h4>
                                {orderCards.map((card) => (
                                  <div key={card.id} className="border rounded-lg p-3 bg-muted/30">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <p className="font-medium">{card.brand}</p>
                                          <span className={`text-xs px-2 py-1 rounded ${
                                            card.status === 'active' 
                                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                                          }`}>
                                            {card.status === 'active' ? 'Active' : 'Utilisée'}
                                          </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                          Valeur : {card.amount.toFixed(2)} €
                                        </p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-background border rounded p-2 font-mono text-xs">
                                          {visibleCodes.has(card.id) ? (
                                            <span className="select-all">{card.code}</span>
                                          ) : (
                                            <span className="blur-sm select-none">{card.code}</span>
                                          )}
                                        </div>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-9 w-9"
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
                                            className="h-9 w-9"
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
                            </>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Aucun achat pour le moment</p>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Informations personnelles</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Jean"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Dupont"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jean.dupont@example.com"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+33 6 12 34 56 78"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                  <Separator />
                  <Button onClick={handleSaveProfile}>Enregistrer les modifications</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Paramètres du compte</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input 
                          id="currentPassword" 
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input 
                          id="newPassword" 
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                        />
                      </div>
                      <Button onClick={handleChangePassword}>Modifier le mot de passe</Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-4 text-destructive">Zone de danger</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      La suppression de votre compte est permanente et irréversible.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      Supprimer mon compte
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Modale détails de commande */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Détails de la commande {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Informations complètes sur votre commande
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date de commande</p>
                  <p className="flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4" />
                    {selectedOrder.date}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedOrder.status === 'Livré' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Produits commandés</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{item.brand}</p>
                      <p className="text-sm text-muted-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                    </div>
                    <p className="text-lg font-bold">{item.price}€</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Informations de paiement</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Méthode de paiement</span>
                    <span className="font-medium flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Transaction</span>
                    <span className="font-mono text-sm">{selectedOrder.transactionId}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{selectedOrder.subtotal.toFixed(2)}€</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction ({selectedOrder.promoCode})</span>
                      <span>-{selectedOrder.discount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total payé</span>
                    <span>{selectedOrder.total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  📧 Les codes des cartes cadeaux vous seront envoyés par email une fois le paiement validé.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setIsOrderDetailsOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement votre compte
              et toutes vos données de nos serveurs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground">
              Supprimer mon compte
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MonCompte;
