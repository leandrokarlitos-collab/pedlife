import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Star,
  TrendingUp,
  Clock,
  Trash2,
  ChevronRight,
  LogOut,
  Settings,
  Mail,
  Phone,
  BadgeCheck,
  Calendar,
  Pill,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useFavorites, FavoriteItem } from '@/hooks/use-favorites';
import { useSearchHistory, SearchHistoryItem } from '@/hooks/use-search-history';
import { logout } from '@/utils/auth-utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUser();
  const { favorites, loading: favoritesLoading, removeFavorite } = useFavorites(user);
  const { getMostSearched, getRecentSearches, clearHistory, loading: historyLoading } = useSearchHistory(user);

  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'settings'>('favorites');

  const mostSearched = getMostSearched(10);
  const recentSearches = getRecentSearches(5);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch {
      return dateString;
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
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <User className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
          Faça login para acessar seu perfil
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Seus favoritos e histórico de pesquisas ficam salvos na sua conta.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
        >
          Fazer Login
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header do Perfil */}
      <div className={cn(
        "rounded-2xl overflow-hidden mb-6",
        "bg-gradient-to-br from-violet-500 to-blue-600",
        "shadow-lg shadow-violet-500/20"
      )}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-2xl font-bold mb-1">
                {profile?.full_name || 'Usuário'}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
                {profile?.crm && (
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4" />
                    CRM: {profile.crm}
                  </span>
                )}
                {profile?.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </span>
                )}
              </div>

              {profile?.created_at && (
                <p className="text-xs text-white/60 mt-2 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Membro desde {format(new Date(profile.created_at), "MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              )}
            </div>

            {/* Botão Logout */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Sair da conta"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 bg-white/10 backdrop-blur-sm">
          <div className="p-4 text-center border-r border-white/10">
            <p className="text-2xl font-bold text-white">{favorites.length}</p>
            <p className="text-xs text-white/70">Favoritos</p>
          </div>
          <div className="p-4 text-center border-r border-white/10">
            <p className="text-2xl font-bold text-white">{mostSearched.length}</p>
            <p className="text-xs text-white/70">Medicamentos</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {mostSearched.reduce((acc, item) => acc + item.searchCount, 0)}
            </p>
            <p className="text-xs text-white/70">Pesquisas</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('favorites')}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
            activeTab === 'favorites'
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
              : "bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 border border-transparent"
          )}
        >
          <Star className="h-4 w-4" />
          Favoritos
          {favorites.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-xs">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
            activeTab === 'history'
              ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
              : "bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 border border-transparent"
          )}
        >
          <TrendingUp className="h-4 w-4" />
          Mais Pesquisados
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
            activeTab === 'settings'
              ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600"
              : "bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 border border-transparent"
          )}
        >
          <Settings className="h-4 w-4" />
          Configurações
        </button>
      </div>

      {/* Content */}
      <div className={cn(
        "rounded-2xl overflow-hidden",
        "bg-white/60 dark:bg-slate-900/50",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/40 dark:border-white/10",
        "shadow-lg shadow-black/5"
      )}>
        {/* Favoritos */}
        {activeTab === 'favorites' && (
          <div className="p-5">
            {favoritesLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400 mb-1">Nenhum favorito ainda</p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Clique na estrela ao calcular uma dose para salvar nos favoritos
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((fav) => (
                  <FavoriteCard
                    key={fav.id}
                    favorite={fav}
                    onRemove={() => removeFavorite(fav.id)}
                    onNavigate={() => navigate(
                      `/platform/calculator/${fav.categorySlug}/${fav.medicationId}?weight=${fav.weight}&age=${fav.ageMonths}&fromFavorite=true`
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Histórico / Mais Pesquisados */}
        {activeTab === 'history' && (
          <div className="p-5">
            {historyLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : mostSearched.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400 mb-1">Nenhuma pesquisa ainda</p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Seus medicamentos mais pesquisados aparecerão aqui
                </p>
              </div>
            ) : (
              <>
                {/* Ranking dos mais pesquisados */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-violet-500" />
                    Mais Pesquisados
                  </h3>
                  <div className="space-y-2">
                    {mostSearched.map((item, index) => (
                      <SearchHistoryCard
                        key={item.id}
                        item={item}
                        rank={index + 1}
                        onNavigate={() => navigate(`/platform/calculator/${item.categorySlug}`)}
                      />
                    ))}
                  </div>
                </div>

                {/* Pesquisas recentes */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        Pesquisas Recentes
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Limpar
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => navigate(`/platform/calculator/${item.categorySlug}`)}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <Pill className="h-4 w-4 text-slate-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                              {item.medicationName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDate(item.lastSearchedAt)}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Configurações */}
        {activeTab === 'settings' && (
          <div className="p-5">
            <div className="space-y-4">
              <Link
                to="/platform/edit-profile"
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Editar Perfil</p>
                    <p className="text-xs text-slate-400">Alterar nome, CRM, telefone</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                    <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-red-700 dark:text-red-300">Sair da Conta</p>
                    <p className="text-xs text-red-500 dark:text-red-400">Desconectar deste dispositivo</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Card de Favorito
const FavoriteCard: React.FC<{
  favorite: FavoriteItem;
  onRemove: () => void;
  onNavigate: () => void;
}> = ({ favorite, onRemove, onNavigate }) => {
  return (
    <div className={cn(
      "group relative p-4 rounded-xl transition-all duration-200",
      "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
      "border border-amber-200/50 dark:border-amber-800/30",
      "hover:shadow-md hover:shadow-amber-500/10"
    )}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        </div>

        <div className="flex-1 min-w-0" onClick={onNavigate}>
          <h4 className="font-semibold text-slate-800 dark:text-white cursor-pointer hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            {favorite.medicationName}
          </h4>
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">
            {favorite.doseResult}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{favorite.weight} kg</span>
            <span>•</span>
            <span>{favorite.ageMonths} meses</span>
            <span>•</span>
            <span>{format(new Date(favorite.createdAt), "dd/MM/yyyy", { locale: ptBR })}</span>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100"
          title="Remover dos favoritos"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Componente de Card de Histórico
const SearchHistoryCard: React.FC<{
  item: SearchHistoryItem;
  rank: number;
  onNavigate: () => void;
}> = ({ item, rank, onNavigate }) => {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700';
    if (rank === 2) return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600';
    if (rank === 3) return 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700';
    return 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700';
  };

  return (
    <div
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
        "bg-white/80 dark:bg-slate-800/80",
        "hover:bg-violet-50 dark:hover:bg-violet-900/20",
        "border border-slate-200/50 dark:border-slate-700/50",
        "hover:border-violet-200 dark:hover:border-violet-800"
      )}
    >
      {/* Rank Badge */}
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border",
        getRankStyle(rank)
      )}>
        {rank}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-700 dark:text-slate-300 truncate">
          {item.medicationName}
        </p>
        <p className="text-xs text-slate-400">
          {item.categoryName}
        </p>
      </div>

      {/* Count */}
      <div className="text-right">
        <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
          {item.searchCount}x
        </p>
        <p className="text-xs text-slate-400">pesquisas</p>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400" />
    </div>
  );
};

export default UserProfilePage;
