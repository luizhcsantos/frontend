import React, {useState, useEffect} from "react";
import {getHistorico} from '../services/doacaoService';


const historicoDoacoes = () => {
    const [doacoes, setDoacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const response = await getHistorico();
                setDoacoes(response.data);
            } catch (error) {
                console.error("Erro ao buscar o histórico de doações", error);
            } finally {
                setLoading(false);
            }
        };
        buscarDados();
    }, []);
    if (loading) {
        return <p>Carregando histórico...</p>
    }
    return (
        <div>
            <h3>Seu histórico de doações</h3>
            <table>
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {doacoes.map((doacao) => (
                    <tr key={doacao.id}>
                        <td>{new Date(doacao.data).toLocaleDateString()}</td>
                        <td>R$ {doacao.valor.toFixed(2)}</td>
                        <td>{doacao.tipoDoacao}</td>
                        <td>{doacao.statusPagamento}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default historicoDoacoes;