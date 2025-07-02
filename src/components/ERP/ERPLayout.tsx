import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  CheckSquare, 
  Users, 
  DollarSign, 
  BarChart3, 
  Calendar, 
  Settings, 
  Bell,
  Search,
  Menu,
  X,
  FileText,
  Package,
  LogOut,
  User,
  Edit,
  ChevronDown
} from 'lucide-react';
import ProjectsView from './Projects/ProjectsView';
import TasksView from './Tasks/TasksView';
import TeamsView from './Teams/TeamsView';
import ProfileEditModal from './Profile/ProfileEditModal';

interface ERPLayoutProps {
  user: any;
  onLogout: () => void;
}

const ERPLayout: React.FC<ERPLayoutProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Auto logout when user closes/refreshes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      onLogout();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs or minimized)
        onLogout();
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onLogout]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { id: 'projects', label: 'Projetos', icon: FolderOpen, color: 'text-green-600' },
    { id: 'tasks', label: 'Tarefas', icon: CheckSquare, color: 'text-purple-600' },
    { id: 'team', label: 'Equipes', icon: Users, color: 'text-orange-600' },
    { id: 'clients', label: 'Clientes', icon: Users, color: 'text-pink-600' },
    { id: 'invoices', label: 'Faturas', icon: FileText, color: 'text-emerald-600' },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, color: 'text-red-600' },
    { id: 'calendar', label: 'Calendário', icon: Calendar, color: 'text-yellow-600' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'team':
        return <TeamsView />;
      default:
        return <ProjectsView />;
    }
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    onLogout();
  };

  const handleEditProfile = () => {
    setUserDropdownOpen(false);
    setProfileModalOpen(true);
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">JUBS ERP</h1>
              <p className="text-xs text-gray-500">Sistema de Gestão</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} className={activeView === item.id ? 'text-blue-600' : item.color} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile in Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <Menu size={24} />
            </button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar em tudo..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* User Dropdown */}
            <div className="relative user-dropdown">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{getRoleLabel(user?.role)}</p>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-200">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                        alt={user?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                            {getRoleLabel(user?.role)}
                          </span>
                          <span className="text-xs text-gray-500">{user?.department}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Options */}
                  <div className="py-2">
                    <button
                      onClick={handleEditProfile}
                      className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Edit size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Editar Perfil</p>
                        <p className="text-xs text-gray-500">Alterar foto, nome e dados pessoais</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Settings size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Configurações</p>
                        <p className="text-xs text-gray-500">Preferências do sistema</p>
                      </div>
                    </button>
                  </div>
                  
                  {/* Logout Section */}
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <LogOut size={16} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sair do Sistema</p>
                        <p className="text-xs text-red-500">Desconectar da conta</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default ERPLayout;