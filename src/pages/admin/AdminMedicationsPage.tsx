import React from 'react';
import { Pill, Plus, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminMedicationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Medicamentos</h1>
          <p className="text-slate-400 mt-1">Gerencie o catálogo de medicamentos</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Adicionar Medicamento
        </button>
      </div>

      {/* Coming Soon Card */}
      <div className={cn(
        "p-12 rounded-2xl text-center",
        "bg-slate-800/50 border border-slate-700/50"
      )}>
        <div className="w-20 h-20 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
          <Pill className="h-10 w-10 text-violet-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Em Desenvolvimento</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          O módulo de gerenciamento de medicamentos está sendo desenvolvido.
          Em breve você poderá adicionar, editar e remover medicamentos diretamente por aqui.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-sm text-slate-400">Medicamentos</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-sm text-slate-400">Categorias</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-sm text-slate-400">Apresentações</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMedicationsPage;
