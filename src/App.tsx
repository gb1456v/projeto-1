import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginModal from './components/LoginModal';
import ERPLayout from './components/ERP/ERPLayout';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'erp'>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLoginSuccess = () => {
    setCurrentPage('erp'); // Redirect to ERP system after login
  };

  const handleNavigate = (page: string) => {
    // Only allow navigation to ERP if user is logged in
    if (page === 'erp' && !user) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentPage(page as 'home' | 'erp');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // If user is logged in and on ERP page, show ERP layout
  if (user && currentPage === 'erp') {
    return <ERPLayout user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={() => setIsLoginModalOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      
      <HomePage />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
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