import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import CityInsightsPage from "@/pages/CityInsightsPage";
import FlashHubPage from "@/pages/FlashHubPage";
import ActivityPage from "@/pages/ActivityPage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <TopNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city-insights" element={<CityInsightsPage />} />
            <Route path="/flash-hub" element={<FlashHubPage />} />
            <Route path="/metrics" element={<ActivityPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
