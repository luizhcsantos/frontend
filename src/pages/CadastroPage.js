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
    const [errorMessage, setErrorMessage] = useState('');

    const tipoDoador = tipoUsuario === 'Pessoa Física' ? 'PF' : 'PJ';
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        // 1. Determinar o endpoint correto baseado no estado 'tipoDoador'
        let endpoint = '';
        if (tipoDoador === 'PF') {
            endpoint = 'http://localhost:8080/api/doador/pf';
        } else if (tipoDoador === 'PJ') {
            endpoint = 'http://localhost:8080/api/doador/pj';
        } else {
            setErrorMessage('Erro: Tipo de doador não selecionado.');
            return;
        }

        // 2. Montar o objeto 'data', mas ajustando os nomes para o DTO do backend
       const data = {};

        if (tipoDoador === 'PF') {
            // Mapeia para os campos exatos do PessoaFisicaDTO
            data.pessoaFisicaDtoEmail = event.target.email.value;
            data.pessoaFisicaDtoSenha = event.target.senha.value;
            data.pessoaFisicaDtoTelefone = event.target.telefone.value;
            data.pessoaFisicaDtoNome = event.target.nomeCompleto.value;
            data.pessoaFisicaDtoCpf = event.target.cpf.value;
            // data.dataNascimento = event.target.dataNascimento.value; (Seu DTO não parece ter data de nascimento)
        } else {
            // Mapeia para os campos exatos do PessoaJuridicaDTO
            data.pessoaJuridicaDtoEmail = event.target.email.value;
            data.pessoaJuridicaDtoSenha = event.target.senha.value;
            data.pessoaJuridicaDtoTelefone = event.target.telefone.value;
            data.pessoaJuridicaDtoNomeFantasia = event.target.razaoSocial.value;
            data.pessoaJuridicaDtoCnpj = event.target.cnpj.value;
            // data.inscricaoEstadual = event.target.inscricaoEstadual.value; (Seu DTO não parece ter IE)
        }

        console.log('Enviando requisição para:', endpoint, data);

        try {
            // 3. Usar o endpoint correto na requisição
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json(); // Renomeado para 'responseData'

            if (!response.ok) {
                // Captura a mensagem de erro do backend (ex: "E-mail já existe")
                throw new Error(responseData.error || 'Falha no cadastro');
            }

            console.log('Cadastro bem-sucedido:', responseData);
            alert('Cadastro realizado com sucesso!');
            navigate('/login'); // Redireciona para o login

        } catch (error) {
            console.error('Erro no cadastro:', error);
            // Mantenha seu log original para debug
            console.error('Erro completo:', error); 
            setErrorMessage(error.message);
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
                                    name="nomeCompleto"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        {tipoUsuario === 'Pessoa Física' && (
                            <div>
                                <label>
                                    Data de Nascimento
                                    <input
                                        type="date"
                                        name="dataNascimento"
                                        required
                                    />
                                </label>
                            </div>
                        )}
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
                                <input
                                    type="text"
                                    name={tipoUsuario === 'Pessoa Física' ? 'cpf' : 'cnpj'}
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
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Telefone
                                <input
                                    type="text"
                                    name="telefone"
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
                                    name="email"
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
                                    name="senha"
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