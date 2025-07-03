// src/components/ERP/ERPLayout.tsx

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Users, 
  FileText,
  Menu,
  X,
  Package,
  LogOut,
  User as UserIcon,
  Edit,
  ChevronDown,
  Bell,
  Search,
  Shield,
  Briefcase, // 1. Novo ícone para "Clientes e Vendas"
  LucideIcon
} from 'lucide-react';

// Vistas
import TasksView from './Tasks/TasksView';
import TeamsView from './Teams/TeamsView';
import UsersView from './Users/UsersView';
import ClientHubView from './ClientHub/ClientHubView'; // 2. Importamos a nova vista unificada

// Tipos
import { User } from '../../types/erp';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  adminOnly?: boolean;
}

interface ERPLayoutProps {
  user: User;
  onLogout: () => void;
}

const ERPLayout: React.FC<ERPLayoutProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('tasks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // ... (seus useEffects continuam aqui sem alterações) ...
  useEffect(() => { const handleBeforeUnload = () => onLogout(); window.addEventListener('beforeunload', handleBeforeUnload); return () => window.removeEventListener('beforeunload', handleBeforeUnload); }, [onLogout]);
  useEffect(() => { const handleClickOutside = (event: MouseEvent) => { if (!(event.target as Element).closest('.user-dropdown')) setUserDropdownOpen(false); }; document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);


  // 3. ATUALIZAMOS O MENU
  const menuItems: MenuItem[] = [
    { id: 'tasks', label: 'Tarefas', icon: CheckSquare, color: 'text-purple-600' },
    { id: 'team', label: 'Equipes', icon: Users, color: 'text-orange-600' },
    { id: 'client_hub', label: 'Clientes e Vendas', icon: Briefcase, color: 'text-pink-600' }, // Menu Unificado
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'tasks':
        return <TasksView currentUser={user} />;
      case 'team':
        return <TeamsView />;
      // 4. ATUALIZAMOS O CASE PARA A NOVA VISTA
      case 'client_hub':
        return <ClientHubView />;
      default:
        return <TasksView currentUser={user} />;
    }
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    onLogout();
  };
  
  const handleManageUsers = () => {
    setActiveView('users');
    setUserDropdownOpen(false);
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        {/* ... (cabeçalho da sidebar) ... */}
        <div className="flex items-center justify-between h-16 px-6 border-b"><div className="flex items-center space-x-3"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Package className="text-white" size={20} /></div><div><h1 className="text-lg font-bold">JUBS ERP</h1><p className="text-xs text-gray-500">Sistema de Gestão</p></div></div><button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={24} /></button></div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${activeView === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Icon size={20} className={activeView === item.id ? 'text-blue-600' : item.color} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
             {/* Link para Gestão de Usuários agora fica no final do menu, visível apenas para admin */}
             {user.role === 'admin' && (
                <button onClick={handleManageUsers} className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors mt-4 border-t pt-4 ${activeView === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Shield size={20} className={activeView === 'users' ? 'text-blue-600' : 'text-gray-600'} />
                    <span className="font-medium">Gerenciar Usuários</span>
                </button>
             )}
          </div>
        </nav>
        {/* ... (perfil do usuário na sidebar) ... */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t"><div className="flex items-center space-x-3"><img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" /><div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user?.name}</p><p className="text-xs text-gray-500 truncate">{user?.department}</p></div></div></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
            {/* ... (Barra superior) ... */}
            <div className="flex items-center space-x-4"><button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu size={24} /></button></div><div className="flex items-center space-x-4"><button className="relative p-2"><Bell size={20} /><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span></button><div className="relative user-dropdown"><button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"><img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" /><div className="text-left hidden sm:block"><p className="text-sm font-medium">{user?.name}</p><p className="text-xs text-gray-500">{getRoleLabel(user?.role)}</p></div><ChevronDown size={16} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} /></button>{userDropdownOpen && (<div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 border"><div className="p-4 border-b"><div className="flex items-center space-x-3"><img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full" /><div className="flex-1"><p className="font-semibold">{user?.name}</p><p className="text-sm text-gray-600">{user?.email}</p></div></div></div><div className="py-2"><button className="w-full text-left p-4 hover:bg-gray-50 flex items-center space-x-3"><UserIcon size={16} /><span>Meu Perfil</span></button></div><div className="border-t pt-2"><button onClick={handleLogout} className="w-full text-left p-4 text-red-600 hover:bg-red-50 flex items-center space-x-3"><LogOut size={16} /><span>Sair</span></button></div></div>)}</div></div>
        </header>
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {activeView === 'users' ? <UsersView currentUser={user}/> : renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ERPLayout;