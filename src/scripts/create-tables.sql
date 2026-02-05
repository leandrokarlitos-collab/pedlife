-- =====================================================
-- SCRIPT SQL PARA CRIAR TABELAS DE FAVORITOS E HISTÓRICO
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- 1. Criar tabela de favoritos
CREATE TABLE IF NOT EXISTS public.favorites (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medication_id TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  weight NUMERIC,
  age_months INTEGER,
  dose_result TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Índices para performance
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Criar tabela de histórico de pesquisas
CREATE TABLE IF NOT EXISTS public.search_history (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medication_id TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  category_name TEXT NOT NULL,
  search_count INTEGER DEFAULT 1,
  last_searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraint para evitar duplicatas
  UNIQUE(user_id, medication_id)
);

-- 3. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_medication_id ON public.favorites(medication_id);
CREATE INDEX IF NOT EXISTS idx_favorites_created_at ON public.favorites(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON public.search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_medication_id ON public.search_history(medication_id);
CREATE INDEX IF NOT EXISTS idx_search_history_search_count ON public.search_history(search_count DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_last_searched ON public.search_history(last_searched_at DESC);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas de segurança para favorites
-- Usuários podem ver apenas seus próprios favoritos
CREATE POLICY "Users can view own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem inserir seus próprios favoritos
CREATE POLICY "Users can insert own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuários podem deletar seus próprios favoritos
CREATE POLICY "Users can delete own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Admin pode ver todos os favoritos (para dashboard)
CREATE POLICY "Admin can view all favorites" ON public.favorites
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'admin@pedlife.com.br'
    )
  );

-- 6. Criar políticas de segurança para search_history
-- Usuários podem ver apenas seu próprio histórico
CREATE POLICY "Users can view own search history" ON public.search_history
  FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem inserir seu próprio histórico
CREATE POLICY "Users can insert own search history" ON public.search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar seu próprio histórico
CREATE POLICY "Users can update own search history" ON public.search_history
  FOR UPDATE USING (auth.uid() = user_id);

-- Usuários podem deletar seu próprio histórico
CREATE POLICY "Users can delete own search history" ON public.search_history
  FOR DELETE USING (auth.uid() = user_id);

-- Admin pode ver todo o histórico (para dashboard)
CREATE POLICY "Admin can view all search history" ON public.search_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'admin@pedlife.com.br'
    )
  );

-- 7. Criar view agregada para estatísticas do admin
CREATE OR REPLACE VIEW public.admin_medication_stats AS
SELECT
  medication_id,
  medication_name,
  category_slug,
  category_name,
  SUM(search_count) as total_searches,
  COUNT(DISTINCT user_id) as unique_users,
  MAX(last_searched_at) as last_searched
FROM public.search_history
GROUP BY medication_id, medication_name, category_slug, category_name
ORDER BY total_searches DESC;

-- 8. Criar view para favoritos agregados
CREATE OR REPLACE VIEW public.admin_favorites_stats AS
SELECT
  medication_id,
  medication_name,
  category_slug,
  COUNT(*) as total_favorites,
  COUNT(DISTINCT user_id) as unique_users
FROM public.favorites
GROUP BY medication_id, medication_name, category_slug
ORDER BY total_favorites DESC;

-- Conceder permissões para as views
GRANT SELECT ON public.admin_medication_stats TO authenticated;
GRANT SELECT ON public.admin_favorites_stats TO authenticated;

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================
