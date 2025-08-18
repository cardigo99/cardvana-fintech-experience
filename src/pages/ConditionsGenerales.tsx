import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const ConditionsGenerales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
            Conditions générales
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet</h2>
              <p>
                Les présentes Conditions Générales définissent les modalités de vente et d'utilisation des cartes cadeaux numériques proposées sur le site Cardvana.
                Toute commande implique l'acceptation pleine et entière des présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Produits</h2>
              <p>
                Cardvana propose exclusivement des cartes cadeaux numériques de différentes enseignes et marques partenaires.
                Ces cartes sont délivrées sous forme de codes numériques envoyés après validation de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Commandes</h2>
              <p>La commande est confirmée dès réception du paiement.</p>
              <p>Le client reçoit alors, par voie électronique, le code correspondant à la carte cadeau achetée.</p>
              <p>Cardvana se réserve le droit de refuser ou d'annuler toute commande en cas de suspicion de fraude ou d'utilisation abusive.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Prix et paiement</h2>
              <p>Les prix affichés sur le site sont en euros, toutes taxes comprises (TTC).</p>
              <p>Le paiement s'effectue via les moyens sécurisés proposés sur la plateforme.</p>
              <p>Cardvana se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la commande.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Livraison</h2>
              <p>Les cartes cadeaux sont livrées uniquement sous format numérique, directement à l'adresse e-mail fournie lors de la commande ou via l'espace client.</p>
              <p>Aucun envoi physique ne sera effectué.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Droit de rétractation</h2>
              <p>
                Conformément à la législation en vigueur et en raison de leur nature dématérialisée, les cartes cadeaux numériques sont exclues du droit de rétractation.
                Une fois le code activé et livré, il ne peut être ni remboursé ni échangé, sauf en cas de dysfonctionnement imputable à Cardvana.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Politique de remboursement</h2>
              <p>En cas de problème technique (code non activé, erreur de livraison, etc.), Cardvana s'engage à fournir une solution (remplacement ou assistance).</p>
              <p>Le client devra signaler le problème via le formulaire de contact.</p>
              <p>La politique détaillée est consultable sur la page dédiée « Politique de remboursement ».</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Responsabilités</h2>
              <p>Cardvana ne pourra être tenue responsable d'une utilisation incorrecte des cartes cadeaux achetées.</p>
              <p>L'utilisateur est responsable de la conservation et de l'utilisation du code après sa livraison.</p>
              <p>En cas de perte, vol ou divulgation du code, aucun remboursement ni remplacement ne sera possible.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Réclamations</h2>
              <p>Toute réclamation peut être adressée via notre formulaire de contact. Cardvana s'engage à traiter chaque demande dans les meilleurs délais.</p>
              <p>Une politique spécifique est disponible dans la page « Politique de réclamation ».</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Données personnelles</h2>
              <p>Cardvana s'engage à respecter la confidentialité des informations personnelles collectées.</p>
              <p>Les données sont utilisées uniquement pour le traitement des commandes et conformément à notre Politique de confidentialité.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modifications</h2>
              <p>Cardvana se réserve le droit de modifier les présentes Conditions Générales à tout moment.</p>
              <p>Les nouvelles conditions s'appliqueront à toute nouvelle commande passée après leur mise en ligne.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Droit applicable</h2>
              <p>Les présentes Conditions Générales sont régies par le droit applicable dans le pays où est basé Cardvana.</p>
              <p>En cas de litige, une solution amiable sera privilégiée avant toute action judiciaire.</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConditionsGenerales;