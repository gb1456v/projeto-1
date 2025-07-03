// src/components/ERP/Tasks/TasksView.tsx
import React, { useState, useMemo } from 'react';
import { Task, TaskStatus, User } from '../../../types/erp';
import { mockTasks } from '../../../data/tasksData';
import TaskFormModal from './TaskFormModal';
import { Plus, Tag } from 'lucide-react';

// Tipos para as props do componente
interface TasksViewProps {
  currentUser: User;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  backlog: { label: 'Backlog', color: 'bg-gray-500' },
  todo: { label: 'A Fazer', color: 'bg-blue-500' },
  inprogress: { label: 'Em Progresso', color: 'bg-yellow-500' },
  done: { label: 'Concluído', color: 'bg-green-500' },
  cancelled: { label: 'Cancelado', color: 'bg-red-500' },
};

const priorityConfig = {
    low: 'text-gray-500',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
};


const TaskCard = ({ task, onEdit }: { task: Task, onEdit: (task: Task) => void }) => (
  <div onClick={() => onEdit(task)} className="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer hover:shadow-md">
    <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
    <p className="text-sm text-gray-500 mb-3">{task.project.name}</p>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex -space-x-2">
            {task.assignees.map(a => <img key={a.id} src={a.avatar} alt={a.name} className="w-6 h-6 rounded-full ring-2 ring-white"/>)}
        </div>
      </div>
      <Tag size={16} className={priorityConfig[task.priority]} />
    </div>
  </div>
);


const KanbanColumn = ({ status, tasks, onEdit }: { status: TaskStatus, tasks: Task[], onEdit: (task: Task) => void }) => {
  const config = statusConfig[status];
  return (
    <div className="flex-1 min-w-[300px] bg-gray-100 p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
        <h2 className="font-bold text-gray-700">{config.label}</h2>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>
      <div>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEdit}/>
        ))}
      </div>
    </div>
  );
};


const TasksView: React.FC<TasksViewProps> = ({ currentUser }) => {
  // Mantemos um estado com TODAS as tarefas (simulando uma base de dados)
  const [allTasks, setAllTasks] = useState<Task[]>(mockTasks);
  
  const [isFormOpen, setFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // AQUI ESTÁ A LÓGICA PRINCIPAL:
  // Filtramos a lista completa de tarefas para mostrar apenas as do utilizador atual.
  // useMemo garante que este filtro só é recalculado quando necessário.
  const myTasks = useMemo(() => {
    return allTasks.filter(task => 
      task.assignees.some(assignee => assignee.id === currentUser.id)
    );
  }, [allTasks, currentUser.id]);


  const columns: TaskStatus[] = ['backlog', 'todo', 'inprogress', 'done', 'cancelled'];
  
  const tasksByStatus = useMemo(() => {
    // O quadro Kanban agora é construído com base nas tarefas filtradas (myTasks)
    return myTasks.reduce((acc, task) => {
        acc[task.status] = [...(acc[task.status] || []), task];
        return acc;
    }, {} as Record<TaskStatus, Task[]>);
  }, [myTasks]);

  const handleSaveTask = (taskData: Task) => {
    // A função de salvar atualiza a lista principal de tarefas
    const index = allTasks.findIndex(t => t.id === taskData.id);
    if (index > -1) {
      setAllTasks(currentTasks => currentTasks.map(t => t.id === taskData.id ? taskData : t));
    } else {
      setAllTasks(currentTasks => [taskData, ...currentTasks]);
    }
    setFormOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setFormOpen(true);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 px-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
          <p className="text-sm text-gray-500">{myTasks.length} tarefas atribuídas a si</p>
        </div>
        <button onClick={() => setFormOpen(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Nova Tarefa</span>
        </button>
      </div>
      
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(status => (
          <KanbanColumn 
            key={status}
            status={status}
            tasks={tasksByStatus[status] || []}
            onEdit={handleEditTask}
          />
        ))}
      </div>

      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => {setFormOpen(false); setTaskToEdit(null);}}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        // Passamos o utilizador atual para o modal para que ele possa ser auto-atribuído
        currentUser={currentUser}
      />
    </div>
  );
};

export default TasksView;