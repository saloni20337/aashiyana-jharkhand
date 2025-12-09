import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Calendar from "./pages/Calendar";
import Language from "./pages/Language";
import DestinationDetail from "./pages/DestinationDetail";
import Itineraries from "./pages/Itineraries";
import Marketplace from "./pages/Marketplace";
import Analytics from "./pages/Analytics";
import Maps from "./pages/Maps";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/language" element={<Language />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/maps" element={<Maps />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
