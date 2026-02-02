import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumCategoryCard } from '@/components/ui/PremiumCategoryCard';
import { GlassSection } from '@/components/ui/GlassSection';
import { GlobalSearchBar } from '@/components/ui/GlobalSearchBar';
import { NavigationSection } from '@/components/ui/NavigationSection';
import { FeedbackSection } from '@/components/ui/FeedbackSection';
import { allCategories } from '@/data/mockMedications';
import { Link } from 'react-router-dom';
import { PremiumBabyIcon } from '@/components/icons/PremiumBabyIcon';

// Ícones GIF para as seções (na pasta public/icons)
const medicationsIcon = '/icons/medications.gif';
const insulinIcon = '/icons/medicine.gif';
const protocolsIcon = '/icons/heart.gif';

const CalculatorPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const categories = allCategories.map(cat => ({
    title: cat.title,
    slug: cat.slug,
    icon: PremiumBabyIcon,
    description: cat.description || "Dosagens e orientações clínicas."
  }));

  return (
    <div className="flex flex-col items-center py-20 px-4 min-h-[calc(100vh-10rem)] w-full relative z-10">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center mb-24 space-y-8 text-center relative animate-fade-in">
        
        {/* Badge Animado */}
        <div className="inline-flex items-center justify-center py-2 px-5 rounded-full bg-premium-violet/5 backdrop-blur-xl border border-premium-violet/20 text-premium-violet shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
           <div className="w-5 h-5 mr-2.5 text-premium-violet">
             <PremiumBabyIcon />
           </div>
           <span className="font-bold tracking-widest uppercase text-[10px]">PedLife Clinical Tools</span>
        </div>
        
        {/* Título com Shimmer Effect */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight pb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-premium-violet to-slate-900 dark:from-white dark:via-premium-violet dark:to-white bg-[length:200%_auto] animate-shimmer">
          Calculadoras Pediátricas
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium">
          Acesse ferramentas de dosagem precisas com nossa interface de ponta.
        </p>

        {/* Barra de Pesquisa Global */}
        <div className="w-full max-w-2xl mt-8 relative z-50">
          <GlobalSearchBar />
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-1 mt-6 shadow-sm backdrop-blur-md">
          <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}>
            <LayoutGrid className="h-4 w-4 mr-2" /> Grade
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}>
            <List className="h-4 w-4 mr-2" /> Lista
          </Button>
        </div>
      </div>
      
      <GlassSection
        title="Categorias de Medicamentos"
        subtitle={`${categories.length} categorias disponíveis`}
        iconGif={medicationsIcon}
        className="w-full max-w-7xl mx-4 relative z-10"
      >
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
          {categories.map((category, index) => (
            <div
              key={category.slug}
              className="animate-fade-in-up opacity-0"
              style={{
                animationDelay: `${(index + 2) * 0.08}s`,
                animationFillMode: 'forwards'
              }}
            >
              <Link to={`/platform/calculator/${category.slug}`} className="block h-full">
                <PremiumCategoryCard {...category} layout={viewMode} />
              </Link>
            </div>
          ))}
        </div>
      </GlassSection>

      {/* Seções de Navegação - Insulina e Protocolos */}
      <div className="w-full max-w-7xl mx-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${(categories.length + 2) * 0.08}s`, animationFillMode: 'forwards' }}
        >
          <NavigationSection
            title="Referencial para Insulina"
            description="Doses e ajustes de insulina pediátrica."
            icon={insulinIcon}
            href="/platform/insulin"
          />
        </div>
        <div
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${(categories.length + 3) * 0.08}s`, animationFillMode: 'forwards' }}
        >
          <NavigationSection
            title="Protocolos Clínicos"
            description="Fluxogramas e manejo de condições."
            icon={protocolsIcon}
            href="/platform/protocols"
          />
        </div>
      </div>

      {/* Seção de Feedback */}
      <div
        className="w-full max-w-md mx-4 mt-8 relative z-10 animate-fade-in-up opacity-0"
        style={{ animationDelay: `${(categories.length + 4) * 0.08}s`, animationFillMode: 'forwards' }}
      >
        <FeedbackSection />
      </div>
    </div>
  );
};

export default CalculatorPage;
