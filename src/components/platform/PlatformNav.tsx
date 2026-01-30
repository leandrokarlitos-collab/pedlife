import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';

export const PlatformNav: React.FC = () => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const navItems = [
    { to: "/platform/calculator", label: "Calculadora de Medicamentos" },
    { to: "/platform/insulin", label: "Referencial para Insulina" },
    { to: "/platform/protocols", label: "Protocolos" },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/platform" className="flex items-center gap-2 group">
            <img
              src="/lovable-uploads/b16ed0cb-3142-4d88-85ea-a5a2deccbba2.png"
              alt="Pedlife Logo"
              className="h-9 w-auto transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          {!isMobile && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink 
                  key={item.to} 
                  to={item.to} 
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="transition-all duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
            <span className="sr-only">Alternar tema</span>
          </Button>
          
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l">
                <nav className="grid gap-4 mt-8">
                  <Link to="/platform" className="flex items-center gap-2 mb-4">
                    <img
                      src="/lovable-uploads/b16ed0cb-3142-4d88-85ea-a5a2deccbba2.png"
                      alt="Pedlife Logo"
                      className="h-9 w-auto"
                    />
                  </Link>
                  {navItems.map((item) => (
                    <SheetClose key={item.to} asChild>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive 
                              ? 'bg-primary/10 text-primary' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};
