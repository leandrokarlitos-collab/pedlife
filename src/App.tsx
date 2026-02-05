import React from 'react'; // Added explicit React import
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AuthGuard from "./components/auth/AuthGuard";
import PlatformLayout from "./layouts/PlatformLayout";
import CalculatorPage from "./pages/platform/CalculatorPage";
import UserEditPage from "./pages/platform/UserEditPage";
import UserProfilePage from "./pages/platform/UserProfilePage";
import MedicationCategoryPage from "./pages/platform/MedicationCategoryPage";
import MedicationCalculatorPage from "./pages/platform/MedicationCalculatorPageNew";
import InsulinCalculatorPage from "./pages/platform/InsulinCalculatorPage";
import ProtocolsPage from "./pages/platform/ProtocolsPage";

// Admin imports
import AdminLayout from "./layouts/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminMedicationsPage from "./pages/admin/AdminMedicationsPage";
import AdminProtocolsPage from "./pages/admin/AdminProtocolsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminSetupPage from "./pages/admin/AdminSetupPage";

// Import test file for development debugging
import "./test-supabase";
import ProtocolDetailPage from "./pages/platform/ProtocolDetailPage";
import ProtocolCalculatorPage from "./pages/platform/ProtocolCalculatorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* Redirect old routes to new auth page */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />

          <Route path="/platform" element={<PlatformLayout />}>
            <Route index element={<CalculatorPage />} />
            <Route path="calculator" element={<Outlet />}>
              <Route index element={<CalculatorPage />} />
              {/* A rota da insulina foi movida para fora de /calculator */}
              <Route path=":categorySlug" element={<MedicationCategoryPage />} />
              <Route path=":categorySlug/:medicationSlug" element={<MedicationCalculatorPage />} />
            </Route>
            {/* Nova rota para a calculadora de insulina */}
            <Route path="insulin" element={<InsulinCalculatorPage />} />
            {/* Rotas de perfil do usuário */}
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="edit-profile" element={<UserEditPage />} />
            <Route path="protocols" element={<ProtocolsPage />} />
            <Route path="protocols/:protocolId" element={<ProtocolDetailPage />} />
            <Route path="protocol-calculator/:protocolId" element={<ProtocolCalculatorPage />} />
          </Route>

          {/* Rotas do Painel Administrativo */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/setup" element={<AdminSetupPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="medications" element={<AdminMedicationsPage />} />
            <Route path="protocols" element={<AdminProtocolsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
