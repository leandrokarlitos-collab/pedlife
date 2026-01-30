
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
// Ícones permitidos: Pill, Syringe, Stethoscope, Calendar, User, Bell, Calculator
// Outros ícones como Activity, Thermometer, ShieldCheck foram substituídos por Pill ou outros permitidos.
import { Pill, Syringe, Stethoscope } from 'lucide-react';
import { CategoryInfo } from '@/types/medication';
import { allCategories } from '@/data/mockMedications';

interface CategoryCardProps extends Omit<CategoryInfo, 'medicationsCount' | 'lastUpdated'> {
  // slug é necessário para o Link
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, slug, icon: Icon, iconColorClass, bgColorClass }) => (
  <Link to={`/platform/calculator/${slug}`} className="block group">
    <Card className="glass-card hover-lift cursor-pointer h-full border border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-col items-center justify-center text-center p-6 h-full">
        <div className="icon-glass-bg p-4 rounded-xl mb-4 transition-transform duration-200 group-hover:scale-105">
          <Icon className={`h-7 w-7 ${iconColorClass}`} />
        </div>
        
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  </Link>
);

const CalculatorPage: React.FC = () => {
  // Usar as categorias de mockMedications.ts
  const categories: CategoryCardProps[] = allCategories.map(cat => ({
    title: cat.title,
    slug: cat.slug,
    icon: cat.icon,
    iconColorClass: cat.iconColorClass,
    bgColorClass: cat.bgColorClass,
  }));

  return (
    <div className="flex flex-col items-center py-12 px-4 min-h-[calc(100vh-10rem)]">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
          Cálculo de Doses Pediátricas
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Escolha a categoria do medicamento para calcular a dose adequada com precisão e segurança para seus pacientes pediátricos.
        </p>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {categories.map((category) => (
          <div key={category.slug} className="animate-fade-in">
            <CategoryCard {...category} />
          </div>
        ))}
      </div>
      
      {/* Bottom info */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="text-lg mr-2">💊</span>
          <span className="font-semibold text-primary">{categories.length}</span>
          <span className="ml-1">categorias disponíveis</span>
        </p>
      </div>
    </div>
  );
};

export default CalculatorPage;
