import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import PolitiqueRemboursement from "./pages/PolitiqueRemboursement";
import PolitiqueReclamation from "./pages/PolitiqueReclamation";
import PolitiqueCookies from "./pages/PolitiqueCookies";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import MentionsLegales from "./pages/MentionsLegales";
import Panier from "./pages/Panier";
import MonCompte from "./pages/MonCompte";
import ConfirmationCommande from "./pages/ConfirmationCommande";
import ConfirmationMessage from "./pages/ConfirmationMessage";
import PaiementCrypto from "./pages/PaiementCrypto";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/paiement-crypto" element={<PaiementCrypto />} />
            <Route path="/mon-compte" element={<MonCompte />} />
            <Route path="/confirmation-commande" element={<ConfirmationCommande />} />
            <Route path="/confirmation-message" element={<ConfirmationMessage />} />
            <Route path="/conditions-generales" element={<ConditionsGenerales />} />
            <Route path="/politique-de-remboursement" element={<PolitiqueRemboursement />} />
            <Route path="/politique-de-reclamation" element={<PolitiqueReclamation />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/cookies" element={<PolitiqueCookies />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
