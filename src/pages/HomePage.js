import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/HomePage.css';


const realizarDoacaoAnonimaAPI = async (dadosDoacao) => {
    console.log("Enviando dados para a API", dadosDoacao);
    await new Promise(resolve => setTimeout (resolve, 1000));
    return { success: true, id: "12345" };
}

function HomePage() {
    const [valor, setValor] = useState(''); 
    const [metodoPagamento, setMetodoPagamento] = useState('Pix');
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleValorChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setValor(value); 
    }; 

    const handleSubmitDoacao = async (e) => {
        e.preventDefault();
        setErro('');

        const valorNumerico = parseFloat(valor); 

        if (isNaN(valorNumerico) || valorNumerico <= 2) {
            setErro('O valor da doação deve ser maior que R$2,00.');    
            return; 
        } 
        setIsLoading(true);
        try {
            const dados = {
                valor: valorNumerico,
                metodoPagamento, 
                anonima: true // A doação a partir desta páigina é sempre anônima
            }
            const response = await realizarDoacaoAnonimaAPI(dados);
            if (response.success) {
                // Navega para uma página de sucesso ou de pagamento
                // passando o ID da cobrança para exibir o Pix/Boleto
                alert('Doação iniciada! Redirecionando para pagamento...');
                navigate(`/pagamento/${response.id}`);
            }
        } catch (error) {
                setErro('Ocorreu um erro ao processar a doação. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }; 

    return (
        <div className="home-container">
            <header className="homepage-header">
                <h1>Sistema de Doação para o Asilo</h1>
                <p>Sua contribuição ajuda a cuidar de quem mais precisa.</p>
            </header>

            <main className="homepage-main">
                <section className="home-hero">
                    <h1>Bem-vindo ao Portal de Doações</h1>
                    <p>
                        Faça a diferença na vida de quem precisa. 
                        Sua doação pode transformar vidas e trazer esperança para nossos idosos.
                    </p>
                    <div className="home-buttons">
                        <Link to="/cadastro" className="home-button primary-button">
                            Quero Doar
                        </Link>
                        <Link to="/login" className="home-button secondary-button">
                            Área do Doador
                        </Link>
                    </div>
                </section>

                <section className="home-features">
                    <div className="feature-card">
                        <h3>Doação Segura</h3>
                        <p>
                            Realize suas doações com total segurança através de nossa 
                            plataforma certificada e protegida.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3>Transparência</h3>
                        <p>
                            Acompanhe o impacto de suas doações e saiba exatamente 
                            como seus recursos estão sendo utilizados.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3>Faça a Diferença</h3>
                        <p>
                            Suas doações ajudam a manter nossos serviços e garantir 
                            qualidade de vida para nossos idosos.
                        </p>
                    </div>
                </section>

                <div className="doacao-box">
                    <h2>Faça uma Doação Rápida</h2>
                    <p>Não é preciso se cadastrar para fazer uma doação única.</p>
                    <form onSubmit={handleSubmitDoacao}>
                        <div className="input-group">
                            <label htmlFor="valor">Valor da Doação (R$)</label>
                            <input
                                type="text"
                                id="valor"
                                value={valor}
                                onChange={handleValorChange}
                                placeholder="Ex: 50.00"
                                disabled={isLoading}
                            />
                        </div>
                        <fieldset className="payment-method">
                            <legend>Forma de Pagamento:</legend>
                            <div>
                                <input
                                    type="radio"
                                    id="pix"
                                    name="metodoPagamento"
                                    value="Pix"
                                    checked={metodoPagamento === 'Pix'}
                                    onChange={() => setMetodoPagamento('Pix')}
                                    disabled={isLoading}
                                />
                                <label htmlFor="pix">Pix</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="boleto"
                                    name="metodoPagamento"
                                    value="Boleto"
                                    checked={metodoPagamento === 'Boleto'}
                                    onChange={() => setMetodoPagamento('Boleto')}
                                    disabled={isLoading}
                                />
                                <label htmlFor="boleto">Boleto Bancário</label>
                            </div>
                        </fieldset>
                        {erro && <p className="error-message">{erro}</p>}
                        <button type="submit" className="doar-button" disabled={isLoading}>
                            {isLoading ? 'Processando...' : 'Doar Agora'}
                        </button>
                    </form>
                </div>

                <div className="membros-box">
                    <h3>Área do Doador</h3>
                    <p>Crie uma conta para fazer doações recorrentes, gerenciar seus pagamentos e ver seu histórico de contribuições.</p>
                    <div className="botoes-membros">
                        <button onClick={() => navigate('/login')} className="login-button">
                            Entrar
                        </button>
                        <button onClick={() => navigate('/cadastro')} className="cadastro-button">
                            Criar Conta
                        </button>
                    </div>
                </div>
            </main>

            <footer className="home-footer">
                <p>&copy; 2023 Doação Asilo. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default HomePage;
