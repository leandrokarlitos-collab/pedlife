import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminProtocolsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Protocolos</h1>
          <p className="text-slate-400 mt-1">Gerencie os protocolos médicos</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Adicionar Protocolo
        </button>
      </div>

      {/* Coming Soon Card */}
      <div className={cn(
        "p-12 rounded-2xl text-center",
        "bg-slate-800/50 border border-slate-700/50"
      )}>
        <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <FileText className="h-10 w-10 text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Em Desenvolvimento</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          O módulo de gerenciamento de protocolos está sendo desenvolvido.
          Em breve você poderá criar e editar protocolos médicos diretamente por aqui.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-sm text-slate-400">Protocolos Ativos</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-sm text-slate-400">Categorias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProtocolsPage;
