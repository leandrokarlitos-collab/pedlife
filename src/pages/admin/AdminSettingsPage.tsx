import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Globe, Save, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSettingsPage: React.FC = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurações</h1>
          <p className="text-slate-400 mt-1">Configure as opções do sistema</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Globe className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Geral</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Nome do Sistema
              </label>
              <input
                type="text"
                defaultValue="PedLife"
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg",
                  "bg-slate-900/50 border border-slate-700",
                  "text-white placeholder:text-slate-500",
                  "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                )}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Email de Contato
              </label>
              <input
                type="email"
                defaultValue="contato@pedlife.com.br"
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg",
                  "bg-slate-900/50 border border-slate-700",
                  "text-white placeholder:text-slate-500",
                  "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                )}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Versão
              </label>
              <input
                type="text"
                defaultValue="1.0.0"
                disabled
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg",
                  "bg-slate-900/50 border border-slate-700",
                  "text-slate-500",
                  "cursor-not-allowed"
                )}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-500/20">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Segurança</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div>
                <p className="font-medium text-white">Autenticação em Duas Etapas</p>
                <p className="text-sm text-slate-400">Requer código adicional no login</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div>
                <p className="font-medium text-white">Sessões Simultâneas</p>
                <p className="text-sm text-slate-400">Permitir múltiplos logins</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div>
                <p className="font-medium text-white">Log de Atividades</p>
                <p className="text-sm text-slate-400">Registrar ações dos usuários</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Bell className="h-5 w-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Notificações</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div>
                <p className="font-medium text-white">Email de Boas-vindas</p>
                <p className="text-sm text-slate-400">Enviar para novos usuários</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div>
                <p className="font-medium text-white">Alertas de Sistema</p>
                <p className="text-sm text-slate-400">Notificar sobre erros críticos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Database className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Banco de Dados</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-white">Status</p>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Conectado
                </span>
              </div>
              <p className="text-sm text-slate-400">Supabase PostgreSQL</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-white">Backup Automático</p>
                <span className="text-sm text-slate-400">Diário às 03:00</span>
              </div>
              <p className="text-sm text-slate-400">Último backup: Hoje às 03:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={cn(
        "p-6 rounded-2xl",
        "bg-red-500/10 border border-red-500/20"
      )}>
        <h2 className="text-lg font-semibold text-red-400 mb-4">Zona de Perigo</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-medium text-white">Limpar Cache do Sistema</p>
            <p className="text-sm text-slate-400">Remove todos os dados em cache. Pode afetar temporariamente o desempenho.</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors whitespace-nowrap">
            Limpar Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
