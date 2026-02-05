/**
 * Script para criar o usuário administrador no Supabase
 *
 * INSTRUÇÕES DE USO:
 *
 * Opção 1: Via Supabase Dashboard (Recomendado)
 * 1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
 * 2. Selecione seu projeto PedLife
 * 3. Vá em "Authentication" > "Users"
 * 4. Clique em "Add user" > "Create new user"
 * 5. Preencha:
 *    - Email: admin@pedlife.com.br
 *    - Password: admin@123
 *    - Marque "Auto Confirm User" para não precisar confirmar email
 * 6. Clique em "Create user"
 *
 * Opção 2: Via SQL Editor no Supabase
 * 1. Acesse o Supabase Dashboard
 * 2. Vá em "SQL Editor"
 * 3. Execute o seguinte SQL (após criar o usuário via Auth):
 *
 * -- Criar perfil do admin (executar após criar o usuário via Auth)
 * INSERT INTO public.profiles (id, email, full_name, crm, phone, created_at, updated_at)
 * SELECT
 *   id,
 *   'admin@pedlife.com.br',
 *   'Administrador PedLife',
 *   NULL,
 *   NULL,
 *   NOW(),
 *   NOW()
 * FROM auth.users
 * WHERE email = 'admin@pedlife.com.br'
 * ON CONFLICT (id) DO UPDATE SET
 *   full_name = 'Administrador PedLife',
 *   updated_at = NOW();
 *
 * CREDENCIAIS DO ADMINISTRADOR:
 * - Email: admin@pedlife.com.br
 * - Senha: admin@123
 *
 * ACESSO:
 * - URL do painel: /admin
 * - Após login, redireciona para: /admin/dashboard
 */

export const ADMIN_CREDENTIALS = {
  email: 'admin@pedlife.com.br',
  password: 'admin@123'
};

export const ADMIN_EMAILS = ['admin@pedlife.com.br'];

// Função para verificar se um email é de administrador
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
