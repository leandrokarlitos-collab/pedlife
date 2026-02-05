import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Users,
  TrendingUp,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  Pill,
  BadgeCheck,
  RefreshCw,
  Search,
  Heart,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

interface DashboardStats {
  totalUsers: number;
  newUsersThisMonth: number;
  newUsersLastMonth: number;
  usersWithCRM: number;
  totalSearches: number;
  totalFavorites: number;
  uniqueMedicationsSearched: number;
  uniqueMedicationsFavorited: number;
}

interface RecentUser {
  id: string;
  email: string | null;
  full_name: string | null;
  crm: string | null;
  created_at: string | null;
}

interface MedicationStat {
  medication_id: string;
  medication_name: string;
  category_slug: string;
  category_name?: string;
  total_searches?: number;
  total_favorites?: number;
  unique_users?: number;
}

interface DailyUserData {
  date: string;
  usuarios: number;
  displayDate: string;
}

interface MonthlyUserData {
  month: string;
  usuarios: number;
}

interface UserTypeData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    newUsersThisMonth: 0,
    newUsersLastMonth: 0,
    usersWithCRM: 0,
    totalSearches: 0,
    totalFavorites: 0,
    uniqueMedicationsSearched: 0,
    uniqueMedicationsFavorited: 0
  });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [dailyData, setDailyData] = useState<DailyUserData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyUserData[]>([]);
  const [userTypeData, setUserTypeData] = useState<UserTypeData[]>([]);
  const [topSearchedMedications, setTopSearchedMedications] = useState<MedicationStat[]>([]);
  const [topFavoritedMedications, setTopFavoritedMedications] = useState<MedicationStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tablesExist, setTablesExist] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      // Buscar todos os perfis
      const { data: allProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const profiles = allProfiles || [];

      // Calcular estatísticas de usuários
      const now = new Date();
      const startOfCurrentMonth = startOfMonth(now);
      const startOfLastMonth = startOfMonth(subMonths(now, 1));
      const endOfLastMonth = endOfMonth(subMonths(now, 1));

      const newUsersThisMonth = profiles.filter(p =>
        p.created_at && new Date(p.created_at) >= startOfCurrentMonth
      ).length;

      const newUsersLastMonth = profiles.filter(p =>
        p.created_at &&
        new Date(p.created_at) >= startOfLastMonth &&
        new Date(p.created_at) <= endOfLastMonth
      ).length;

      const usersWithCRM = profiles.filter(p => p.crm && p.crm.trim() !== '').length;

      // Buscar dados de pesquisas
      let totalSearches = 0;
      let uniqueMedicationsSearched = 0;
      let searchedMedications: MedicationStat[] = [];

      try {
        const { data: searchData, error: searchError } = await supabase
          .from('search_history')
          .select('*');

        if (!searchError && searchData) {
          totalSearches = searchData.reduce((acc, item) => acc + (item.search_count || 1), 0);

          // Agrupar por medicamento
          const medicationMap = new Map<string, MedicationStat>();
          searchData.forEach((item: any) => {
            const key = item.medication_id;
            if (medicationMap.has(key)) {
              const existing = medicationMap.get(key)!;
              existing.total_searches = (existing.total_searches || 0) + (item.search_count || 1);
              existing.unique_users = (existing.unique_users || 0) + 1;
            } else {
              medicationMap.set(key, {
                medication_id: item.medication_id,
                medication_name: item.medication_name,
                category_slug: item.category_slug,
                category_name: item.category_name,
                total_searches: item.search_count || 1,
                unique_users: 1
              });
            }
          });

          searchedMedications = Array.from(medicationMap.values())
            .sort((a, b) => (b.total_searches || 0) - (a.total_searches || 0))
            .slice(0, 10);

          uniqueMedicationsSearched = medicationMap.size;
        }
      } catch (error) {
        console.log('Tabela search_history não disponível');
        setTablesExist(false);
      }

      // Buscar dados de favoritos
      let totalFavorites = 0;
      let uniqueMedicationsFavorited = 0;
      let favoritedMedications: MedicationStat[] = [];

      try {
        const { data: favoritesData, error: favoritesError } = await supabase
          .from('favorites')
          .select('*');

        if (!favoritesError && favoritesData) {
          totalFavorites = favoritesData.length;

          // Agrupar por medicamento
          const medicationMap = new Map<string, MedicationStat>();
          favoritesData.forEach((item: any) => {
            const key = item.medication_id;
            if (medicationMap.has(key)) {
              const existing = medicationMap.get(key)!;
              existing.total_favorites = (existing.total_favorites || 0) + 1;
              existing.unique_users = (existing.unique_users || 0) + 1;
            } else {
              medicationMap.set(key, {
                medication_id: item.medication_id,
                medication_name: item.medication_name,
                category_slug: item.category_slug,
                total_favorites: 1,
                unique_users: 1
              });
            }
          });

          favoritedMedications = Array.from(medicationMap.values())
            .sort((a, b) => (b.total_favorites || 0) - (a.total_favorites || 0))
            .slice(0, 10);

          uniqueMedicationsFavorited = medicationMap.size;
        }
      } catch (error) {
        console.log('Tabela favorites não disponível');
        setTablesExist(false);
      }

      setStats({
        totalUsers: profiles.length,
        newUsersThisMonth,
        newUsersLastMonth,
        usersWithCRM,
        totalSearches,
        totalFavorites,
        uniqueMedicationsSearched,
        uniqueMedicationsFavorited
      });

      setTopSearchedMedications(searchedMedications);
      setTopFavoritedMedications(favoritedMedications);

      // Usuários recentes (últimos 5)
      setRecentUsers(profiles.slice(0, 5));

      // Dados diários (últimos 30 dias)
      const last30Days = eachDayOfInterval({
        start: subDays(now, 29),
        end: now
      });

      const dailyStats: DailyUserData[] = last30Days.map(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        const count = profiles.filter(p => {
          if (!p.created_at) return false;
          return format(new Date(p.created_at), 'yyyy-MM-dd') === dayStr;
        }).length;

        return {
          date: dayStr,
          usuarios: count,
          displayDate: format(day, 'dd/MM', { locale: ptBR })
        };
      });

      setDailyData(dailyStats);

      // Dados mensais (últimos 6 meses)
      const monthlyStats: MonthlyUserData[] = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = subMonths(now, i);
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthDate);

        const count = profiles.filter(p => {
          if (!p.created_at) return false;
          const date = new Date(p.created_at);
          return date >= monthStart && date <= monthEnd;
        }).length;

        monthlyStats.push({
          month: format(monthDate, 'MMM', { locale: ptBR }),
          usuarios: count
        });
      }

      setMonthlyData(monthlyStats);

      // Dados de tipo de usuário (com CRM vs sem CRM)
      setUserTypeData([
        { name: 'Com CRM', value: usersWithCRM, color: '#10b981' },
        { name: 'Sem CRM', value: profiles.length - usersWithCRM, color: '#6366f1' }
      ]);

    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const calculateGrowth = () => {
    if (stats.newUsersLastMonth === 0) {
      return stats.newUsersThisMonth > 0 ? 100 : 0;
    }
    return Math.round(((stats.newUsersThisMonth - stats.newUsersLastMonth) / stats.newUsersLastMonth) * 100);
  };

  const growth = calculateGrowth();

  const StatCard: React.FC<{
    title: string;
    value: number | string;
    icon: React.ReactNode;
    trend?: { value: number; positive: boolean };
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon, trend, color, subtitle }) => (
    <div className={cn(
      "p-6 rounded-2xl",
      "bg-slate-800/50 border border-slate-700/50",
      "hover:border-slate-600/50 transition-all duration-300",
      "hover:shadow-lg hover:shadow-black/20"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm",
              trend.positive ? "text-green-400" : "text-red-400"
            )}>
              {trend.positive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{trend.value > 0 ? '+' : ''}{trend.value}% vs mês anterior</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", color)}>
          {icon}
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-400 text-xs mb-1">{label}</p>
          <p className="text-white font-semibold">
            {payload[0].value} {payload[0].value === 1 ? 'usuário' : 'usuários'}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Visão geral do sistema PedLife</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={refreshing}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-slate-700 hover:bg-slate-600 text-white transition-colors",
            "disabled:opacity-50"
          )}
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          Atualizar
        </button>
      </div>

      {/* Aviso se as tabelas não existem */}
      {!tablesExist && (
        <div className={cn(
          "p-4 rounded-xl",
          "bg-amber-500/10 border border-amber-500/30",
          "flex items-start gap-3"
        )}>
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-400 font-medium">Tabelas de dados não encontradas</p>
            <p className="text-amber-400/70 text-sm mt-1">
              Para visualizar estatísticas de medicamentos pesquisados e favoritos, execute o script SQL disponível em:
              <code className="ml-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs">
                src/scripts/create-tables.sql
              </code>
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid - 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total de Usuários"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6 text-blue-400" />}
          color="bg-blue-500/20"
          subtitle="Cadastrados na plataforma"
        />
        <StatCard
          title="Novos este Mês"
          value={stats.newUsersThisMonth}
          icon={<TrendingUp className="h-6 w-6 text-green-400" />}
          trend={{ value: growth, positive: growth >= 0 }}
          color="bg-green-500/20"
        />
        <StatCard
          title="Profissionais (CRM)"
          value={stats.usersWithCRM}
          icon={<BadgeCheck className="h-6 w-6 text-violet-400" />}
          color="bg-violet-500/20"
          subtitle={`${stats.totalUsers > 0 ? Math.round((stats.usersWithCRM / stats.totalUsers) * 100) : 0}% do total`}
        />
        <StatCard
          title="Total de Pesquisas"
          value={stats.totalSearches}
          icon={<Search className="h-6 w-6 text-cyan-400" />}
          color="bg-cyan-500/20"
          subtitle={`${stats.uniqueMedicationsSearched} medicamentos diferentes`}
        />
        <StatCard
          title="Total de Favoritos"
          value={stats.totalFavorites}
          icon={<Heart className="h-6 w-6 text-pink-400" />}
          color="bg-pink-500/20"
          subtitle={`${stats.uniqueMedicationsFavorited} medicamentos diferentes`}
        />
        <StatCard
          title="Mês Anterior"
          value={stats.newUsersLastMonth}
          icon={<Calendar className="h-6 w-6 text-amber-400" />}
          color="bg-amber-500/20"
          subtitle="Novos cadastros"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Daily Users */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-400" />
            Novos Usuários (Últimos 30 dias)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="displayDate"
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsuarios)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Monthly Users */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Cadastros por Mês
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="usuarios"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Medications Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Searched Medications */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-cyan-400" />
            Medicamentos Mais Pesquisados
          </h2>

          {topSearchedMedications.length === 0 ? (
            <div className="text-center py-8">
              <Pill className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Nenhuma pesquisa registrada ainda</p>
              <p className="text-slate-500 text-sm mt-1">
                Os dados aparecerão quando os usuários pesquisarem medicamentos
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topSearchedMedications.map((med, index) => (
                <div
                  key={med.medication_id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                    index === 0 ? "bg-amber-500/20 text-amber-400" :
                    index === 1 ? "bg-slate-500/20 text-slate-300" :
                    index === 2 ? "bg-orange-500/20 text-orange-400" :
                    "bg-slate-700/50 text-slate-400"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {med.medication_name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {med.category_name || med.category_slug}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-cyan-400">
                      {med.total_searches}
                    </p>
                    <p className="text-xs text-slate-500">pesquisas</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Favorited Medications */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-400" />
            Medicamentos Mais Favoritados
          </h2>

          {topFavoritedMedications.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Nenhum favorito registrado ainda</p>
              <p className="text-slate-500 text-sm mt-1">
                Os dados aparecerão quando os usuários favoritarem medicamentos
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topFavoritedMedications.map((med, index) => (
                <div
                  key={med.medication_id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                    index === 0 ? "bg-amber-500/20 text-amber-400" :
                    index === 1 ? "bg-slate-500/20 text-slate-300" :
                    index === 2 ? "bg-orange-500/20 text-orange-400" :
                    "bg-slate-700/50 text-slate-400"
                  )}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {med.medication_name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {med.category_slug}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-pink-400">
                      {med.total_favorites}
                    </p>
                    <p className="text-xs text-slate-500">favoritos</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart - User Types */}
        <div className={cn(
          "p-6 rounded-2xl",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-400" />
            Tipos de Usuários
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend
                  formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {userTypeData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-400">{item.name}:</span>
                <span className="text-sm text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className={cn(
          "p-6 rounded-2xl lg:col-span-2",
          "bg-slate-800/50 border border-slate-700/50"
        )}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Últimos Cadastros
            </h2>
            <a
              href="/admin/users"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Ver todos →
            </a>
          </div>

          {recentUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Nenhum usuário cadastrado ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {user.full_name || 'Sem nome'}
                    </p>
                    <p className="text-sm text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="text-right">
                    {user.crm && (
                      <span className="inline-block px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-medium mb-1">
                        CRM: {user.crm}
                      </span>
                    )}
                    <p className="text-xs text-slate-500">
                      {user.created_at
                        ? format(new Date(user.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
                        : '-'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Info */}
      <div className={cn(
        "p-6 rounded-2xl",
        "bg-slate-800/50 border border-slate-700/50"
      )}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-white">Informações do Sistema</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50">
            <p className="text-slate-400 text-sm">Versão</p>
            <p className="text-white font-medium">1.0.0</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50">
            <p className="text-slate-400 text-sm">Ambiente</p>
            <p className="text-white font-medium">Produção</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50">
            <p className="text-slate-400 text-sm">Última Atualização</p>
            <p className="text-white font-medium">{format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50">
            <p className="text-slate-400 text-sm">Status</p>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Online</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
