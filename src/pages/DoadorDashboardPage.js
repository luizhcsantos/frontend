import React from 'react';
import NavigationButton from '../components/NavigationButton';

const user = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    totalDonations: 5,
};

const donationHistory = [
    { id: 1, date: '2024-05-10', amount: 100, institution: 'Asilo Esperança' },
    { id: 2, date: '2024-04-22', amount: 50, institution: 'Lar dos Idosos' },
    { id: 3, date: '2024-03-15', amount: 75, institution: 'Casa de Apoio' },
    { id: 4, date: '2024-02-28', amount: 120, institution: 'Asilo Esperança' },
    { id: 5, date: '2024-01-10', amount: 80, institution: 'Lar dos Idosos' },
];

const DoadorDashboardPage = () => {
    return (
        <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <NavigationButton />
            <h2>Bem-vindo, {user.name}!</h2>
            <div style={{ marginBottom: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Total de doações:</strong> {user.totalDonations}</p>
            </div>
            <h3>Histórico de Doações</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Data</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Instituição</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Valor (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    {donationHistory.map(donation => (
                        <tr key={donation.id}>
                            <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{donation.date}</td>
                            <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{donation.institution}</td>
                            <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{donation.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoadorDashboardPage;