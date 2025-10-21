import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Importação das Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import DoadorDashboardPage from './pages/DoadorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // O AuthProvider envolve toda a aplicação, disponibilizando o contexto de autenticação
    <AuthProvider>
      {/* O BrowserRouter gerencia o histórico de navegação */}
      <BrowserRouter>
        {/* O Routes é onde definimos cada rota individualmente */}
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />

          {/* --- Rotas Protegidas --- */}
          {/* Dashboard geral protegido */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['DOADOR', 'ADMIN']}>
                <DoadorDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota para o painel do doador */}
          <Route 
            path="/dashboard/doador" 
            element={
              <ProtectedRoute allowedRoles={['DOADOR']}>
                <DoadorDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota para o painel do administrador */}
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Rota para "Página não encontrada" */}
          <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;