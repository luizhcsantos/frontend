import axios from 'axios';

const API_URL = 'http://localhost:8080/api/doacoes';

export const getHistorico = () => {
    return axios.get(`${API_URL}/historico`);
};

export const realizarDoacao = (dadosDoacao) => {
    return axios.post(API_URL, dadosDoacao);
};