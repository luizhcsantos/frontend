import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationButton.css';

const NavigationButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            className="home-button"
            onClick={() => navigate('/')}
        >
            Voltar para Página Inicial
        </button>
    );
};

export default NavigationButton;