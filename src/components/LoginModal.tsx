import React, { useState } from 'react';
import { X, LogIn, AlertCircle, Shirt, Mail, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'forgot' | 'verify' | 'reset' | 'success'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onLoginSuccess();
        onClose();
        resetForm();
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular envio de código
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('verify');
    }, 2000);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular verificação do código
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === '123456') {
        setCurrentView('reset');
      } else {
        setError('Código inválido. Tente novamente.');
      }
    }, 1500);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // Simular reset da senha
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('success');
    }, 2000);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setResetEmail('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setCurrentView('login');
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const renderLoginForm = () => (
    <>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Acesso de Funcionários</h3>
          <p className="text-gray-600 text-sm">Entre com suas credenciais para acessar o sistema</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Corporativo
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="seu.email@jubs.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Lembrar de mim
            </label>
          </div>
          <button
            type="button"
            onClick={() => setCurrentView('forgot')}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Esqueceu a senha?
          </button>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-3 font-medium">🔐 Credenciais para demonstração:</p>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex justify-between items-center bg-white p-2 rounded-lg">
              <span><strong>Administrador:</strong></span>
              <span className="text-gray-400">admin@jubs.com / admin123</span>
            </div>
            <div className="flex justify-between items-center bg-white p-2 rounded-lg">
              <span><strong>Funcionário:</strong></span>
              <span className="text-gray-400">maria@jubs.com / 123456</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium shadow-lg"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <LogIn size={20} />
              <span>Entrar no Sistema</span>
            </>
          )}
        </button>
      </form>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      <form onSubmit={handleForgotPassword} className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Recuperar Senha</h3>
          <p className="text-gray-600 text-sm">Digite seu email para receber o código de recuperação</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email Corporativo
          </label>
          <input
            type="email"
            id="resetEmail"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="seu.email@jubs.com"
            required
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-3">
            <Mail className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-medium text-blue-800">Como funciona:</p>
              <p className="text-sm text-blue-700 mt-1">
                Enviaremos um código de 6 dígitos para seu email. Use este código para criar uma nova senha.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Mail size={20} />
                <span>Enviar Código</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );

  const renderVerifyCodeForm = () => (
    <>
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Verificar Código</h3>
          <p className="text-gray-600 text-sm">
            Enviamos um código de 6 dígitos para <strong>{resetEmail}</strong>
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
              Código de Verificação
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Para demonstração:</strong> Use o código <span className="font-mono bg-yellow-200 px-2 py-1 rounded">123456</span>
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setCurrentView('forgot')}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
            <button
              type="submit"
              disabled={isLoading || verificationCode.length !== 6}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <span>Verificar Código</span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setCurrentView('forgot')}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Não recebeu o código? Reenviar
          </button>
        </div>
      </div>
    </>
  );

  const renderResetPasswordForm = () => (
    <>
      <form onSubmit={handleResetPassword} className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nova Senha</h3>
          <p className="text-gray-600 text-sm">Crie uma nova senha para sua conta</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800 font-medium mb-2">Requisitos da senha:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li className={`flex items-center space-x-2 ${newPassword.length >= 6 ? 'text-green-700' : ''}`}>
              <span className={`w-2 h-2 rounded-full ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span>Pelo menos 6 caracteres</span>
            </li>
            <li className={`flex items-center space-x-2 ${newPassword === confirmPassword && newPassword.length > 0 ? 'text-green-700' : ''}`}>
              <span className={`w-2 h-2 rounded-full ${newPassword === confirmPassword && newPassword.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span>Senhas devem coincidir</span>
            </li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading || newPassword.length < 6 || newPassword !== confirmPassword}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <span>Redefinir Senha</span>
          )}
        </button>
      </form>
    </>
  );

  const renderSuccessForm = () => (
    <>
      <div className="p-6 space-y-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Senha Redefinida!</h3>
          <p className="text-gray-600 text-sm">
            Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('login')}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center space-x-2 font-medium"
        >
          <LogIn size={20} />
          <span>Fazer Login</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-red-200 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Shirt size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">JUBS</h2>
              <p className="text-red-100 text-sm">Sistema de Gestão</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentView === 'login' && renderLoginForm()}
        {currentView === 'forgot' && renderForgotPasswordForm()}
        {currentView === 'verify' && renderVerifyCodeForm()}
        {currentView === 'reset' && renderResetPasswordForm()}
        {currentView === 'success' && renderSuccessForm()}
      </div>
    </div>
  );
};

export default LoginModal;