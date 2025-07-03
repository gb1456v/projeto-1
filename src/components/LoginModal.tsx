// src/components/LoginModal.tsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const mockUser = {
    admin: { email: 'admin@example.com' },
    manager: { email: 'manager@example.com' },
    member: { email: 'member@example.com' }
  };

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (await success) {
      setError('');
      onLoginSuccess();
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  const handleDemoLogin = async (userType: 'admin' | 'manager' | 'member') => {
    const success = await login(mockUser[userType].email, '1234');
    if (success) {
      setError('');
      onLoginSuccess();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Bem-vindo de volta!</h2>
      <p className="text-center text-gray-500 mb-6">Acesse o sistema de gestão.</p>

      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full"
          >
            Entrar
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <div className="border-t border-gray-200 my-4"></div>
        <p className="text-gray-500 text-sm mb-4">Ou entre rapidamente com um usuário de demonstração:</p>
        
        {/* ÁREA DE CREDENCIAIS COM FUNDO BRANCO */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Credenciais para Demonstração</h3>
            <div className="flex justify-center space-x-2">
                <button onClick={() => handleDemoLogin('admin')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Admin</button>
                <button onClick={() => handleDemoLogin('manager')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Gerente</button>
                <button onClick={() => handleDemoLogin('member')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Membro</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;