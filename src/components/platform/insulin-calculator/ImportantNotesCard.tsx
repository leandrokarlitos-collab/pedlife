import React from 'react';
import { AlertCircle } from 'lucide-react';

const ImportantNotesCard: React.FC = () => {
  return (
    <div className="rounded-2xl mb-8 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl backdrop-saturate-150 border border-white/50 dark:border-white/10 ring-1 ring-inset ring-white/20 dark:ring-white/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(99,102,241,0.08)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/30 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-700/30 shadow-sm">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Notas Importantes
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Iniciar controle da glicemia a cada 1 hora
            </p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Manter glicemia capilar ≤ 180 mg/dL
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportantNotesCard;
