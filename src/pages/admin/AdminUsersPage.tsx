import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  BadgeCheck,
  Calendar,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  X,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  crm: string | null;
  phone: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [deleting, setDeleting] = useState(false);

  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Aplicar busca
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,crm.ilike.%${searchTerm}%`);
      }

      // Paginação
      const from = (currentPage - 1) * usersPerPage;
      const to = from + usersPerPage - 1;

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setUsers(data || []);
      setTotalUsers(count || 0);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setDeleting(true);
    try {
      // Deletar perfil (a exclusão do auth.user precisa ser feita via Supabase Admin API ou dashboard)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userToDelete.id);

      if (error) throw error;

      // Atualizar lista
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setTotalUsers(prev => prev - 1);
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário. Tente novamente.');
    } finally {
      setDeleting(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'CRM', 'Telefone', 'Data de Cadastro'];
    const csvData = users.map(u => [
      u.full_name || '',
      u.email || '',
      u.crm || '',
      u.phone || '',
      u.created_at ? format(new Date(u.created_at), 'dd/MM/yyyy HH:mm') : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `usuarios_pedlife_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuários</h1>
          <p className="text-slate-400 mt-1">Gerencie os usuários do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            title="Atualizar"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={cn(
        "p-4 rounded-xl",
        "bg-slate-800/50 border border-slate-700/50"
      )}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou CRM..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 rounded-lg",
                "bg-slate-900/50 border border-slate-700",
                "text-white placeholder:text-slate-500",
                "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              )}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">
              Total: <span className="text-white font-medium">{totalUsers}</span> usuários
            </span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={cn(
        "rounded-xl overflow-hidden",
        "bg-slate-800/50 border border-slate-700/50"
      )}>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Users className="h-12 w-12 text-slate-600 mb-3" />
            <p className="text-slate-400">Nenhum usuário encontrado</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      CRM
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Cadastro
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {user.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {user.full_name || 'Sem nome'}
                            </p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.phone ? (
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Phone className="h-4 w-4 text-slate-500" />
                            {user.phone}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.crm ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 text-sm font-medium">
                            <BadgeCheck className="h-4 w-4" />
                            {user.crm}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.created_at ? (
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            {format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setUserToDelete(user);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-700/50">
              {users.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {user.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {user.full_name || 'Sem nome'}
                      </p>
                      <p className="text-sm text-slate-400 truncate">{user.email}</p>
                      {user.crm && (
                        <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 text-xs font-medium">
                          <BadgeCheck className="h-3 w-3" />
                          CRM: {user.crm}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setUserToDelete(user);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  currentPage === 1
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  currentPage === totalPages
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={cn(
            "w-full max-w-md",
            "bg-slate-800 border border-slate-700",
            "rounded-2xl shadow-2xl"
          )}>
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Detalhes do Usuário</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.full_name?.charAt(0)?.toUpperCase() || selectedUser.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    {selectedUser.full_name || 'Sem nome'}
                  </h4>
                  {selectedUser.crm && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 text-xs font-medium">
                      <BadgeCheck className="h-3 w-3" />
                      CRM: {selectedUser.crm}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <span>{selectedUser.email || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="h-5 w-5 text-slate-500" />
                  <span>{selectedUser.phone || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <span>
                    Cadastrado em {selectedUser.created_at
                      ? format(new Date(selectedUser.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
                      : '-'
                    }
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  ID: {selectedUser.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={cn(
            "w-full max-w-sm",
            "bg-slate-800 border border-slate-700",
            "rounded-2xl shadow-2xl p-6"
          )}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Excluir Usuário</h3>
              <p className="text-slate-400 text-sm mb-6">
                Tem certeza que deseja excluir <span className="text-white font-medium">{userToDelete.full_name || userToDelete.email}</span>?
                Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors disabled:opacity-50"
                >
                  {deleting ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
