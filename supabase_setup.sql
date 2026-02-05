-- =====================================================
-- PEDLIFE - SETUP DO BANCO DE DADOS SUPABASE
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- 1. TABELA DE PERFIS DE USUÁRIOS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  crm TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Política: Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política: Usuários podem inserir seu próprio perfil
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, crm, phone)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'crm',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger se já existir e recriar
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. TABELA DE FAVORITOS (OPCIONAL - para persistência no banco)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medication_id TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  weight DECIMAL(5,2),
  age_months INTEGER,
  dose_result TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para favoritos
CREATE POLICY "Users can view own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);

-- 3. TABELA DE HISTÓRICO DE PESQUISAS (OPCIONAL)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.search_history (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medication_id TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  category_name TEXT NOT NULL,
  search_count INTEGER DEFAULT 1,
  last_searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Políticas para histórico
CREATE POLICY "Users can view own history" ON public.search_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history" ON public.search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own history" ON public.search_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own history" ON public.search_history
  FOR DELETE USING (auth.uid() = user_id);

-- Índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON public.search_history(user_id);

-- =====================================================
-- FIM DO SETUP
-- =====================================================
