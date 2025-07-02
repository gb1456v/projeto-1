import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import ERPLayout from './components/ERP/ERPLayout';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(!isAuthenticated);

  // Efeito para abrir o modal de login se o usuário deslogar
  React.useEffect(() => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
    }
  }, [isAuthenticated]);
  
  // Função para lidar com o sucesso do login
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  // Se o usuário estiver autenticado, mostra o ERP, senão, mostra o modal de login
  if (isAuthenticated && user) {
    return <ERPLayout user={user} onLogout={() => {}} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)} // Opcional: permitir fechar o modal
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;