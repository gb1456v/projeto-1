// src/App.tsx

import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import ERPLayout from './components/ERP/ERPLayout'; // O seu ERPLayout avançado

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const isLoginVisible = !isAuthenticated;

  // --- O NOSSO DEPURADOR ---
  // Esta linha vai mostrar o estado da autenticação no console do navegador
  console.log('App renderizado. Autenticado:', isAuthenticated, 'Utilizador:', user);
  // -------------------------

  if (isAuthenticated && user) {
    // Se estiver autenticado, usa o seu componente ERPLayout
    return <ERPLayout user={user} onLogout={logout} />;
  }

  // Página de Login
  return (
    <div className="min-h-screen bg-red-700 flex items-center justify-center p-4">
      <div className="w-[80%] max-w-md">
        <LoginModal
          isOpen={isLoginVisible}
          onClose={() => {}}
          onLoginSuccess={() => {}} // Esta prop não é mais essencial, a magia vem do contexto
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