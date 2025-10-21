import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const AuthContext = createContext(null);

// Cria o Provedor, que vai encapsular a aplicação
export const AuthProvider = ({ children }) => {
    // Estado para guardar os dados do usuário logado
    const [user, setUser] = useState(null);

    // Função de login (em um app real, receberia um token da API)
    const login = (userData) => {
        setUser(userData);
        // Ex: localStorage.setItem('userToken', userData.token);
    };

    // Função de logout
    const logout = () => {
        setUser(null);
        // Ex: localStorage.removeItem('userToken');
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para facilitar o uso do contexto nos componentes
export const useAuth = () => {
    return useContext(AuthContext);
};