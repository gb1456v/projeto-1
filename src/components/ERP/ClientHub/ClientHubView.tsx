import React, { useState } from 'react';
import { Client } from '../../../types/erp';
import { mockClients } from '../../../data/clientsData';
import ClientDetailView from './ClientDetailView';
import { Search, UserPlus } from 'lucide-react';

const ClientHubView = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Se um cliente for selecionado, mostra a vista de detalhes
  if (selectedClient) {
    return <ClientDetailView client={selectedClient} onBack={() => setSelectedClient(null)} />;
  }
  
  // Caso contrário, mostra a lista de todos os clientes
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-sm text-gray-500">{clients.length} clientes ativos</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <UserPlus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client.id} onClick={() => setSelectedClient(client)} 
               className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-lg transition-all border border-gray-200">
             <h3 className="font-bold text-lg text-gray-900">{client.name}</h3>
             <p className="text-sm text-gray-600">{client.company}</p>
             <p className="text-xs text-gray-500 mt-2">{client.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientHubView;