import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const PolitiqueReclamation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Politique de réclamation</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet</h2>
              <p className="leading-relaxed">
                Chez Cardvana, nous nous efforçons de vous offrir le meilleur service possible.
                Cependant, malgré toutes nos précautions, des erreurs peuvent parfois survenir.
                La présente Politique de réclamation a pour but d'expliquer comment vous pouvez nous faire part d'un problème, et comment nous nous engageons à le traiter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Avez-vous une plainte à formuler ?</h2>
              <p className="leading-relaxed mb-4">
                Si vous rencontrez un problème lié à l'achat ou à l'utilisation d'une carte cadeau, n'hésitez pas à nous contacter immédiatement afin que nous puissions trouver avec vous une solution et résoudre votre problème au plus vite.
              </p>
              <p className="leading-relaxed">
                Chaque réclamation est prise au sérieux : elle nous donne l'occasion de corriger une éventuelle erreur et d'améliorer continuellement notre service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cas de réclamation acceptés</h2>
              <p className="leading-relaxed mb-4">
                Vous pouvez déposer une réclamation dans les cas suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Code de la carte cadeau non valide ou non activé.</li>
                <li>Erreur de livraison (mauvaise carte envoyée, quantité incorrecte).</li>
                <li>Problème technique empêchant l'accès au code après paiement.</li>
              </ul>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                <p className="text-yellow-800 dark:text-yellow-200">
                  ⚠️ Les réclamations ne sont pas acceptées si le problème résulte d'une mauvaise utilisation (perte du code, achat par erreur, divulgation à un tiers, etc.).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Formulaire de réclamation</h2>
              <p className="leading-relaxed mb-4">Pour soumettre une réclamation :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Rendez-vous sur notre site et remplissez le formulaire de contact prévu à cet effet.</li>
                <li>Fournissez votre numéro de commande ainsi qu'une description détaillée du problème.</li>
                <li>Si disponible, vous pouvez aussi utiliser le chat en direct pour joindre directement notre service client.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Délais de traitement</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vous recevrez une réponse de notre part dans un délai de 3 jours ouvrables maximum.</li>
                <li>Si des circonstances particulières nécessitent un délai plus long, nous vous en informerons rapidement.</li>
                <li>La réponse sera envoyée à l'adresse e-mail indiquée lors de la réclamation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Suivi et amélioration continue</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Chaque réclamation est enregistrée et analysée dans le cadre de notre système d'amélioration de la qualité.</li>
                <li>Nous utilisons ces informations afin de prévenir la réapparition des problèmes rencontrés.</li>
                <li>Toutes les réclamations sont traitées avec soin, confidentialité et professionnalisme.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Notre engagement</h2>
              <p className="leading-relaxed">
                Nous vous remercions de nous signaler directement vos plaintes : elles nous donnent une seconde chance de vous satisfaire.
                Soyez assuré(e) que nous ferons tout notre possible pour trouver une solution rapide et éviter que le problème ne se reproduise.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueReclamation;