import { Navigation } from "@/components/navigation";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
