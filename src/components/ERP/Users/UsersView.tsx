import React, { useState } from 'react';
import { User } from '../../../types/erp';
import { mockUser } from '../../../data/mockData';
// Certifique-se de que o arquivo UserFormModal.tsx existe neste diretório.
// Se estiver em outro local, atualize o caminho conforme necessário.
import UserFormModal from './UserFormModal';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface UsersViewProps {
  currentUser: User;
}

const RoleBadge = ({ role }: { role: User['role'] }) => {
  const map: Record<User['role'], string> = {
    admin: 'bg-red-100 text-red-700',
    manager: 'bg-orange-100 text-orange-700',
    member: 'bg-blue-100 text-blue-700',
    client: 'bg-gray-100 text-gray-700',
  };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${map[role]}`}>{role.charAt(0).toUpperCase() + role.slice(1)}</span>;
};

const UsersView: React.FC<UsersViewProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>(Object.values(mockUser));
  const [isFormOpen, setFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleSaveUser = (userData: Omit<User, 'id' | 'avatar'>) => {
    alert(`Usuário ${userData.name} salvo com sucesso! (Funcionalidade de edição/criação real não implementada com mock data)`);
    setFormOpen(false);
  };

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setFormOpen(true);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Tem a certeza que quer excluir o usuário ${user.name}?`)) {
       alert(`Usuário ${user.name} excluído! (Funcionalidade de exclusão real não implementada com mock data)`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
          <p className="text-sm text-gray-500">{users.length} usuários no sistema</p>
        </div>
        {/* O BOTÃO SÓ APARECE SE O USUÁRIO FOR ADMIN */}
        {currentUser.role === 'admin' && (
          <button onClick={() => { setUserToEdit(null); setFormOpen(true); }} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Novo Usuário</span>
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Função</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                <td className="px-6 py-4 whitespace-nowrap"><RoleBadge role={user.role} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {currentUser.role === 'admin' && (
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />
    </div>
  );
};

export default UsersView;