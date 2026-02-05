import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Shield, CheckCircle, AlertCircle, Loader2, ArrowRight, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_EMAIL = 'admin@pedlife.com.br';
const ADMIN_PASSWORD = 'admin@123';

const AdminSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'exists' | 'not_found' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      // Tentar fazer login com as credenciais do admin
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (data.user) {
        // Admin existe e credenciais estão corretas
        await supabase.auth.signOut();
        setStatus('exists');
        setMessage('O usuário administrador já existe e está configurado corretamente.');
        return;
      }

      if (error) {
        setStatus('not_found');
        setMessage('O usuário administrador precisa ser criado manualmente no Supabase Dashboard.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage('Erro ao verificar: ' + err.message);
    }
  };

  const sqlScript = `-- Criar perfil do admin (execute após criar o usuário)
INSERT INTO public.profiles (id, email, full_name, crm, phone, created_at, updated_at)
SELECT
  id,
  'admin@pedlife.com.br',
  'Administrador PedLife',
  NULL,
  NULL,
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@pedlife.com.br'
ON CONFLICT (id) DO UPDATE SET
  full_name = 'Administrador PedLife',
  updated_at = NOW();`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className={cn(
        "w-full max-w-2xl",
        "bg-slate-800/50 backdrop-blur-xl",
        "border border-slate-700/50",
        "rounded-2xl shadow-2xl shadow-black/20",
        "p-8"
      )}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={cn(
            "inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6",
            status === 'error' ? 'bg-red-500/20' :
            status === 'exists' ? 'bg-green-500/20' :
            'bg-gradient-to-br from-violet-500 to-blue-600'
          )}>
            {status === 'checking' ? (
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            ) : status === 'error' ? (
              <AlertCircle className="h-10 w-10 text-red-400" />
            ) : status === 'exists' ? (
              <CheckCircle className="h-10 w-10 text-green-400" />
            ) : (
              <Shield className="h-10 w-10 text-white" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {status === 'checking' && 'Verificando...'}
            {status === 'exists' && 'Admin Configurado!'}
            {status === 'not_found' && 'Configurar Administrador'}
            {status === 'error' && 'Erro'}
          </h1>
          <p className="text-slate-400">{message}</p>
        </div>

        {/* Admin exists - show credentials and login button */}
        {status === 'exists' && (
          <>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Credenciais de Acesso:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white font-mono text-sm">{ADMIN_EMAIL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Senha:</span>
                  <span className="text-white font-mono text-sm">{ADMIN_PASSWORD}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin')}
              className={cn(
                "w-full py-3 rounded-xl font-semibold",
                "bg-gradient-to-r from-violet-600 to-blue-600",
                "hover:from-violet-500 hover:to-blue-500",
                "text-white shadow-lg shadow-violet-500/25",
                "flex items-center justify-center gap-2",
                "transition-all duration-200"
              )}
            >
              Ir para o Login
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Admin not found - show setup instructions */}
        {status === 'not_found' && (
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">1</span>
                <h3 className="font-semibold text-white">Criar usuário no Supabase</h3>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-sm ml-11">
                <li>Acesse o <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline inline-flex items-center gap-1">Supabase Dashboard <ExternalLink className="h-3 w-3" /></a></li>
                <li>Vá em <strong className="text-white">Authentication</strong> → <strong className="text-white">Users</strong></li>
                <li>Clique em <strong className="text-white">Add user</strong> → <strong className="text-white">Create new user</strong></li>
                <li>Preencha: Email: <code className="text-violet-400">{ADMIN_EMAIL}</code></li>
                <li>Senha: <code className="text-violet-400">{ADMIN_PASSWORD}</code></li>
                <li>Marque <strong className="text-white">Auto Confirm User</strong></li>
                <li>Clique em <strong className="text-white">Create user</strong></li>
              </ol>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">2</span>
                <h3 className="font-semibold text-white">Criar perfil via SQL</h3>
              </div>
              <p className="text-slate-400 text-sm mb-3 ml-11">
                Vá em <strong className="text-white">SQL Editor</strong> e execute:
              </p>
              <div className="relative">
                <pre className="p-3 rounded-lg bg-slate-950 text-xs text-slate-300 overflow-x-auto">
                  {sqlScript}
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copiar SQL"
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">3</span>
                <h3 className="font-semibold text-white">Acessar o painel</h3>
              </div>
              <p className="text-slate-400 text-sm ml-11">
                Após criar o usuário, clique no botão abaixo para fazer login.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={checkAdminExists}
                className="flex-1 py-3 rounded-xl font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                Verificar Novamente
              </button>
              <button
                onClick={() => navigate('/admin')}
                className={cn(
                  "flex-1 py-3 rounded-xl font-semibold",
                  "bg-gradient-to-r from-violet-600 to-blue-600",
                  "hover:from-violet-500 hover:to-blue-500",
                  "text-white shadow-lg shadow-violet-500/25",
                  "flex items-center justify-center gap-2",
                  "transition-all duration-200"
                )}
              >
                Ir para o Login
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={checkAdminExists}
              className="w-full py-3 rounded-xl font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="w-full py-3 rounded-xl font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Ir para o Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSetupPage;
