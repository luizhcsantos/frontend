import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import HistoricoDoacoes from '../components/doador/HistoricoDoacoes'; // Componente que você já tem
import NavigationButton from '../components/NavigationButton'; // Botão que você já tem

function DoadorDashboardPage() {
    const { logout, getUserInfo } = useAuth();
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPerfil = async () => {
            const userInfo = getUserInfo();
            if (!userInfo || userInfo.type !== 'doador') {
                setError('Token inválido ou usuário não é um doador.');
                setLoading(false);
                return;
            }

            try {
                // Chama o novo endpoint GET /api/doador/{id}
                const response = await api.get(`/doador/${userInfo.id}`);
                setPerfil(response.data);
            } catch (err) {
                setError('Falha ao carregar perfil. Tente novamente.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, [getUserInfo]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error} <button onClick={logout}>Fazer Login Novamente</button></div>;
    }

    // Tenta extrair o nome (seja de PF ou PJ)
    const nome = perfil ? (perfil.pessoaFisicaNome || perfil.pessoaJuridicaNome) : 'Doador';

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                {/* Usa o nome vindo do backend */}
                <h1>Bem-vindo, {nome}!</h1>
                <NavigationButton to="/" onClick={logout}>
                    Sair
                </NavigationButton>
            </header>
            
            <section className="dashboard-content">
                <h2>Seu Perfil</h2>
                <p><strong>Email:</strong> {perfil.doadorEmail}</p>
                <p><strong>Telefone:</strong> {perfil.doadorTelefone}</p>
                {/* Adicione outros campos do perfil aqui */}
            </section>

            <section className="dashboard-history">
                {/* Renderiza seu componente estático de histórico */}
                <HistoricoDoacoes />
            </section>
        </div>
    );
}

export default DoadorDashboardPage;