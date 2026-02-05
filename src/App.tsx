import React, { Suspense, lazy } from 'react'; // Added explicit React import
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Carregamento Preguiçoso (Lazy Loading) das páginas
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const PlatformLayout = lazy(() => import("./layouts/PlatformLayout"));
const CalculatorPage = lazy(() => import("./pages/platform/CalculatorPage"));
const UserEditPage = lazy(() => import("./pages/platform/UserEditPage"));
const UserProfilePage = lazy(() => import("./pages/platform/UserProfilePage"));
const MedicationCategoryPage = lazy(() => import("./pages/platform/MedicationCategoryPage"));
const MedicationCalculatorPage = lazy(() => import("./pages/platform/MedicationCalculatorPageNew"));
const InsulinCalculatorPage = lazy(() => import("./pages/platform/InsulinCalculatorPage"));
const ProtocolsPage = lazy(() => import("./pages/platform/ProtocolsPage"));
const ProtocolDetailPage = lazy(() => import("./pages/platform/ProtocolDetailPage"));
const ProtocolCalculatorPage = lazy(() => import("./pages/platform/ProtocolCalculatorPage"));

// Admin imports (Lazy)
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminMedicationsPage = lazy(() => import("./pages/admin/AdminMedicationsPage"));
const AdminProtocolsPage = lazy(() => import("./pages/admin/AdminProtocolsPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettingsPage"));
const AdminSetupPage = lazy(() => import("./pages/admin/AdminSetupPage"));

// Componente de carregamento simples
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

import AuthGuard from "./components/auth/AuthGuard";

// Import test file for development debugging
import "./test-supabase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
