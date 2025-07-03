// src/components/ERP/Clients/ClientFormModal.tsx
import React, { useState, useEffect } from 'react';
import { Client } from '../../../types/client';
import { X } from 'lucide-react';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Client) => void;
  clientToEdit?: Client | null;
}

const ClientFormModal: React.FC<ClientFormModalProps> = ({ isOpen, onClose, onSave, clientToEdit }) => {
  const [formData, setFormData] = useState<Omit<Client, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead',
  });

  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name,
        email: clientToEdit.email,
        phone: clientToEdit.phone,
        company: clientToEdit.company,
        status: clientToEdit.status,
      });
    } else {
      setFormData({ name: '', email: '', phone: '', company: '', status: 'lead' });
    }
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientData: Client = {
      id: clientToEdit ? clientToEdit.id : `cli-${Date.now()}`,
      createdAt: clientToEdit ? clientToEdit.createdAt : new Date().toISOString(),
      ...formData,
    };
    onSave(clientData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{clientToEdit ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                <option value="lead">Lead</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
          <div className="p-6 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Salvar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientFormModal;