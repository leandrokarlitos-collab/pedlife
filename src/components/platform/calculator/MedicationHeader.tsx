import React from 'react';
import { Medication, CategoryInfo } from '@/types/medication';
import { Pill, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MedicationHeaderProps {
  medication: Medication;
  categorySlug: string;
  categoryDisplayInfo: Omit<CategoryInfo, 'medicationsCount' | 'lastUpdated'>;
}

const MedicationHeader: React.FC<MedicationHeaderProps> = ({
  medication,
  categorySlug,
  categoryDisplayInfo,
}) => {
  const CategoryIcon = categoryDisplayInfo.icon || Pill;

  // Extrair vias de administração
  const routes = medication.application
    ? medication.application.split(/\s*[\/,]\s*/).map(r => r.trim().toUpperCase())
    : [];

  // Cores para badges de via
  const getRouteColor = (route: string) => {
    const colors: Record<string, string> = {
      'VO': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      'EV': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'IM': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
      'SC': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      'TÓPICO': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      'NASAL': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
      'OCULAR': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      'RETAL': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    };
    return colors[route] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
  };

  return (
    <div className="relative">
      {/* Glass Card */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/60 dark:bg-slate-800/80",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/40 dark:border-slate-600/60",
        "shadow-lg shadow-black/5 dark:shadow-black/30"
      )}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative p-6">
          {/* Botão voltar + Breadcrumb simplificado */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              to={`/platform/calculator/${categorySlug}`}
              className={cn(
                "p-2 rounded-xl transition-all duration-200",
                "bg-white/50 dark:bg-slate-700/70 hover:bg-white/80 dark:hover:bg-slate-700/90",
                "border border-white/50 dark:border-slate-600/50",
                "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link
                to="/platform/calculator"
                className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Calculadora
              </Link>
              <span>/</span>
              <Link
                to={`/platform/calculator/${categorySlug}`}
                className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {categoryDisplayInfo.title}
              </Link>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex items-start gap-5">
            {/* Ícone */}
            <div className={cn(
              "p-4 rounded-2xl flex-shrink-0",
              "bg-gradient-to-br from-white/80 to-white/40",
              "dark:from-slate-700/90 dark:to-slate-700/60",
              "border border-white/50 dark:border-slate-600/50",
              "shadow-sm dark:shadow-black/20"
            )}>
              <CategoryIcon className={cn("h-10 w-10", categoryDisplayInfo.iconColorClass || 'text-violet-500')} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Nome e badges de via */}
              <div className="flex flex-wrap items-start gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {medication.name}
                </h1>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {routes.map((route, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "px-2 py-0.5 rounded-md text-xs font-semibold",
                        getRouteColor(route)
                      )}
                    >
                      {route}
                    </span>
                  ))}
                </div>
              </div>

              {/* Forma farmacêutica */}
              {medication.form && (
                <p className="text-base text-slate-600 dark:text-slate-400 mb-2">
                  {medication.form}
                </p>
              )}

              {/* Concentração e nomes comerciais */}
              <div className="flex flex-wrap items-center gap-3">
                {medication.dosageInformation?.concentration && (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                    "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300",
                    "border border-violet-200 dark:border-violet-800/30"
                  )}>
                    💊 {medication.dosageInformation.concentration}
                  </span>
                )}
                {medication.commonBrandNames && (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm",
                    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}>
                    🏷️ {medication.commonBrandNames}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationHeader;
