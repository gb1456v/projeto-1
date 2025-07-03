// src/components/ERP/Clients/ClientsView.tsx
import React, { useState, useMemo } from 'react';
import { Client } from '../../../types/client';
import { mockClients } from '../../../data/clientsData';
import ClientFormModal from './ClientFormModal';
import DeleteConfirmationModal from '../Shared/DeleteConfirmationModal';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const StatusBadge = ({ status }: { status: Client['status'] }) => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full inline-block";
  const statusMap = {
    active: `bg-green-100 text-green-800`,
    inactive: `bg-gray-100 text-gray-800`,
    lead: `bg-blue-100 text-blue-800`,
  };
  return <span className={`${baseClasses} ${statusMap[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
};

const ClientsView = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const filteredClients = useMemo(() =>
    clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [clients, searchTerm]);

  const handleSaveClient = (clientData: Client) => {
    const index = clients.findIndex(c => c.id === clientData.id);
    if (index > -1) {
      setClients(clients.map(c => c.id === clientData.id ? clientData : c));
    } else {
      setClients([clientData, ...clients]);
    }
    setFormOpen(false);
    setClientToEdit(null);
  };

  const handleEdit = (client: Client) => {
    setClientToEdit(client);
    setFormOpen(true);
  };

  const handleDelete = (client: Client) => {
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if(clientToDelete) {
      setClients(clients.filter(c => c.id !== clientToDelete.id));
      setDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Clientes</h1>
          <p className="text-sm text-gray-500">{filteredClients.length} clientes encontrados</p>
        </div>
        <button onClick={() => setFormOpen(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por nome, empresa ou e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={client.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(client.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => handleEdit(client)} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(client)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ClientFormModal
        isOpen={isFormOpen}
        onClose={() => { setFormOpen(false); setClientToEdit(null); }}
        onSave={handleSaveClient}
        clientToEdit={clientToEdit}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={clientToDelete?.name || ''}
      />
    </div>
  );
};

export default ClientsView;