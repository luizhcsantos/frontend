import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import NavigationButton from '../components/NavigationButton';
import api from '../services/api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', {
                username: email,
                password: senha
            });
            if (response.status === 200) {
                const data = response.data; 
    
                localStorage.setItem('token', data.token);
            }
            navigate('/dashboard');
        } catch (error) {
            setErro('Erro ao fazer login. Tente novamente.');
            console.log('Erro: ', error);
        }    
    };

    return (
        <div className='login-container'>
            <NavigationButton />
            <header className='login-header'>
                <h1>Bem-vindo(a) de volta!</h1>
                <p>Entre com suas credenciais para acessar sua conta</p>
            </header>
            <main className='login-main'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu email"
                            required
                        />
                    </label>
                    <label>
                        Senha
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Sua senha"
                            required
                        />
                    </label>

                    {erro && <p className='login-erro'>{erro}</p>}
                    <button type="submit">Entrar</button>
                </form>

                <div className='login-info'>
                    <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se agora</a></p>
                </div>
            </main>
            <footer className='login-footer'>
                <p>&copy; 2023 Doação Asilo. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LoginPage;