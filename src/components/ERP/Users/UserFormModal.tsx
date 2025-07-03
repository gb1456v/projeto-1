import React, { useState, useEffect } from 'react';
import { User } from '../../../types/erp';
import { X } from 'lucide-react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, 'id' | 'avatar'>) => void;
  userToEdit?: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSave, userToEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState<'member' | 'manager' | 'admin' | 'client'>('member');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setDepartment(userToEdit.department);
      setRole(userToEdit.role);
    } else {
      // Limpa o formulário para um novo usuário
      setName('');
      setEmail('');
      setDepartment('');
      setRole('member');
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, department, role });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">{userToEdit ? 'Editar Usuário' : 'Criar Novo Usuário'}</h2>
            <button type="button" onClick={onClose}><X size={24}/></button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
              <select value={role} onChange={e => setRole(e.target.value as User['role'])} className="w-full p-2 border rounded bg-white">
                <option value="member">Membro</option>
                <option value="manager">Gerente</option>
                <option value="admin">Administrador</option>
                <option value="client">Cliente</option>
              </select>
            </div>
          </div>
          <div className="p-6 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-700 bg-white border rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded">Salvar Usuário</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;