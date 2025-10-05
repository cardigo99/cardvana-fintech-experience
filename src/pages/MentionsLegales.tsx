import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-center">Mentions légales – Cardvana</h1>
          
          <p>
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, 
            il est précisé aux utilisateurs du site Cardvana l'identité des différents intervenants dans le 
            cadre de sa réalisation et de son suivi.
          </p>

          <h2>Éditeur du site</h2>
          <p>
            <strong>Nom / Raison sociale :</strong> Cardvana<br />
            <strong>Forme juridique :</strong> SAS<br />
            <strong>Siège social :</strong> POING ALLEMAGNE<br />
            <strong>Numéro RCS / SIRET :</strong> 899 124 598<br />
            <strong>Contact :</strong> cardigo.us@gmail.com
          </p>

          <h2>Hébergeur</h2>
          <p>
            <strong>Nom de l'hébergeur :</strong> OVH
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Le contenu du site (textes, images, logos, design) est protégé par le droit de la propriété intellectuelle.
            Toute reproduction ou utilisation sans autorisation préalable est interdite.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
