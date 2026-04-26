import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WebDesign from "./pages/WebDesign";
import Ecommerce from "./pages/Ecommerce";
import AiAutomation from "./pages/AiAutomation";
import Payment from "./pages/Payment";
import Legal from "./pages/Legal";
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
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
