import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MonCompte = () => {
  const { toast } = useToast();
  
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

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Validation simple
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
  };

  const handleChangePassword = () => {
    // Validation
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

    // Réinitialiser le formulaire
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
    if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
      });
      // Redirection après suppression
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };
  const mockOrders = [
    {
      id: "CMD001",
      date: "15 janvier 2024",
      brand: "Amazon",
      amount: 50,
      status: "Livré"
    },
    {
      id: "CMD002",
      date: "10 janvier 2024",
      brand: "Netflix",
      amount: 25,
      status: "Livré"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Mon Compte</h1>
            <Button variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </TabsTrigger>
            </TabsList>

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

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Historique des commandes</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">Commande #{order.id}</h3>
                            <span className="text-sm px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {order.date} • {order.brand} • {order.amount}€
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {mockOrders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Aucune commande pour le moment</p>
                    </div>
                  )}
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
                    <Button variant="destructive" onClick={handleDeleteAccount}>Supprimer mon compte</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MonCompte;
