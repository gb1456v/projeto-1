import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Crown, 
  Mail, 
  Phone, 
  Calendar, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus, 
  Settings,
  Shield,
  Clock,
  Target,
  Award,
  Activity,
  UserMinus,
  AlertTriangle
} from 'lucide-react';
import { mockUsers, mockTeams } from '../../../data/erpData';
import { User, Team } from '../../../types/erp';
import { useAuth } from '../../../contexts/AuthContext';

const TeamsView: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'teams' | 'members'>('teams');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: 'team' | 'user', id: string } | null>(null);

  // Only admin can manage teams and members
  const isAdmin = currentUser?.role === 'admin';

  // Filter users based on current user's permissions
  const getVisibleUsers = () => {
    if (currentUser?.role === 'admin') {
      return users; // Admin can see all users
    }
    
    // Non-admin users can only see users from their own teams
    const userTeams = teams.filter(team => team.members.includes(currentUser?.id || ''));
    const visibleUserIds = new Set<string>();
    
    userTeams.forEach(team => {
      team.members.forEach(memberId => visibleUserIds.add(memberId));
    });
    
    return users.filter(user => visibleUserIds.has(user.id));
  };

  const filteredUsers = getVisibleUsers().filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const filteredTeams = teams.filter(team => {
    // Users can only see teams they belong to (except admins)
    if (currentUser?.role !== 'admin' && !team.members.includes(currentUser?.id || '')) {
      return false;
    }
    
    return team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           team.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  const getTeamsByUser = (userId: string) => {
    return teams.filter(team => team.members.includes(userId));
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Comercial': return 'bg-green-100 text-green-700';
      case 'Design': return 'bg-purple-100 text-purple-700';
      case 'Produção': return 'bg-blue-100 text-blue-700';
      case 'Administração': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'member': return 'Membro';
      case 'client': return 'Cliente';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'manager': return 'bg-orange-100 text-orange-700';
      case 'member': return 'bg-blue-100 text-blue-700';
      case 'client': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
    setShowDeleteConfirm(null);
    setSelectedTeam(null);
  };

  const handleDeleteUser = (userId: string) => {
    // Remove user from all teams
    const updatedTeams = teams.map(team => ({
      ...team,
      members: team.members.filter(id => id !== userId),
      leaderId: team.leaderId === userId ? team.members.find(id => id !== userId) || '' : team.leaderId
    }));
    
    setTeams(updatedTeams);
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteConfirm(null);
    setSelectedUser(null);
  };

  const handleRemoveFromTeam = (teamId: string, userId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        const newMembers = team.members.filter(id => id !== userId);
        return {
          ...team,
          members: newMembers,
          // If removing the leader, assign a new one
          leaderId: team.leaderId === userId ? (newMembers[0] || '') : team.leaderId
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    setSelectedTeam(updatedTeams.find(t => t.id === teamId) || null);
  };

  const renderTeamsView = () => (
    <div className="space-y-6">
      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => {
          const leader = getUserById(team.leaderId);
          const teamMembers = team.members.map(id => getUserById(id)).filter(Boolean);
          
          return (
            <div key={team.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{team.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{team.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedTeam(team)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Ver detalhes"
                    >
                      <Eye size={16} />
                    </button>
                    {isAdmin && (
                      <>
                        <button className="text-green-600 hover:text-green-700" title="Editar">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm({ type: 'team', id: team.id })}
                          className="text-red-600 hover:text-red-700" 
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Team Leader */}
                {leader && (
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-yellow-50 rounded-lg">
                    <Crown className="text-yellow-600" size={16} />
                    <img
                      src={leader.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                      alt={leader.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{leader.name}</p>
                      <p className="text-xs text-gray-600">Líder da Equipe</p>
                    </div>
                  </div>
                )}

                {/* Team Members */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Membros</span>
                    <span className="text-sm text-gray-500">{teamMembers.length}</span>
                  </div>
                  
                  <div className="flex -space-x-2">
                    {teamMembers.slice(0, 5).map((member, index) => (
                      <img
                        key={index}
                        src={member?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                        alt={member?.name}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        title={member?.name}
                      />
                    ))}
                    {teamMembers.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{teamMembers.length - 5}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{team.projects.length}</p>
                    <p className="text-xs text-gray-500">Projetos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{teamMembers.length}</p>
                    <p className="text-xs text-gray-500">Membros</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMembersView = () => (
    <div className="space-y-6">
      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const userTeams = getTeamsByUser(user.id);
          const isCurrentUser = user.id === currentUser?.id;
          
          return (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        user.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.name}
                        {isCurrentUser && <span className="text-blue-600 text-sm ml-2">(Você)</span>}
                      </h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Ver perfil"
                    >
                      <Eye size={16} />
                    </button>
                    {isAdmin && (
                      <>
                        <button className="text-green-600 hover:text-green-700" title="Editar">
                          <Edit size={16} />
                        </button>
                        {!isCurrentUser && (
                          <button 
                            onClick={() => setShowDeleteConfirm({ type: 'user', id: user.id })}
                            className="text-red-600 hover:text-red-700" 
                            title="Remover usuário"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(user.department)}`}>
                      {user.department}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </div>

                  {/* Teams */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Equipes</p>
                    <div className="flex flex-wrap gap-1">
                      {userTeams.map((team) => (
                        <span key={team.id} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {team.name}
                        </span>
                      ))}
                      {userTeams.length === 0 && (
                        <span className="text-xs text-gray-500">Nenhuma equipe</span>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>Desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {user.hourlyRate && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <Award size={14} />
                        <span>R$ {user.hourlyRate}/hora</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipes</h1>
          <p className="text-gray-600 mt-1">Gerencie equipes e membros da organização</p>
        </div>
        {isAdmin && (
          <div className="flex items-center space-x-3">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-lg">
              <UserPlus size={20} />
              <span>Adicionar Membro</span>
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg">
              <Plus size={20} />
              <span>Nova Equipe</span>
            </button>
          </div>
        )}
      </div>

      {/* Admin Notice */}
      {!isAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Shield className="text-yellow-600" size={20} />
            <p className="text-yellow-800 font-medium">
              Apenas administradores podem gerenciar equipes e membros
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('teams')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'teams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>Equipes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'members'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>Membros</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={activeTab === 'teams' ? "Buscar equipes..." : "Buscar membros..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {activeTab === 'members' && (
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Departamentos</option>
                <option value="Comercial">Comercial</option>
                <option value="Design">Design</option>
                <option value="Produção">Produção</option>
                <option value="Administração">Administração</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'teams' ? renderTeamsView() : renderMembersView()}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmar Exclusão</h3>
                  <p className="text-gray-600 text-sm">Esta ação não pode ser desfeita</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                {showDeleteConfirm.type === 'team' 
                  ? 'Tem certeza que deseja excluir esta equipe? Todos os membros serão removidos.'
                  : 'Tem certeza que deseja remover este usuário? Ele será removido de todas as equipes.'
                }
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (showDeleteConfirm.type === 'team') {
                      handleDeleteTeam(showDeleteConfirm.id);
                    } else {
                      handleDeleteUser(showDeleteConfirm.id);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedTeam.name}</h2>
                <p className="text-gray-600">{selectedTeam.description}</p>
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Team Leader */}
              {(() => {
                const leader = getUserById(selectedTeam.leaderId);
                return leader ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Líder da Equipe</h3>
                    <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                      <Crown className="text-yellow-600" size={24} />
                      <img
                        src={leader.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                        alt={leader.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{leader.name}</p>
                        <p className="text-sm text-gray-600">{leader.email}</p>
                        <p className="text-sm text-gray-600">{leader.department}</p>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => handleRemoveFromTeam(selectedTeam.id, leader.id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remover da equipe"
                        >
                          <UserMinus size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Membros da Equipe</h3>
                  {isAdmin && (
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-2">
                      <UserPlus size={16} />
                      <span>Adicionar Membro</span>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTeam.members.map((memberId) => {
                    const member = getUserById(memberId);
                    const isLeader = memberId === selectedTeam.leaderId;
                    return member ? (
                      <div key={memberId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={member.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{member.name}</p>
                            {isLeader && <Crown className="text-yellow-600" size={14} />}
                          </div>
                          <p className="text-sm text-gray-600">{member.department}</p>
                        </div>
                        {isAdmin && !isLeader && (
                          <button
                            onClick={() => handleRemoveFromTeam(selectedTeam.id, memberId)}
                            className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                            title="Remover da equipe"
                          >
                            <UserMinus size={14} />
                          </button>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Team Stats */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="text-blue-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-blue-700">{selectedTeam.projects.length}</p>
                    <p className="text-sm text-blue-600">Projetos Ativos</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="text-green-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-green-700">{selectedTeam.members.length}</p>
                    <p className="text-sm text-green-600">Membros</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Activity className="text-purple-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-bold text-purple-700">
                      {new Date(selectedTeam.createdAt).getFullYear()}
                    </p>
                    <p className="text-sm text-purple-600">Ano de Criação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(selectedUser.department)}`}>
                      {selectedUser.department}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {getRoleLabel(selectedUser.role)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-700">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700">
                        Desde {new Date(selectedUser.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {selectedUser.hourlyRate && (
                      <div className="flex items-center space-x-3">
                        <Award size={16} className="text-gray-400" />
                        <span className="text-gray-700">R$ {selectedUser.hourlyRate}/hora</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <Activity size={16} className="text-gray-400" />
                      <span className={`text-sm ${selectedUser.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedUser.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipes</h3>
                  <div className="space-y-2">
                    {getTeamsByUser(selectedUser.id).map((team) => (
                      <div key={team.id} className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                        <Users size={16} className="text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">{team.name}</p>
                          <p className="text-xs text-blue-600">
                            {team.leaderId === selectedUser.id ? 'Líder' : 'Membro'}
                          </p>
                        </div>
                        {isAdmin && (
                          <button
                            onClick={() => handleRemoveFromTeam(team.id, selectedUser.id)}
                            className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                            title="Remover da equipe"
                          >
                            <UserMinus size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissões</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((permission, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsView;