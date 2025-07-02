import React, { useState } from 'react';
import { LogIn, User, LogOut, Package, Home, Bell, Settings, Palette, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setIsProfileOpen(false);
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Comercial':
        return <DollarSign size={16} />;
      case 'Design':
        return <Palette size={16} />;
      case 'Produção':
        return <Package size={16} />;
      case 'Administração':
        return <Settings size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Comercial':
        return 'text-green-600 bg-green-100';
      case 'Design':
        return 'text-purple-600 bg-purple-100';
      case 'Produção':
        return 'text-blue-600 bg-blue-100';
      case 'Administração':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Package size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">JUBS</h1>
                <span className="text-xs opacity-90">ESTÚDIO TÊXTIL</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Home size={18} />
              <span>Início</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              <Package size={18} />
              <span>Produtos</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              <span>Sobre</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              <span>Contato</span>
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                  >
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></span>
                  </button>
                  
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Notificações</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">Novo projeto criado</p>
                              <p className="text-xs text-gray-600 mt-1">Projeto "Uniformes ABC" foi adicionado</p>
                              <p className="text-xs text-gray-400 mt-1">2 min atrás</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">Tarefa concluída</p>
                              <p className="text-xs text-gray-600 mt-1">Design das camisetas foi finalizado</p>
                              <p className="text-xs text-gray-400 mt-1">1 hora atrás</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">Prazo próximo</p>
                              <p className="text-xs text-gray-600 mt-1">Projeto vence em 2 dias</p>
                              <p className="text-xs text-gray-400 mt-1">3 horas atrás</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          Ver todas as notificações
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 bg-white bg-opacity-10 px-4 py-2 rounded-xl hover:bg-opacity-20 transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs opacity-75">{user.department}</p>
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getDepartmentColor(user.department)}`}>
                              {getDepartmentIcon(user.department)}
                              <span>{user.department}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-50 flex items-center space-x-3 transition-colors">
                          <Settings size={18} />
                          <span>Configurações</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                        >
                          <LogOut size={18} />
                          <span>Sair do Sistema</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 bg-white text-red-600 px-6 py-2 rounded-xl hover:bg-red-50 transition-colors font-medium shadow-lg"
                >
                  <LogIn size={20} />
                  <span>Entrar</span>
                </button>
                <button className="bg-white bg-opacity-10 px-6 py-2 rounded-xl hover:bg-opacity-20 transition-colors font-medium">
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;