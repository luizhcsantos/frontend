import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, getUserInfo } = useAuth();

    const userInfo = getUserInfo();

    if (adminOnly) {
        if (!isAuthenticated) {
            return <Navigate to="/login"/>; 
        }
        if (!userInfo || userInfo.type !== 'admin') {
            return <Navigate to="/dashboard" />; 
        }
        
        return children; 
    }

    if (isAuthenticated) {
        return children; 
    } else {
        return <Navigate to="/login" />;
    }

    

}; 

export default ProtectedRoute;