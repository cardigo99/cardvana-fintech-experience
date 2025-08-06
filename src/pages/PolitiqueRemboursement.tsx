import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const PolitiqueRemboursement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Politique de remboursement
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Nos cartes cadeaux sont des produits 100 % numériques et ne sont pas livrées sur un support physique.
            </p>
            
            <p>
              En raison de leur nature dématérialisée, elles sont exclues du droit de rétractation : une fois qu'un code a été activé et livré, il ne peut ni être retourné ni remboursé.
            </p>
            
            <p>
              Nous vous invitons donc à vérifier soigneusement votre sélection avant de finaliser l'achat.
            </p>
            
            <p>
              Aucun échange ou remboursement ne sera possible après la livraison, sauf en cas de problème technique.
            </p>
            
            <p>
              Cependant, nous offrons une garantie de fonctionnement sur tous les codes livrés. Si le code reçu ne fonctionne pas (ex. : non activé, erreur de livraison, problème de saisie), notre équipe fera le nécessaire pour résoudre le problème rapidement.
            </p>
            
            <p>
              Pour toute demande, merci de nous contacter via notre formulaire de contact afin que notre service client puisse vous assister dans les meilleurs délais.
            </p>
            
            <p>
              Vous trouverez également plus d'informations dans nos conditions générales.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PolitiqueRemboursement;