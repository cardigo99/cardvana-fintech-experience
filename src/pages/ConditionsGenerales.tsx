import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const ConditionsGenerales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground text-center">Conditions Générales de Vente</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Cardvana 
              et toute personne effectuant un achat sur le site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Produits</h2>
            <p>
              Cardvana propose exclusivement des cartes cadeaux numériques, délivrées sous forme de codes électroniques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Commandes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>La commande est validée dès confirmation du paiement.</li>
              <li>Le client reçoit son code cadeau par email ou via son compte utilisateur.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Prix et paiement</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les prix affichés sont en euros TTC.</li>
              <li>Le paiement s'effectue en ligne via des moyens sécurisés.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Livraison</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Livraison exclusivement dématérialisée (par email ou espace client).</li>
              <li>Aucun envoi physique ne sera effectué.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Droit de rétractation</h2>
            <p>
              Conformément à la loi, les cartes cadeaux numériques sont exclues du droit de rétractation.
              Un code livré et activé ne peut pas être remboursé ni échangé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Politique de remboursement</h2>
            <p>
              En cas de problème technique (code non valide, erreur de livraison), Cardvana s'engage à fournir 
              une solution adaptée (remplacement ou assistance).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Responsabilités</h2>
            <p>
              Cardvana n'est pas responsable d'une mauvaise utilisation du code (perte, vol, divulgation).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Réclamations</h2>
            <p>
              Toute réclamation doit être envoyée via le formulaire de contact.
              Un traitement sera effectué dans les meilleurs délais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Données personnelles</h2>
            <p>
              Cardvana collecte et traite des données conformément à sa Politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Droit applicable</h2>
            <p>
              Les présentes CGV sont soumises au droit français.
              En cas de litige, une solution amiable sera privilégiée.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConditionsGenerales;
