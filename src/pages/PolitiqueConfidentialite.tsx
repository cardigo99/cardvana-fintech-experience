import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground text-center">Politique de confidentialité</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            Chez Cardvana, la protection de vos données personnelles est une priorité.
            Cette politique explique quelles informations nous collectons, comment nous les utilisons et vos droits.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Données collectées</h2>
            <p>Lorsque vous utilisez notre site, nous pouvons collecter :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vos informations de compte (nom, e-mail).</li>
              <li>Vos informations de commande et de paiement.</li>
              <li>Des données de navigation (via cookies, voir notre Politique de cookies).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Utilisation des données</h2>
            <p>Vos données sont utilisées uniquement pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Traiter et livrer vos commandes.</li>
              <li>Assurer le service client.</li>
              <li>Améliorer notre site et nos services.</li>
              <li>Respecter nos obligations légales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Partage des données</h2>
            <p>Nous ne vendons jamais vos données.</p>
            <p>Elles peuvent être partagées uniquement avec :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nos prestataires techniques (paiement, hébergement).</li>
              <li>Les autorités légales si la loi l'exige.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Conservation des données</h2>
            <p>
              Vos données sont conservées uniquement le temps nécessaire à la gestion de vos commandes et obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez de droits :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>D'accès, de rectification et de suppression de vos données.</li>
              <li>D'opposition ou de limitation à leur traitement.</li>
            </ul>
            <p className="mt-4">
              Pour exercer vos droits, contactez-nous via notre formulaire de contact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Sécurité</h2>
            <p>
              Nous mettons en place toutes les mesures nécessaires pour protéger vos données contre l'accès non autorisé, 
              la perte ou la divulgation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact</h2>
            <p>
              Pour toute question relative à cette politique ou à vos données personnelles, 
              vous pouvez nous écrire via notre formulaire de contact.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
