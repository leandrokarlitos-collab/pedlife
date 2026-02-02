import React from 'react';
import { cn } from '@/lib/utils';

interface AgeBracket {
  label: string;
  shortLabel: string;
  ageMonths: number;
  weightKg: number;
  description: string;
}

interface AgeBracketButtonsProps {
  onSelect: (ageMonths: number, weightKg: number) => void;
  selectedAge?: number;
}

const ageBrackets: AgeBracket[] = [
  {
    label: 'Recém-nascido',
    shortLabel: 'RN',
    ageMonths: 0,
    weightKg: 3.5,
    description: '0-28 dias'
  },
  {
    label: 'Lactente',
    shortLabel: '1-12m',
    ageMonths: 6,
    weightKg: 7,
    description: '1-12 meses'
  },
  {
    label: 'Pré-escolar',
    shortLabel: '1-3a',
    ageMonths: 24,
    weightKg: 12,
    description: '1-3 anos'
  },
  {
    label: 'Escolar',
    shortLabel: '3-6a',
    ageMonths: 48,
    weightKg: 18,
    description: '3-6 anos'
  },
  {
    label: 'Escolar maior',
    shortLabel: '6-10a',
    ageMonths: 96,
    weightKg: 28,
    description: '6-10 anos'
  },
  {
    label: 'Adolescente',
    shortLabel: '10+',
    ageMonths: 144,
    weightKg: 45,
    description: '10+ anos'
  },
];

const AgeBracketButtons: React.FC<AgeBracketButtonsProps> = ({ onSelect, selectedAge }) => {
  // Encontrar qual faixa está mais próxima da idade selecionada
  const getClosestBracket = (ageMonths: number): string => {
    if (ageMonths < 1) return 'RN';
    if (ageMonths <= 12) return '1-12m';
    if (ageMonths <= 36) return '1-3a';
    if (ageMonths <= 72) return '3-6a';
    if (ageMonths <= 120) return '6-10a';
    return '10+';
  };

  const activeBracket = selectedAge !== undefined ? getClosestBracket(selectedAge) : null;

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Seleção rápida por faixa etária:
      </span>
      <div className="flex flex-wrap gap-2">
        {ageBrackets.map((bracket) => (
          <button
            key={bracket.shortLabel}
            type="button"
            onClick={() => onSelect(bracket.ageMonths, bracket.weightKg)}
            title={`${bracket.label} (${bracket.description}) - Peso médio: ${bracket.weightKg}kg`}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              "border",
              activeBracket === bracket.shortLabel
                ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700"
                : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-violet-300 dark:hover:border-violet-700"
            )}
          >
            {bracket.shortLabel}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeBracketButtons;
