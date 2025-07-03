// src/App.tsx

import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import { ERPLayout } from './components/ERP/ERPLayout';

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const isLoginVisible = !isAuthenticated;

  if (isAuthenticated && user) {
    return <ERPLayout user={user} onLogout={logout} />;
  }

  // Página de Login
  return (
    <div className="min-h-screen bg-red-700 flex items-center justify-center p-4">
      {/* Container que controla a largura da janela de login */}
      <div className="w-[80%] max-w-md">
        <LoginModal
          isOpen={isLoginVisible}
          onClose={() => {}}
          onLoginSuccess={() => {}}
        />
      </div>
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