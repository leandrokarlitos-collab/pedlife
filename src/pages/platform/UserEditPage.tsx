import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from '@/hooks/use-user';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUser();

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [crm, setCrm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Preencher os campos automaticamente com os dados do cadastro
  useEffect(() => {
    if (profile) {
      // Separar nome completo em nome e sobrenome
      const nameParts = (profile.full_name || '').trim().split(' ');
      const first = nameParts[0] || '';
      const last = nameParts.slice(1).join(' ') || '';

      setFirstName(first);
      setLastName(last);
      setCrm(profile.crm || '');
    }

    if (user) {
      setEmail(user.email || '');
    }
  }, [profile, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !profile) return;

    setSaving(true);
    setMessage(null);

    try {
      // Atualizar perfil no banco de dados
      const fullName = `${firstName} ${lastName}`.trim();

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          crm: crm || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) {
        throw profileError;
      }

      // Se o email foi alterado, atualizar no auth
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email
        });

        if (emailError) {
          throw emailError;
        }

        setMessage({
          type: 'success',
          text: 'Perfil atualizado! Um email de confirmação foi enviado para o novo endereço.'
        });
      } else {
        setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      }

      // Refresh para atualizar os dados
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Erro ao salvar alterações. Tente novamente.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Preencha todos os campos de senha.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'As senhas não coincidem.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'A nova senha deve ter no mínimo 6 caracteres.' });
      return;
    }

    setSavingPassword(true);
    setPasswordMessage(null);

    try {
      // Primeiro verificar a senha atual fazendo login
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });

      if (signInError) {
        setPasswordMessage({ type: 'error', text: 'Senha atual incorreta.' });
        return;
      }

      // Atualizar a senha
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        throw updateError;
      }

      setPasswordMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      setPasswordMessage({
        type: 'error',
        text: error.message || 'Erro ao alterar senha. Tente novamente.'
      });
    } finally {
      setSavingPassword(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header */}
      <button
        onClick={() => navigate('/platform/profile')}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao Perfil
      </button>

      {/* Card de Informações do Perfil */}
      <Card className={cn(
        "mb-6",
        "bg-white/60 dark:bg-slate-900/50",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/40 dark:border-white/10",
        "shadow-lg shadow-black/5"
      )}>
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Informações do Perfil</CardTitle>
          <CardDescription>Atualize seus dados pessoais e profissionais.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">Nome</Label>
                <Input
                  id="firstName"
                  placeholder="Seu nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white/80 dark:bg-slate-800/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">Sobrenome</Label>
                <Input
                  id="lastName"
                  placeholder="Seu sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white/80 dark:bg-slate-800/80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crm" className="text-slate-700 dark:text-slate-300">CRM</Label>
              <Input
                id="crm"
                placeholder="Seu número de CRM (opcional)"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                className="bg-white/80 dark:bg-slate-800/80"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Informe seu CRM para identificação profissional.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/80 dark:bg-slate-800/80"
              />
              {email !== user?.email && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Ao alterar o email, você receberá um link de confirmação no novo endereço.
                </p>
              )}
            </div>

            {message && (
              <div className={cn(
                "flex items-center gap-2 p-3 rounded-lg text-sm",
                message.type === 'success'
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
              )}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {message.text}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Card de Alteração de Senha */}
      <Card className={cn(
        "bg-white/60 dark:bg-slate-900/50",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/40 dark:border-white/10",
        "shadow-lg shadow-black/5"
      )}>
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Alterar Senha</CardTitle>
          <CardDescription>Mantenha sua conta segura com uma senha forte.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-slate-700 dark:text-slate-300">Senha Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Digite sua senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-white/80 dark:bg-slate-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-700 dark:text-slate-300">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white/80 dark:bg-slate-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/80 dark:bg-slate-800/80"
              />
            </div>

            {passwordMessage && (
              <div className={cn(
                "flex items-center gap-2 p-3 rounded-lg text-sm",
                passwordMessage.type === 'success'
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
              )}>
                {passwordMessage.type === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {passwordMessage.text}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outline"
                disabled={savingPassword}
                className="border-slate-300 dark:border-slate-600"
              >
                {savingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  'Alterar Senha'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEditPage;
