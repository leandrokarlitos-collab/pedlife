import React from 'react';
import { Minus, Plus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgeInputProps {
  value: number; // valor em meses
  onChange: (months: number) => void;
  min?: number;
  max?: number;
}

const AgeInput: React.FC<AgeInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 216, // 18 anos em meses
}) => {
  // Converter meses para anos e meses
  const formatAge = (months: number): string => {
    if (months < 1) return 'Recém-nascido';
    if (months < 12) return `${months} ${months === 1 ? 'mês' : 'meses'}`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }

    return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <Calendar className="h-4 w-4 text-violet-500" />
        Idade
      </label>

      {/* Input com botões +/- */}
      <div className={cn(
        "flex items-center gap-2 p-2 rounded-xl",
        "bg-white/70 dark:bg-slate-800/70",
        "border border-slate-200 dark:border-slate-700",
        "focus-within:ring-2 focus-within:ring-violet-500/30 focus-within:border-violet-500"
      )}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600",
            "text-slate-600 dark:text-slate-300",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              value={value}
              onChange={handleInputChange}
              min={min}
              max={max}
              className={cn(
                "w-16 text-center text-xl font-bold bg-transparent",
                "text-slate-900 dark:text-white",
                "focus:outline-none",
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              )}
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">meses</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600",
            "text-slate-600 dark:text-slate-300",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Conversão visual */}
      <div className={cn(
        "flex items-center justify-center gap-2 px-3 py-2 rounded-lg",
        "bg-violet-50 dark:bg-violet-900/20",
        "border border-violet-100 dark:border-violet-800/30"
      )}>
        <span className="text-sm text-violet-600 dark:text-violet-400">
          📅 Equivale a: <span className="font-semibold">{formatAge(value)}</span>
        </span>
      </div>
    </div>
  );
};

export default AgeInput;
