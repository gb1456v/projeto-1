// src/components/ERP/Tasks/TaskFormModal.tsx
import React, { useState, useEffect } from 'react';
import { Task, User, Project, TaskStatus, TaskPriority } from '../../../types/erp';
import { mockProjects } from '../../../data/projectsData';
import { mockUser } from '../../../data/mockData';
import { X } from 'lucide-react';

// AQUI ESTÁ A CORREÇÃO: Adicionamos 'currentUser' à interface
interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit?: Task | null;
  currentUser: User; 
}

const allUsers = Object.values(mockUser);
const allProjects = mockProjects;

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onSave, taskToEdit, currentUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('backlog');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [projectId, setProjectId] = useState('');
  const [assignees, setAssignees] = useState<User[]>([]);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setProjectId(taskToEdit.project.id);
      setAssignees(taskToEdit.assignees);
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
    } else {
      // Limpa o formulário e auto-atribui o utilizador atual a uma nova tarefa
      setTitle('');
      setDescription('');
      setStatus('backlog');
      setPriority('medium');
      setProjectId('');
      setAssignees([currentUser]);
      setDueDate('');
    }
  }, [taskToEdit, isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = allProjects.find(p => p.id === projectId);
    if (!project) {
      alert("Por favor, selecione um projeto.");
      return;
    }

    const taskData: Task = {
      id: taskToEdit ? taskToEdit.id : `task-${Date.now()}`,
      title,
      description,
      status,
      priority,
      project,
      assignees,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    };
    onSave(taskData);
  };
  
  const handleAssigneeChange = (userId: number) => {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;

    if (assignees.some(a => a.id === userId)) {
      setAssignees(assignees.filter(a => a.id !== userId));
    } else {
      setAssignees([...assignees, user]);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <input type="text" placeholder="Título da Tarefa" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded text-lg font-semibold" required />
            <textarea placeholder="Adicione uma descrição..." value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" rows={4}></textarea>
            
            <div className="grid grid-cols-2 gap-4">
               <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full p-2 border rounded bg-white">
                 <option value="backlog">Backlog</option>
                 <option value="todo">A Fazer</option>
                 <option value="inprogress">Em Progresso</option>
                 <option value="done">Concluído</option>
                 <option value="cancelled">Cancelado</option>
               </select>
               <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="w-full p-2 border rounded bg-white">
                 <option value="low">Baixa</option>
                 <option value="medium">Média</option>
                 <option value="high">Alta</option>
                 <option value="urgent">Urgente</option>
               </select>
            </div>
             <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full p-2 border rounded bg-white" required>
                 <option value="" disabled>Selecione um Projeto</option>
                 {allProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-2 border rounded"/>
            
            <div>
              <p className="font-medium mb-2">Responsáveis</p>
              <div className="flex flex-wrap gap-2">
                {allUsers.map(user => (
                  <button type="button" key={user.id} onClick={() => handleAssigneeChange(user.id)} className={`flex items-center gap-2 p-1 rounded-full border-2 ${assignees.some(a => a.id === user.id) ? 'border-blue-500 bg-blue-100' : 'border-transparent bg-gray-100'}`}>
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm pr-2">{user.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 flex justify-end">
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Salvar Tarefa</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;