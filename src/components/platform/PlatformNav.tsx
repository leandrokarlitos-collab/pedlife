import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, Calculator, Droplets, BookOpenText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const PlatformNav: React.FC = () => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { to: "/platform/calculator", label: "Medicamentos", icon: Calculator },
    { to: "/platform/insulin", label: "Insulina", icon: Droplets },
    { to: "/platform/protocols", label: "Protocolos", icon: BookOpenText },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full relative">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 dark:border-white/10" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.02] via-transparent to-blue-500/[0.02] pointer-events-none" />

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
                          ? "bg-white/70 dark:bg-slate-800/70 text-violet-600 dark:text-violet-400 shadow-sm border border-white/50 dark:border-white/10"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800/50"
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
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2.5 rounded-xl transition-all duration-200",
              "bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80",
              "border border-white/50 dark:border-white/10",
              "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
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
                  "bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80",
                  "border border-white/50 dark:border-white/10",
                  "text-slate-600 dark:text-slate-400"
                )}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-l border-white/20 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"
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
