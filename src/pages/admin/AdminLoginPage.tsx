import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// Lista de emails de administradores autorizados
const ADMIN_EMAILS = ['admin@pedlife.com.br'];

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Verificar se já está logado como admin
  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user && ADMIN_EMAILS.includes(session.user.email || '')) {
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAdminSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Verificar se o email é de um administrador
      if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
        setError('Acesso negado. Este login é exclusivo para administradores.');
        setLoading(false);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Credenciais inválidas. Verifique seu email e senha.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Email não confirmado. Verifique sua caixa de entrada.');
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (data.user) {
        // Verificação dupla de segurança
        if (ADMIN_EMAILS.includes(data.user.email || '')) {
          navigate('/admin/dashboard');
        } else {
          await supabase.auth.signOut();
          setError('Acesso negado. Você não tem permissões de administrador.');
        }
      }
    } catch (err: any) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Erro de login:', err);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className={cn(
        "relative w-full max-w-md",
        "bg-slate-800/50 backdrop-blur-xl",
        "border border-slate-700/50",
        "rounded-2xl shadow-2xl shadow-black/20",
        "p-8"
      )}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-slate-400 text-sm">
            Acesso restrito a administradores
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pedlife.com.br"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-xl",
                  "bg-slate-900/50 border border-slate-700",
                  "text-white placeholder:text-slate-500",
                  "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                  "transition-all duration-200"
                )}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "w-full pl-10 pr-12 py-3 rounded-xl",
                  "bg-slate-900/50 border border-slate-700",
                  "text-white placeholder:text-slate-500",
                  "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                  "transition-all duration-200"
                )}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 rounded-xl font-semibold",
              "bg-gradient-to-r from-violet-600 to-blue-600",
              "hover:from-violet-500 hover:to-blue-500",
              "text-white shadow-lg shadow-violet-500/25",
              "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-900",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Entrando...
              </span>
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-500">
            PedLife Admin Panel v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
