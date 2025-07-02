import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Paperclip
} from 'lucide-react';
import { mockTasks, mockUsers, mockProjects } from '../../../data/erpData';
import { Task } from '../../../types/erp';
import { useAuth } from '../../../contexts/AuthContext';

const TasksView: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const taskColumns = [
    { id: 'todo', title: 'A Fazer', color: 'bg-gray-100' },
    { id: 'in_progress', title: 'Em Progresso', color: 'bg-blue-100' },
    { id: 'review', title: 'Em Revisão', color: 'bg-yellow-100' },
    { id: 'done', title: 'Concluído', color: 'bg-green-100' }
  ];

  // Filter tasks based on user permissions
  const getVisibleTasks = () => {
    if (currentUser?.role === 'admin') {
      return tasks; // Admin can see all tasks
    }
    
    // Non-admin users can only see tasks assigned to them or created by them
    return tasks.filter(task => 
      task.assignedTo.includes(currentUser?.id || '') ||
      task.createdBy === currentUser?.id
    );
  };

  const filteredTasks = getVisibleTasks().filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignedTo.includes(assigneeFilter);
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-500 bg-gray-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Usuário não encontrado';
  };

  const getProjectName = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    return project ? project.name : 'Projeto não encontrado';
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = tasks.map(task => 
        task.id === draggableId 
          ? { ...task, status: destination.droppableId as any, updatedAt: new Date().toISOString() }
          : task
      );
      setTasks(updatedTasks);
    }
  };

  const isOverdue = (task: Task) => {
    return task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
  };

  const canManageTasks = currentUser?.role === 'admin' || currentUser?.role === 'manager';

  // Get visible users for the assignee filter
  const getVisibleUsers = () => {
    if (currentUser?.role === 'admin') {
      return mockUsers;
    }
    
    // Non-admin users can only see users from their projects/tasks
    const visibleUserIds = new Set<string>();
    getVisibleTasks().forEach(task => {
      task.assignedTo.forEach(userId => visibleUserIds.add(userId));
      visibleUserIds.add(task.createdBy);
    });
    
    return mockUsers.filter(user => visibleUserIds.has(user.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
          <p className="text-gray-600 mt-1">Gerencie suas tarefas</p>
        </div>
        {canManageTasks && (
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg">
            <Plus size={20} />
            <span>Nova Tarefa</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as Prioridades</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Responsáveis</option>
              {getVisibleUsers().map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('board')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'board' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      {/* Tasks View */}
      {viewMode === 'board' ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {taskColumns.map((column) => (
              <div key={column.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className={`p-4 ${column.color} rounded-t-xl`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                    <span className="bg-white bg-opacity-70 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                      {getTasksByStatus(column.id).length}
                    </span>
                  </div>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 min-h-[500px] ${snapshot.isDraggingOver ? 'bg-gray-50' : ''}`}
                    >
                      {getTasksByStatus(column.id).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              } ${isOverdue(task) ? 'border-red-300 bg-red-50' : ''}`}
                              onClick={() => setSelectedTask(task)}
                            >
                              <div className="space-y-3">
                                {/* Task Header */}
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{task.title}</h4>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {getPriorityLabel(task.priority)}
                                  </span>
                                </div>

                                {/* Task Description */}
                                {task.description && (
                                  <p className="text-gray-600 text-xs line-clamp-2">{task.description}</p>
                                )}

                                {/* Project */}
                                {task.projectId && (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-xs text-gray-500">{getProjectName(task.projectId)}</span>
                                  </div>
                                )}

                                {/* Due Date */}
                                {task.dueDate && (
                                  <div className={`flex items-center space-x-1 ${isOverdue(task) ? 'text-red-600' : 'text-gray-500'}`}>
                                    <Calendar size={12} />
                                    <span className="text-xs">
                                      {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                                    </span>
                                    {isOverdue(task) && <AlertTriangle size={12} />}
                                  </div>
                                )}

                                {/* Assignees */}
                                <div className="flex items-center justify-between">
                                  <div className="flex -space-x-2">
                                    {task.assignedTo.slice(0, 3).map((userId, index) => {
                                      const user = mockUsers.find(u => u.id === userId);
                                      return (
                                        <img
                                          key={index}
                                          src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                                          alt={user?.name}
                                          className="w-6 h-6 rounded-full border-2 border-white"
                                          title={user?.name}
                                        />
                                      );
                                    })}
                                    {task.assignedTo.length > 3 && (
                                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                                        <span className="text-xs text-gray-600">+{task.assignedTo.length - 3}</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Task Stats */}
                                  <div className="flex items-center space-x-2">
                                    {task.comments.length > 0 && (
                                      <div className="flex items-center space-x-1 text-gray-500">
                                        <MessageSquare size={12} />
                                        <span className="text-xs">{task.comments.length}</span>
                                      </div>
                                    )}
                                    {task.attachments.length > 0 && (
                                      <div className="flex items-center space-x-1 text-gray-500">
                                        <Paperclip size={12} />
                                        <span className="text-xs">{task.attachments.length}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Time Tracking */}
                                {task.actualHours > 0 && (
                                  <div className="flex items-center space-x-1 text-gray-500">
                                    <Clock size={12} />
                                    <span className="text-xs">{task.actualHours}h / {task.estimatedHours}h</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarefa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prazo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className={`hover:bg-gray-50 ${isOverdue(task) ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                        {task.projectId && (
                          <div className="text-xs text-blue-600 mt-1">{getProjectName(task.projectId)}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        task.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.status === 'todo' ? 'A Fazer' :
                         task.status === 'in_progress' ? 'Em Progresso' :
                         task.status === 'review' ? 'Em Revisão' :
                         'Concluído'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {task.assignedTo.slice(0, 2).map((userId, index) => {
                          const user = mockUsers.find(u => u.id === userId);
                          return (
                            <img
                              key={index}
                              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                              alt={user?.name}
                              className="w-8 h-8 rounded-full border-2 border-white"
                              title={user?.name}
                            />
                          );
                        })}
                        {task.assignedTo.length > 2 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{task.assignedTo.length - 2}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.dueDate ? (
                        <div className={`text-sm ${isOverdue(task) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                          {isOverdue(task) && (
                            <div className="flex items-center space-x-1 text-red-500 mt-1">
                              <AlertTriangle size={12} />
                              <span className="text-xs">Atrasado</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Sem prazo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalhes"
                        >
                          <Eye size={16} />
                        </button>
                        {(canManageTasks || task.assignedTo.includes(currentUser?.id || '') || task.createdBy === currentUser?.id) && (
                          <button className="text-green-600 hover:text-green-900" title="Editar">
                            <Edit size={16} />
                          </button>
                        )}
                        {(canManageTasks || task.createdBy === currentUser?.id) && (
                          <button className="text-red-600 hover:text-red-900" title="Excluir">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{selectedTask.title}</h2>
                <p className="text-gray-600 mt-1">{selectedTask.description}</p>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Task Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedTask.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                        selectedTask.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                        selectedTask.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {selectedTask.status === 'todo' ? 'A Fazer' :
                         selectedTask.status === 'in_progress' ? 'Em Progresso' :
                         selectedTask.status === 'review' ? 'Em Revisão' :
                         'Concluído'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Prioridade</label>
                    <div className="mt-1">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                        {getPriorityLabel(selectedTask.priority)}
                      </span>
                    </div>
                  </div>

                  {selectedTask.projectId && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Projeto</label>
                      <p className="mt-1 text-sm text-blue-600">{getProjectName(selectedTask.projectId)}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {selectedTask.dueDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Prazo</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className={`text-sm ${isOverdue(selectedTask) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {new Date(selectedTask.dueDate).toLocaleDateString('pt-BR')}
                        </span>
                        {isOverdue(selectedTask) && <AlertTriangle size={16} className="text-red-500" />}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">Tempo</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {selectedTask.actualHours}h trabalhadas de {selectedTask.estimatedHours}h estimadas
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min((selectedTask.actualHours / selectedTask.estimatedHours) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignees */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Responsáveis</label>
                <div className="flex flex-wrap gap-3">
                  {selectedTask.assignedTo.map((userId) => {
                    const user = mockUsers.find(u => u.id === userId);
                    return user ? (
                      <div key={userId} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <img
                          src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-900">{user.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Tags */}
              {selectedTask.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Criado em {new Date(selectedTask.createdAt).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span>Atualizado em {new Date(selectedTask.updatedAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Registrar Tempo
                  </button>
                  {(canManageTasks || selectedTask.assignedTo.includes(currentUser?.id || '') || selectedTask.createdBy === currentUser?.id) && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Editar Tarefa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksView;