import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface FavoriteItem {
  id: string;
  medicationId: string;
  medicationName: string;
  categorySlug: string;
  weight: number;
  ageMonths: number;
  doseResult: string;
  createdAt: string;
}

const STORAGE_KEY = 'pedlife_favorites';

export function useFavorites(user?: User | null) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar favoritos do localStorage
  const loadFromLocalStorage = useCallback((): FavoriteItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
    }
    return [];
  }, []);

  // Salvar favoritos no localStorage
  const saveToLocalStorage = useCallback((items: FavoriteItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error);
    }
  }, []);

  // Carregar favoritos (tenta Supabase primeiro, fallback para localStorage)
  const loadFavorites = useCallback(async () => {
    setLoading(true);

    // Se usuário está logado, tentar carregar do Supabase
    if (user?.id) {
      try {
        // Tentar buscar do Supabase (tabela 'favorites' se existir)
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const formattedFavorites: FavoriteItem[] = data.map((item: any) => ({
            id: item.id,
            medicationId: item.medication_id,
            medicationName: item.medication_name,
            categorySlug: item.category_slug,
            weight: item.weight,
            ageMonths: item.age_months,
            doseResult: item.dose_result,
            createdAt: item.created_at,
          }));
          setFavorites(formattedFavorites);
          setLoading(false);
          return;
        }
      } catch (error) {
        // Tabela não existe ou erro, usar localStorage
        console.log('Usando localStorage para favoritos (tabela Supabase não disponível)');
      }
    }

    // Fallback para localStorage
    const localFavorites = loadFromLocalStorage();
    setFavorites(localFavorites);
    setLoading(false);
  }, [user?.id, loadFromLocalStorage]);

  // Adicionar aos favoritos
  const addFavorite = useCallback(async (item: Omit<FavoriteItem, 'id' | 'createdAt'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    // Se usuário está logado, tentar salvar no Supabase
    if (user?.id) {
      try {
        const { error } = await supabase.from('favorites').insert({
          id: newFavorite.id,
          user_id: user.id,
          medication_id: newFavorite.medicationId,
          medication_name: newFavorite.medicationName,
          category_slug: newFavorite.categorySlug,
          weight: newFavorite.weight,
          age_months: newFavorite.ageMonths,
          dose_result: newFavorite.doseResult,
          created_at: newFavorite.createdAt,
        });

        if (!error) {
          setFavorites(prev => [newFavorite, ...prev]);
          return true;
        }
      } catch (error) {
        console.log('Salvando favorito no localStorage');
      }
    }

    // Fallback para localStorage
    const updatedFavorites = [newFavorite, ...favorites];
    saveToLocalStorage(updatedFavorites);
    setFavorites(updatedFavorites);
    return true;
  }, [user?.id, favorites, saveToLocalStorage]);

  // Remover dos favoritos
  const removeFavorite = useCallback(async (favoriteId: string) => {
    // Se usuário está logado, tentar remover do Supabase
    if (user?.id) {
      try {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', favoriteId)
          .eq('user_id', user.id);

        if (!error) {
          setFavorites(prev => prev.filter(f => f.id !== favoriteId));
          return true;
        }
      } catch (error) {
        console.log('Removendo favorito do localStorage');
      }
    }

    // Fallback para localStorage
    const updatedFavorites = favorites.filter(f => f.id !== favoriteId);
    saveToLocalStorage(updatedFavorites);
    setFavorites(updatedFavorites);
    return true;
  }, [user?.id, favorites, saveToLocalStorage]);

  // Verificar se um medicamento está nos favoritos
  const isFavorite = useCallback((medicationId: string) => {
    return favorites.some(f => f.medicationId === medicationId);
  }, [favorites]);

  // Toggle favorito
  const toggleFavorite = useCallback(async (item: Omit<FavoriteItem, 'id' | 'createdAt'>) => {
    const existing = favorites.find(f => f.medicationId === item.medicationId);
    if (existing) {
      return removeFavorite(existing.id);
    } else {
      return addFavorite(item);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Carregar favoritos ao montar ou quando usuário mudar
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    reload: loadFavorites,
  };
}
