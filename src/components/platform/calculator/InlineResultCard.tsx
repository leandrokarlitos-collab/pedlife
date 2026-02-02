import React, { useState } from 'react';
import { Medication } from '@/types/medication';
import { Check, Copy, Plus, Star, User, Scale, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculationResult {
  doseText: string;
  weight: number;
  ageMonths: number;
  calculationTime: string;
  calculationDate: string;
}

interface InlineResultCardProps {
  medication: Medication;
  result: CalculationResult;
  onNewCalculation: () => void;
  onFavorite?: () => void;
}

const InlineResultCard: React.FC<InlineResultCardProps> = ({
  medication,
  result,
  onNewCalculation,
  onFavorite,
}) => {
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Extrair vias de administração
  const routes = medication.application
    ? medication.application.split(/\s*[\/,]\s*/).map(r => r.trim().toUpperCase())
    : [];

  // Formatar idade
  const formatAge = (months: number): string => {
    if (months < 1) return 'Recém-nascido';
    if (months < 12) return `${months} ${months === 1 ? 'mês' : 'meses'}`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }

    return `${years}a ${remainingMonths}m`;
  };

  // Copiar apenas o resultado da dose
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.doseText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  // Favoritar
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl",
      "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      "border-2 border-emerald-200 dark:border-emerald-800/50",
      "shadow-lg shadow-emerald-500/10"
    )}>
      {/* Header com ícone de sucesso */}
      <div className="flex items-center gap-3 px-5 py-3 bg-emerald-100/50 dark:bg-emerald-900/30 border-b border-emerald-200 dark:border-emerald-800/50">
        <div className="p-1.5 rounded-full bg-emerald-500 text-white">
          <Check className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Dose Calculada
        </span>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 ml-auto">
          <Clock className="h-3 w-3" />
          {result.calculationTime} - {result.calculationDate}
        </span>
      </div>

      {/* Conteúdo principal */}
      <div className="p-5">
        {/* Resultado da dose - Grande e destacado */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💊</span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-relaxed">
                  {result.doseText}
                </p>
                {/* Botão copiar alinhado com o resultado */}
                <button
                  onClick={handleCopy}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200 flex-shrink-0",
                    copied
                      ? "bg-emerald-500 text-white"
                      : "bg-white/70 dark:bg-slate-800/70 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-emerald-200 dark:border-emerald-700"
                  )}
                  title="Copiar resultado"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              {/* Via de administração - sutil, integrado */}
              {routes.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Via:</span>
                  {routes.map((route, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-slate-600 dark:text-slate-300"
                    >
                      {route}{idx < routes.length - 1 && ' /'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dados do paciente - Linha compacta */}
        <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400">Paciente:</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
            <Scale className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{result.weight} kg</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{formatAge(result.ageMonths)}</span>
          </div>
        </div>

        {/* Botão "+ Novo cálculo" e estrela de favorito */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={onNewCalculation}
            className={cn(
              "group relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200",
              "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700",
              "text-white shadow-md shadow-violet-500/20",
              "hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5",
              "overflow-hidden"
            )}
          >
            {/* Efeito de brilho no hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <Plus className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Novo cálculo</span>
          </button>

          {/* Estrela de favorito no canto inferior direito */}
          <button
            onClick={handleFavorite}
            className={cn(
              "p-2.5 rounded-full transition-all duration-200",
              isFavorite
                ? "text-amber-500 hover:text-amber-600"
                : "text-slate-400 hover:text-amber-500"
            )}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Star className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InlineResultCard;
