import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface SearchHistoryItem {
  id: string;
  medicationId: string;
  medicationName: string;
  categorySlug: string;
  categoryName: string;
  searchCount: number;
  lastSearchedAt: string;
}

const STORAGE_KEY = 'pedlife_search_history';
const MAX_HISTORY_ITEMS = 50;

export function useSearchHistory(user?: User | null) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar histórico do localStorage
  const loadFromLocalStorage = useCallback((): SearchHistoryItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico do localStorage:', error);
    }
    return [];
  }, []);

  // Salvar histórico no localStorage
  const saveToLocalStorage = useCallback((items: SearchHistoryItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Erro ao salvar histórico no localStorage:', error);
    }
  }, []);

  // Carregar histórico
  const loadHistory = useCallback(async () => {
    setLoading(true);

    // Se usuário está logado, tentar carregar do Supabase
    if (user?.id) {
      try {
        const { data, error } = await supabase
          .from('search_history')
          .select('*')
          .eq('user_id', user.id)
          .order('search_count', { ascending: false })
          .limit(MAX_HISTORY_ITEMS);

        if (!error && data) {
          const formattedHistory: SearchHistoryItem[] = data.map((item: any) => ({
            id: item.id,
            medicationId: item.medication_id,
            medicationName: item.medication_name,
            categorySlug: item.category_slug,
            categoryName: item.category_name,
            searchCount: item.search_count,
            lastSearchedAt: item.last_searched_at,
          }));
          setHistory(formattedHistory);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('Usando localStorage para histórico (tabela Supabase não disponível)');
      }
    }

    // Fallback para localStorage
    const localHistory = loadFromLocalStorage();
    setHistory(localHistory);
    setLoading(false);
  }, [user?.id, loadFromLocalStorage]);

  // Registrar uma pesquisa
  const recordSearch = useCallback(async (item: {
    medicationId: string;
    medicationName: string;
    categorySlug: string;
    categoryName: string;
  }) => {
    const now = new Date().toISOString();

    // Se usuário está logado, tentar salvar no Supabase
    if (user?.id) {
      try {
        // Verificar se já existe
        const { data: existing } = await supabase
          .from('search_history')
          .select('*')
          .eq('user_id', user.id)
          .eq('medication_id', item.medicationId)
          .single();

        if (existing) {
          // Atualizar contagem
          const { error } = await supabase
            .from('search_history')
            .update({
              search_count: existing.search_count + 1,
              last_searched_at: now,
            })
            .eq('id', existing.id);

          if (!error) {
            await loadHistory();
            return;
          }
        } else {
          // Inserir novo
          const { error } = await supabase.from('search_history').insert({
            id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            user_id: user.id,
            medication_id: item.medicationId,
            medication_name: item.medicationName,
            category_slug: item.categorySlug,
            category_name: item.categoryName,
            search_count: 1,
            last_searched_at: now,
          });

          if (!error) {
            await loadHistory();
            return;
          }
        }
      } catch (error) {
        console.log('Salvando histórico no localStorage');
      }
    }

    // Fallback para localStorage
    const currentHistory = loadFromLocalStorage();
    const existingIndex = currentHistory.findIndex(h => h.medicationId === item.medicationId);

    let updatedHistory: SearchHistoryItem[];

    if (existingIndex >= 0) {
      // Atualizar existente
      currentHistory[existingIndex].searchCount += 1;
      currentHistory[existingIndex].lastSearchedAt = now;
      updatedHistory = currentHistory;
    } else {
      // Adicionar novo
      const newItem: SearchHistoryItem = {
        id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...item,
        searchCount: 1,
        lastSearchedAt: now,
      };
      updatedHistory = [newItem, ...currentHistory].slice(0, MAX_HISTORY_ITEMS);
    }

    // Ordenar por contagem
    updatedHistory.sort((a, b) => b.searchCount - a.searchCount);

    saveToLocalStorage(updatedHistory);
    setHistory(updatedHistory);
  }, [user?.id, loadFromLocalStorage, saveToLocalStorage, loadHistory]);

  // Limpar histórico
  const clearHistory = useCallback(async () => {
    if (user?.id) {
      try {
        await supabase
          .from('search_history')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.log('Limpando histórico do localStorage');
      }
    }

    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, [user?.id]);

  // Obter medicamentos mais pesquisados (top N)
  const getMostSearched = useCallback((limit: number = 10): SearchHistoryItem[] => {
    return [...history]
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, limit);
  }, [history]);

  // Obter pesquisas recentes (por data)
  const getRecentSearches = useCallback((limit: number = 10): SearchHistoryItem[] => {
    return [...history]
      .sort((a, b) => new Date(b.lastSearchedAt).getTime() - new Date(a.lastSearchedAt).getTime())
      .slice(0, limit);
  }, [history]);

  // Carregar histórico ao montar ou quando usuário mudar
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    loading,
    recordSearch,
    clearHistory,
    getMostSearched,
    getRecentSearches,
    reload: loadHistory,
  };
}
