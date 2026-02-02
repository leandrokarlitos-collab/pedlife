import React from 'react';
import { CheckCircle2, Beaker, Clock, FlaskConical } from 'lucide-react';

export interface CalculatedValues {
  doseInsulinaUIH: string;
  administracaoBICMlH: string;
  solucaoInsulina: string;
}

interface InsulinCalculationResultsProps {
  calculatedValues: CalculatedValues;
  taxaInfusaoUIKgH: number | undefined;
}

const InsulinCalculationResults: React.FC<InsulinCalculationResultsProps> = ({ calculatedValues, taxaInfusaoUIKgH }) => {
  return (
    <div className="rounded-2xl mb-8 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-white/10 ring-1 ring-inset ring-white/20 dark:ring-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(99,102,241,0.08)] animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/30 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/30 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Resultados Calculados
          </h3>
        </div>
      </div>

      {/* Results Grid */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Dose de Insulina */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/20">
            <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/30">
              <Beaker className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Dose de Insulina (UI/H)
              </p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">
                {calculatedValues.doseInsulinaUIH} <span className="text-sm font-medium text-slate-500">UI/H</span>
              </p>
            </div>
          </div>

          {/* Taxa de Infusão */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/20">
            <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/30">
              <Clock className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Taxa de Infusão (UI/KG/H)
              </p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">
                {taxaInfusaoUIKgH} <span className="text-sm font-medium text-slate-500">UI/KG/H</span>
              </p>
            </div>
          </div>

          {/* Solução de Insulina */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/20">
            <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/30">
              <FlaskConical className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Solução de Insulina
              </p>
              <p className="text-base font-bold text-slate-800 dark:text-white">
                {calculatedValues.solucaoInsulina}
              </p>
            </div>
          </div>

          {/* Administração em BIC */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/20">
            <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/30">
              <Beaker className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Administração em BIC (ML/H)
              </p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">
                {calculatedValues.administracaoBICMlH} <span className="text-sm font-medium text-slate-500">ML/H</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsulinCalculationResults;
