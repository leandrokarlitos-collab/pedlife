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
    let localItems = loadFromLocalStorage();

    // Se usuário está logado, sincronizar com Supabase
    if (user?.id) {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const cloudFavorites: FavoriteItem[] = data.map((item: any) => ({
            id: item.id,
            medicationId: item.medication_id,
            medicationName: item.medication_name,
            categorySlug: item.category_slug,
            weight: item.weight,
            ageMonths: item.age_months,
            doseResult: item.dose_result,
            createdAt: item.created_at,
          }));

          // Se houver itens locais, tentar subir os que não estão na nuvem
          const itemsToSync = localItems.filter(local =>
            !cloudFavorites.some(cloud => cloud.medicationId === local.medicationId && Math.abs(cloud.weight - local.weight) < 0.1)
          );

          if (itemsToSync.length > 0) {
            console.log(`Sincronizando ${itemsToSync.length} favoritos locais com a nuvem...`);
            for (const item of itemsToSync) {
              await supabase.from('favorites').insert({
                id: item.id,
                user_id: user.id,
                medication_id: item.medicationId,
                medication_name: item.medicationName,
                category_slug: item.categorySlug,
                weight: item.weight,
                age_months: item.ageMonths,
                dose_result: item.doseResult,
                created_at: item.createdAt,
              });
            }
            // Recarregar após sincronizar (opcional, ou apenas unificar em memória)
            const { data: updatedData } = await supabase
              .from('favorites')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false });

            if (updatedData) {
              const finalFavorites = updatedData.map((item: any) => ({
                id: item.id,
                medicationId: item.medication_id,
                medicationName: item.medication_name,
                categorySlug: item.category_slug,
                weight: item.weight,
                ageMonths: item.age_months,
                doseResult: item.dose_result,
                createdAt: item.created_at,
              }));
              setFavorites(finalFavorites);
              // Limpar local storage após sucesso na sincronização total
              localStorage.removeItem(STORAGE_KEY);
              setLoading(false);
              return;
            }
          }

          setFavorites(cloudFavorites);
          setLoading(false);
          return;
        } else if (error) {
          console.error('Erro Supabase favorites:', error);
        }
      } catch (error) {
        console.error('Erro na sincronização de favoritos:', error);
      }
    }

    // Fallback para localStorage (ou se não logado)
    setFavorites(localItems);
    setLoading(false);
  }, [user?.id, loadFromLocalStorage]);

  // Adicionar aos favoritos
  const addFavorite = useCallback(async (item: Omit<FavoriteItem, 'id' | 'createdAt'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    let success = false;

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
          success = true;
        } else {
          console.error('Erro ao salvar favorito no Supabase:', error);
          // Fallback silencioso para localStorage se der erro no banco
        }
      } catch (error) {
        console.error('Exceção ao salvar favorito:', error);
      }
    }

    if (!success) {
      // Fallback para localStorage ou comportamento offline
      const currentLocal = loadFromLocalStorage();
      const updatedFavorites = [newFavorite, ...currentLocal];
      saveToLocalStorage(updatedFavorites);
      setFavorites(updatedFavorites);
      success = true;
    }

    return success;
  }, [user?.id, loadFromLocalStorage, saveToLocalStorage]);

  // Remover dos favoritos
  const removeFavorite = useCallback(async (favoriteId: string) => {
    let success = false;

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
          success = true;
        }
      } catch (error) {
        console.error('Erro ao remover favorito do Supabase:', error);
      }
    }

    if (!success) {
      // Fallback para localStorage
      const localItems = loadFromLocalStorage();
      const updatedFavorites = localItems.filter(f => f.id !== favoriteId);
      saveToLocalStorage(updatedFavorites);
      setFavorites(updatedFavorites);
      success = true;
    }

    return success;
  }, [user?.id, loadFromLocalStorage, saveToLocalStorage]);

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
