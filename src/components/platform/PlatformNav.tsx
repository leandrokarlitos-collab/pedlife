import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu, Moon, Sun, Calculator, Droplets, BookOpenText, User,
  Star, ChevronRight, LogOut, Settings, TrendingUp, Pill
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useFavorites } from '@/hooks/use-favorites';
import { useSearchHistory } from '@/hooks/use-search-history';
import { logout } from '@/utils/auth-utils';

export const PlatformNav: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, profile } = useUser();
  const { favorites } = useFavorites(user);
  const { getMostSearched } = useSearchHistory(user);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const navItems = [
    { to: "/platform/calculator", label: "Medicamentos", icon: Calculator },
    { to: "/platform/insulin", label: "Insulina", icon: Droplets },
    { to: "/platform/protocols", label: "Protocolos", icon: BookOpenText },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    setPopoverOpen(false);
    await logout();
    navigate('/auth');
  };

  const handleNavigate = (path: string) => {
    setPopoverOpen(false);
    navigate(path);
  };

  // Pegar os 5 primeiros favoritos
  const recentFavorites = favorites.slice(0, 5);
  const hasMoreFavorites = favorites.length > 5;

  // Pegar os 3 mais pesquisados
  const topSearched = getMostSearched(3);

  return (
    <header className="sticky top-0 z-50 w-full relative">
      {/* Glass Background - uniforme no dark mode */}
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/95 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 dark:border-slate-700/50" />

      {/* Subtle gradient overlay - apenas no modo claro */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.02] via-transparent to-blue-500/[0.02] dark:bg-none pointer-events-none" />

      <div className="container relative flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/platform" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img
                src="/lovable-uploads/b16ed0cb-3142-4d88-85ea-a5a2deccbba2.png"
                alt="Pedlife Logo"
                className="h-9 w-auto transition-all duration-300 group-hover:scale-105"
              />
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-violet-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-white/70 dark:bg-slate-700/80 text-violet-600 dark:text-violet-400 shadow-sm border border-white/50 dark:border-slate-500/50"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn(
                          "h-4 w-4 transition-colors",
                          isActive ? "text-violet-500" : "text-slate-400"
                        )} />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Botão de Perfil do Usuário com Menu Suspenso */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-xl transition-all duration-200",
                  "border",
                  popoverOpen
                    ? "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-700"
                    : "bg-white/50 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-white/50 dark:border-slate-500/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
                title={user ? (profile?.full_name || user.email || 'Perfil') : 'Fazer login'}
              >
                {user ? (
                  <div className="w-5 h-5 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
                {!isMobile && user && (
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {profile?.full_name?.split(' ')[0] || 'Perfil'}
                  </span>
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              className={cn(
                "w-80 p-0 overflow-hidden",
                "bg-white/95 dark:bg-slate-900/95",
                "backdrop-blur-xl border border-slate-200 dark:border-slate-700",
                "shadow-xl shadow-black/10"
              )}
              align="end"
              sideOffset={8}
            >
              {user ? (
                <>
                  {/* Header do usuário */}
                  <div className="p-4 bg-gradient-to-r from-violet-500 to-blue-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold">
                        {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">
                          {profile?.full_name || 'Usuário'}
                        </p>
                        <p className="text-xs text-white/80 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Favoritos */}
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-amber-500" />
                        Favoritos
                      </span>
                      {favorites.length > 0 && (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
                        </span>
                      )}
                    </div>

                    {recentFavorites.length > 0 ? (
                      <div className="space-y-1">
                        {recentFavorites.map((fav) => (
                          <button
                            key={fav.id}
                            onClick={() => handleNavigate(`/platform/calculator/${fav.categorySlug}`)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                          >
                            <Pill className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 truncate flex-1">
                              {fav.medicationName}
                            </span>
                            <span className="text-xs text-slate-400">{fav.doseResult.split(' ')[0]}</span>
                          </button>
                        ))}

                        {hasMoreFavorites && (
                          <button
                            onClick={() => handleNavigate('/platform/profile')}
                            className="w-full flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors text-amber-600 dark:text-amber-400 text-sm font-medium mt-2"
                          >
                            Ver todos ({favorites.length})
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">
                        Nenhum favorito ainda
                      </p>
                    )}
                  </div>

                  {/* Mais Pesquisados */}
                  {topSearched.length > 0 && (
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                        <TrendingUp className="h-3.5 w-3.5 text-violet-500" />
                        Mais Pesquisados
                      </span>
                      <div className="space-y-1">
                        {topSearched.map((item, idx) => (
                          <button
                            key={item.id}
                            onClick={() => handleNavigate(`/platform/calculator/${item.categorySlug}`)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                          >
                            <span className={cn(
                              "w-5 h-5 rounded flex items-center justify-center text-xs font-bold",
                              idx === 0 && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                              idx === 1 && "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300",
                              idx === 2 && "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                            )}>
                              {idx + 1}
                            </span>
                            <span className="text-sm text-slate-700 dark:text-slate-300 truncate flex-1">
                              {item.medicationName}
                            </span>
                            <span className="text-xs text-violet-500 font-medium">{item.searchCount}x</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="p-2">
                    <button
                      onClick={() => handleNavigate('/platform/profile')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Meu Perfil</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                    </button>
                    <button
                      onClick={() => handleNavigate('/platform/edit-profile')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Configurações</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Sair</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Usuário não logado */
                <div className="p-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      Faça login para acessar
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Salve favoritos e veja seu histórico
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('/auth')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium transition-all"
                  >
                    Fazer Login
                  </button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-200",
              "bg-white/50 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80",
              "border border-white/50 dark:border-slate-500/50",
              "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-violet-500" />
            )}
            <span className="sr-only">Alternar tema</span>
          </button>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <button className={cn(
                  "p-2.5 rounded-xl transition-all duration-200",
                  "bg-white/50 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80",
                  "border border-white/50 dark:border-slate-500/50",
                  "text-slate-600 dark:text-slate-300"
                )}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-l border-white/20 dark:border-slate-600/50 bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl"
              >
                <nav className="grid gap-2 mt-8">
                  {/* Logo no menu mobile */}
                  <Link to="/platform" className="flex items-center gap-2 mb-6 px-2">
                    <img
                      src="/lovable-uploads/b16ed0cb-3142-4d88-85ea-a5a2deccbba2.png"
                      alt="Pedlife Logo"
                      className="h-10 w-auto"
                    />
                  </Link>

                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SheetClose key={item.to} asChild>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200",
                              isActive
                                ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-800/30"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <div className={cn(
                                "p-2 rounded-lg transition-colors",
                                isActive
                                  ? "bg-violet-100 dark:bg-violet-800/30"
                                  : "bg-slate-100 dark:bg-slate-800"
                              )}>
                                <Icon className={cn(
                                  "h-5 w-5",
                                  isActive ? "text-violet-500" : "text-slate-400"
                                )} />
                              </div>
                              {item.label}
                            </>
                          )}
                        </NavLink>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};
