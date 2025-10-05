import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const PolitiqueCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
              Politique de Cookies
            </h1>
            <p className="text-xl text-muted-foreground">
              Notre site Cardvana utilise des cookies pour fonctionner correctement et améliorer votre expérience.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Quels types de cookies utilisons-nous ?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Cookies essentiels :</strong> nécessaires pour le fonctionnement du site (ex. : panier, paiement).
                </p>
                <p>
                  <strong className="text-foreground">Cookies de mesure d'audience :</strong> pour comprendre comment le site est utilisé et améliorer nos services.
                </p>
                <p>
                  <strong className="text-foreground">Cookies de préférences :</strong> pour mémoriser vos choix (ex. : langue).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Utilisation des cookies
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Le site peut être amené à utiliser des cookies pour améliorer l'expérience utilisateur et mesurer l'audience.
                </p>
                <p>
                  L'utilisateur peut à tout moment configurer son navigateur pour refuser les cookies.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Plus d'infos
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  En refusant certains cookies, certaines fonctionnalités du site peuvent ne pas fonctionner correctement.
                </p>
                <p>
                  Pour toute question, contactez-nous via notre formulaire de contact.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueCookies;