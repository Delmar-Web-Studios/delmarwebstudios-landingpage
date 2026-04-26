import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import WebDesign from "./pages/WebDesign";
import Ecommerce from "./pages/Ecommerce";
import AiAutomation from "./pages/AiAutomation";
import Payment from "./pages/Payment";
import ConditionsUtilisation from "./pages/legal/ConditionsUtilisation";
import PolitiqueConfidentialite from "./pages/legal/PolitiqueConfidentialite";
import SuppressionDonnees from "./pages/legal/SuppressionDonnees";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/web-design" element={<WebDesign />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/ai-automation" element={<AiAutomation />} />
          <Route path="/delmarstudiosweb-payment-client" element={<Payment />} />
          <Route path="/legal/conditions-utilisation" element={<ConditionsUtilisation />} />
          <Route path="/legal/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/legal/suppression-donnees" element={<SuppressionDonnees />} />
          {/* Anciennes routes */}
          <Route path="/legal" element={<Navigate to="/legal/conditions-utilisation" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
