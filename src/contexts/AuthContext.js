import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Definição do estado (corrige 'isAuthenticated' e 'token' not defined)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };

    // 2. Função 'getUserInfo' 
    const getUserInfo = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const parts = token.split('-'); 
            return {
                type: parts[1], // 'doador' ou 'admin'
                id: parts[2]    // '1', '2', etc.
            };
        } catch (e) {
            console.error("Erro ao decodificar token:", e);
            return null;
        }
    };

    return (
        // 3. 'value' com todas as propriedades corretas
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);