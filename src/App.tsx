//import React, { useState, useEffect } from 'react';
import  { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import { authService } from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o usuário já está autenticado ao carregar a aplicação
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem-vindo ao Notas App!</h1>
        <p>Usuário logado: {authService.getUser()?.email}</p>
        <button onClick={handleLogout}>Sair</button>
      </header>
      {/* Aqui você pode adicionar o resto da sua aplicação */}
    </div>
  );
}

export default App;