import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-24">
        <article className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">Mentions légales</h1>
          
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, 
              il est précisé aux utilisateurs du site Cardvana l'identité des différents intervenants dans le 
              cadre de sa réalisation et de son suivi.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Éditeur du site</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">Nom / Raison sociale :</strong> Cardvana</p>
                <p><strong className="text-foreground">Forme juridique :</strong> SAS</p>
                <p><strong className="text-foreground">Siège social :</strong> POING ALLEMAGNE</p>
                <p><strong className="text-foreground">Numéro RCS / SIRET :</strong> 899 124 598</p>
                <p><strong className="text-foreground">Contact :</strong> cardigo.us@gmail.com</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Hébergeur</h2>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Nom de l'hébergeur :</strong> OVH
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Propriété intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le contenu du site (textes, images, logos, design) est protégé par le droit de la propriété intellectuelle.
                Toute reproduction ou utilisation sans autorisation préalable est interdite.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
