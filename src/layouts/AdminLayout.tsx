import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  LayoutDashboard,
  Users,
  Pill,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Bell,
  ChevronRight,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Lista de emails de administradores autorizados
const ADMIN_EMAILS = ['admin@pedlife.com.br'];

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Usuários', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { label: 'Medicamentos', path: '/admin/medications', icon: <Pill className="h-5 w-5" /> },
  { label: 'Protocolos', path: '/admin/protocols', icon: <FileText className="h-5 w-5" /> },
  { label: 'Configurações', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          navigate('/admin');
          return;
        }

        // Verificar se é admin
        if (!ADMIN_EMAILS.includes(session.user.email || '')) {
          await supabase.auth.signOut();
          navigate('/admin');
          return;
        }

        setAdminEmail(session.user.email);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();

    // Listener para mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/admin');
      } else if (session?.user && !ADMIN_EMAILS.includes(session.user.email || '')) {
        supabase.auth.signOut();
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64",
        "bg-slate-800 border-r border-slate-700",
        "transform transition-transform duration-200 ease-in-out",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">PedLife</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                )}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="h-16 bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
          <div className="h-full px-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search (desktop) */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className={cn(
                    "w-full pl-10 pr-4 py-2 rounded-lg",
                    "bg-slate-900/50 border border-slate-700",
                    "text-white placeholder:text-slate-500 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  )}
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Admin info */}
              <div className="flex items-center gap-3 pl-3 border-l border-slate-700">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">Administrador</p>
                  <p className="text-xs text-slate-400">{adminEmail}</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
