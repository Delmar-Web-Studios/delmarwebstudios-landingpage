import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import SolutionPage from "./pages/SolutionPage";
import Payment from "./pages/Payment";
import ConditionsUtilisation from "./pages/legal/ConditionsUtilisation";
import PolitiqueConfidentialite from "./pages/legal/PolitiqueConfidentialite";
import SuppressionDonnees from "./pages/legal/SuppressionDonnees";
import NotFound from "./pages/NotFound";

// Admin
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminOverview from "./pages/admin/Overview";

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
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/solutions/:slug" element={<SolutionPage />} />

            {/* Anciens liens redirigés */}
            <Route path="/web-design" element={<Navigate to="/solutions/landing-page" replace />} />
            <Route path="/ecommerce" element={<Navigate to="/solutions/whatsapp-ia" replace />} />
            <Route path="/ai-automation" element={<Navigate to="/solutions/vocal-ia" replace />} />

            <Route path="/delmarstudiosweb-payment-client" element={<Payment />} />
            <Route path="/legal/conditions-utilisation" element={<ConditionsUtilisation />} />
            <Route path="/legal/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/legal/suppression-donnees" element={<SuppressionDonnees />} />
            <Route path="/legal" element={<Navigate to="/legal/conditions-utilisation" replace />} />

            {/* Admin */}
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<Navigate to="/login/admin" replace />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOverview />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
