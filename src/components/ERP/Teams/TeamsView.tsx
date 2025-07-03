// src/components/ERP/Teams/TeamsView.tsx

import React, { useState } from 'react';
import { Team } from '../../../types/erp';
import { mockTeams } from '../../../data/teamsData';
import { mockUser } from '../../../data/mockData';
import TeamFormModal from './TeamFormModal';
import DeleteConfirmationModal from '../Shared/DeleteConfirmationModal';
import { Plus, Edit, Trash2 } from 'lucide-react';

const TeamsView = () => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  const allUsers = Object.values(mockUser);

  const handleSaveTeam = (teamData: Team) => {
    const index = teams.findIndex(t => t.id === teamData.id);
    if (index > -1) {
      setTeams(currentTeams => currentTeams.map(t => t.id === teamData.id ? teamData : t));
    } else {
      setTeams(currentTeams => [teamData, ...currentTeams]);
    }
    setFormOpen(false);
    setTeamToEdit(null);
  };
  
  const handleEdit = (team: Team) => {
    setTeamToEdit(team);
    setFormOpen(true);
  };

  const handleDelete = (team: Team) => {
    setTeamToDelete(team);
    setDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if(teamToDelete) {
      setTeams(currentTeams => currentTeams.filter(t => t.id !== teamToDelete.id));
      setDeleteModalOpen(false);
      setTeamToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Equipas</h1>
          <p className="text-sm text-gray-500">{teams.length} equipas na organização</p>
        </div>
        <button onClick={() => { setTeamToEdit(null); setFormOpen(true); }} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Nova Equipa</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => {
          const leader = allUsers.find(u => u.id === team.leaderId);
          return (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="font-bold text-lg text-gray-800">{team.name}</h2>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(team)} className="text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(team)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 mb-4 h-10">{team.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-2">LÍDER</p>
                  {leader && (
                     <div className="flex items-center space-x-3">
                        <img src={leader.avatar} alt={leader.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium text-gray-900">{leader.name}</p>
                          <p className="text-xs text-gray-500">{leader.department}</p>
                        </div>
                     </div>
                  )}
                </div>
              </div>

              <div>
                 <p className="text-xs text-gray-500 font-semibold mb-2">MEMBROS ({team.members.length})</p>
                 <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2 overflow-hidden">
                       {team.members.slice(0, 5).map(member => (
                          <img key={member.id} src={member.avatar} alt={member.name} className="inline-block h-8 w-8 rounded-full ring-2 ring-white"/>
                       ))}
                    </div>
                    {team.members.length > 5 && (
                      <span className="text-sm font-medium text-gray-500">+{team.members.length - 5}</span>
                    )}
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <TeamFormModal
        isOpen={isFormOpen}
        onClose={() => { setFormOpen(false); setTeamToEdit(null); }}
        onSave={handleSaveTeam}
        teamToEdit={teamToEdit}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={teamToDelete?.name || ''}
      />
    </div>
  );
};

export default TeamsView;