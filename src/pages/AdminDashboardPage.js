import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import NavigationButton from '../components/NavigationButton';


function AdminDashboardPage() {
    const { logout } = useAuth();
    const [doadores, setDoadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoadores = async () => {
            try {
                // Chama o novo endpoint GET /api/admin/doadores
                const response = await api.get('/admin/doadores');
                setDoadores(response.data);
            } catch (err) {
                setError('Falha ao carregar lista de doadores.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoadores();
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Painel do Administrador</h1>
                <NavigationButton to="/" onClick={logout}>
                    Sair
                </NavigationButton>
            </header>
            
            <section className="dashboard-content">
                <h2>Lista de Doadores Cadastrados</h2>
                {loading && <div>Carregando doadores...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                
                {!loading && !error && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doadores.map(doador => (
                                <tr key={doador.doadorId}>
                                    <td>{doador.doadorId}</td>
                                    {/* Exibe o nome de PF ou PJ */}
                                    <td>{doador.pessoaFisicaNome || doador.pessoaJuridicaNome}</td>
                                    <td>{doador.doadorEmail}</td>
                                    <td>{doador.doadorTelefone}</td>
                                    <td>{doador.doadorTipo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default AdminDashboardPage;