import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CadastroPage.css';
import NavigationButton from '../components/NavigationButton';

function CadastroPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('Pessoa Física');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setIsLoading(true);

        // Validação básica
        const validations = [
            { condition: !email, message: 'Email é obrigatório' },
            { condition: !senha, message: 'Senha é obrigatória' },
            { condition: senha !== confirmarSenha, message: 'As senhas não conferem' },
            { condition: !telefone, message: 'Telefone é obrigatório' },
            { condition: !nome, message: 'Nome/Razão Social é obrigatório' },
            { condition: tipoUsuario === 'Pessoa Física' && !cpf, message: 'CPF é obrigatório' },
            { condition: tipoUsuario === 'Pessoa Jurídica' && !cnpj, message: 'CNPJ é obrigatório' }
        ];

        const error = validations.find(v => v.condition);
        if (error) {
            setErro(error.message);
            setIsLoading(false);
            return;
        }

        try {
            const requestBody = {
                email: email.trim(),
                senha: senha,
                telefone: telefone.replace(/\D/g, ''),
                tipo: tipoUsuario === 'Pessoa Física' ? 'PF' : 'PJ',
                nomeCompleto: tipoUsuario === 'Pessoa Física' ? nome.trim() : null,
                cpf: tipoUsuario === 'Pessoa Física' ? cpf.replace(/\D/g, '') : null,
                razaoSocial: tipoUsuario === 'Pessoa Jurídica' ? nome.trim() : null,
                nomeFantasia: tipoUsuario === 'Pessoa Jurídica' ? nomeFantasia.trim() : null,
                cnpj: tipoUsuario === 'Pessoa Jurídica' ? cnpj.replace(/\D/g, '') : null
            };
            console.log('Enviando requisição:', requestBody);

            console.log('Enviando requisição:', requestBody);

            const response = await fetch('http://localhost:8080/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            // Add detailed error logging
            const responseText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers));
            console.log('Response body:', responseText);

            if (!response.ok) {
                let errorMessage;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || 'Erro desconhecido';
                } catch {
                    errorMessage = responseText || `HTTP error! status: ${response.status}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            navigate('/login');

        } catch (error) {
            console.error('Erro completo:', error);
            setErro(`Erro ao cadastrar: ${error.message}`);
        } finally {
            setIsLoading(false);
        }

        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nome':
                setNome(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'senha':
                setSenha(value);
                break;
            case 'confirmarSenha':
                setConfirmarSenha(value);
                break;
            default:
                break;
        }
    };

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .slice(0, 14);
    };

    const maskCNPJ = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 18);
    };

    const maskTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    };

    return (
        <div className='cadastro-container'>
            <NavigationButton />
            <header className='cadastro-header'>
                <h1>Criar nova conta</h1>
                <p>Preencha os dados abaixo para se cadastrar</p>
            </header>
            <main className='cadastro-main'>
                <form className='cadastro-form' onSubmit={handleSubmit}>
                    <div className='tipo-usuario-select'>
                        <label>
                            Tipo de Usuário
                            <select
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            >
                                <option value="Pessoa Física">Pessoa Física</option>
                                <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                            </select>
                        </label>
                    </div>

                    <div className='form-group'>
                        <div>
                            <label>
                                {tipoUsuario === 'Pessoa Física' ? 'Nome Completo' : 'Razão Social'}
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        {tipoUsuario === 'Pessoa Jurídica' && (
                            <div>
                                <label>
                                    Nome Fantasia
                                    <input
                                        type="text"
                                        value={nomeFantasia}
                                        onChange={(e) => setNomeFantasia(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div className='form-group'>
                        <div>
                            <label>
                                {tipoUsuario === 'Pessoa Física' ? 'CPF' : 'CNPJ'}
                                <input
                                    type="text"
                                    value={tipoUsuario === 'Pessoa Física' ? cpf : cnpj}
                                    onChange={(e) => {
                                        if (tipoUsuario === 'Pessoa Física') {
                                            setCpf(maskCPF(e.target.value));
                                        } else {
                                            setCnpj(maskCNPJ(e.target.value));
                                        }
                                    }}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Telefone
                                <input
                                    type="text"
                                    value={telefone}
                                    onChange={(e) => setTelefone(maskTelefone(e.target.value))}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    <div className='form-group'>
                        <div>
                            <label>
                                Email
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    <div className='form-group'>
                        <div>
                            <label>
                                Senha
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Confirmar Senha
                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    {erro && <p className='cadastro-erro'>{erro}</p>}
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </main>
            <footer className='cadastro-footer'>
                <p>Já tem uma conta? <a href="/login">Faça login</a></p>
                <p>&copy; 2023 Doação Asilo. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default CadastroPage;