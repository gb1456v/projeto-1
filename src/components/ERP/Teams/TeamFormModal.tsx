import React, { useState, useEffect } from 'react';
import { Team, TeamMember } from '../../../types/erp';
import { mockUser } from '../../../data/mockData';
import { X, Trash2 } from 'lucide-react';

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: Team) => void;
  teamToEdit?: Team | null;
}

// Criamos uma lista de todos os utilizadores disponíveis para adicionar à equipa
const allUsers = Object.values(mockUser);

const TeamFormModal: React.FC<TeamFormModalProps> = ({ isOpen, onClose, onSave, teamToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leaderId, setLeaderId] = useState<number | ''>('');
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    if (teamToEdit) {
      setName(teamToEdit.name);
      setDescription(teamToEdit.description);
      setLeaderId(teamToEdit.leaderId);
      setMembers(teamToEdit.members);
    } else {
      // Limpa o formulário quando se cria uma nova equipa
      setName('');
      setDescription('');
      setLeaderId('');
      setMembers([]);
    }
  }, [teamToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddMember = (memberId: string) => {
    const memberToAdd = allUsers.find(u => u.id === parseInt(memberId));
    // Adiciona o membro apenas se ele existir e ainda não estiver na lista
    if (memberToAdd && !members.some(m => m.id === memberToAdd.id)) {
      setMembers([...members, memberToAdd]);
    }
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderId) {
      alert('Por favor, selecione um líder para a equipa.');
      return;
    }
    
    const teamData: Team = {
      id: teamToEdit ? teamToEdit.id : `team-${Date.now()}`,
      createdAt: teamToEdit ? teamToEdit.createdAt : new Date().toISOString(),
      name,
      description,
      leaderId: leaderId,
      members
    };
    onSave(teamData);
  };
  
  // Filtra os utilizadores que ainda não foram adicionados à equipa para popular o dropdown
  const availableMembers = allUsers.filter(u => !members.some(m => m.id === u.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl my-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{teamToEdit ? 'Editar Equipa' : 'Criar Nova Equipa'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Equipa</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Líder da Equipa</label>
                <select value={leaderId} onChange={(e) => setLeaderId(Number(e.target.value))} className="w-full p-2 border rounded bg-white" required>
                  <option value="" disabled>Selecione um líder</option>
                  {allUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full p-2 border rounded" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Membros da Equipa ({members.length})</h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                   <select onChange={(e) => handleAddMember(e.target.value)} className="flex-grow p-2 border rounded bg-white">
                      <option>Adicionar membro...</option>
                      {availableMembers.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                   </select>
                </div>
                <div className="space-y-2">
                  {members.map(member => (
                    <div key={member.id} className="flex justify-between items-center bg-white p-2 rounded border">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full"/>
                        <div>
                           <p className="font-medium text-gray-900">{member.name}</p>
                           <p className="text-xs text-gray-500">{member.department}</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => handleRemoveMember(member.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                    </div>
                  ))}
                  {members.length === 0 && <p className="text-center text-gray-500 text-sm py-4">Nenhum membro adicionado.</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Salvar Equipa</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamFormModal;