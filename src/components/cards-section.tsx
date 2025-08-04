// Import logos
import amazonLogo from "@/assets/logos/amazon.svg";
import appleLogo from "@/assets/logos/apple.png";
import sephoraLogo from "@/assets/logos/sephora.png";
import auchanLogo from "@/assets/logos/auchan-official.png";
import decathlonLogo from "@/assets/logos/decathlon-official.png";
import fnacLogo from "@/assets/logos/fnac-official.png";
import zalandoLogo from "@/assets/logos/zalando-official.png";
import playstationLogo from "@/assets/logos/playstation.png";
import samsungLogo from "@/assets/logos/samsung.png";
import uberLogo from "@/assets/logos/uber-new.png";
import nikeLogo from "@/assets/logos/nike-clean.png";
import airbnbLogo from "@/assets/logos/airbnb.svg";
import transcashLogo from "@/assets/logos/transcash.png";
import pcsLogo from "@/assets/logos/pcs.png";
import paysafecardLogo from "@/assets/logos/paysafecard.png";
export const CardsSection = () => {
  return <section id="cards" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">Logo 2</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de cartes cadeaux des plus grandes marques, 
            disponibles instantanément et en toute sécurité. Simple, élégant, instantané.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          <img src="/lovable-uploads/506a8cf4-4173-4136-8112-01665a8a31be.png" alt="Amazon" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src={nikeLogo} alt="Nike" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src={sephoraLogo} alt="Sephora" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/a0843980-93a2-4054-9177-3a52e55bde5a.png" alt="Auchan" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/5ffa54bf-4bab-45da-a30e-2f9cab2ef77f.png" alt="Decathlon" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src={appleLogo} alt="Apple" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/f55d6a71-ef59-4a09-a9a7-dce1e8b3a4f5.png" alt="Fnac" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/ae46c9f1-e8b3-4d26-acda-fc827e65ef80.png" alt="Zalando" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/340c09f1-3a7e-4515-8eac-6f523c02309a.png" alt="PlayStation" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/fea72e54-439a-4060-bc56-01c80eb7a5a5.png" alt="Samsung" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src={uberLogo} alt="Uber" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src={airbnbLogo} alt="Airbnb" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/4476bbbf-9f85-4fbb-ae2f-07d33934de59.png" alt="Transcash" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/b56f24a8-7c02-4790-9394-28a7aeedf45a.png" alt="PCS" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
          <img src="/lovable-uploads/0933b458-6ac9-4244-8d74-28f920c03d87.png" alt="Paysafecard" className="w-full h-auto max-w-32 mx-auto hover:scale-105 transition-transform duration-300" />
        </div>
        
      </div>
    </section>;
};