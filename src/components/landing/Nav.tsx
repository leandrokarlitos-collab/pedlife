
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Nav: React.FC = () => {
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <Link
        to="#recursos"
        className="leading-none py-2 md:py-0 md:self-center text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
      >
        Recursos
      </Link>
      <Link
        to="#beneficios"
        className="leading-none py-2 md:py-0 md:self-center text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
      >
        Benefícios
      </Link>
      <Link
        to="#depoimentos"
        className="leading-none py-2 md:py-0 md:self-center text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
      >
        Depoimentos
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-20 flex w-full flex-col items-stretch text-base font-normal justify-center px-6 md:px-[70px] py-4 max-md:max-w-full bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 dark:border-slate-700/40 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]">
      <div className="flex w-full max-w-[1280px] mx-auto items-center justify-between gap-5">
        <Link to="/" className="transition-transform duration-200 hover:scale-105">
          <img
            src="/lovable-uploads/b16ed0cb-3142-4d88-85ea-a5a2deccbba2.png"
            alt="Pedlife Logo"
            className="aspect-[4.27] object-contain w-[130px] md:w-[145px] shrink-0 max-w-full"
          />
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-10 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-l border-white/40 dark:border-slate-700/40">
              <div className="flex flex-col items-start gap-6 p-4">
                {React.Children.toArray(navLinks).map((link, index) => (
                  <SheetClose asChild key={index}>
                    {link}
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    asChild
                    size="default"
                    className="relative rounded-full px-6 w-full mt-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg shadow-violet-500/25 overflow-hidden group"
                  >
                    <Link to="/auth">
                      <span className="relative z-10">Acesse Grátis</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-[34px] flex-wrap">
            {navLinks}
            <Button
              asChild
              size="default"
              className="relative rounded-full px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg shadow-violet-500/25 overflow-hidden group transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link to="/auth">
                <span className="relative z-10">Acesse Grátis</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

