// src/data/tasksData.ts
import { Task } from '../types/erp';
import { mockProjects } from './projectsData';
import { mockUser } from './mockData';

export const mockTasks: Task[] = [
  {
    id: 'task-01',
    title: 'Desenhar estampa floral principal',
    status: 'inprogress',
    priority: 'high',
    assignees: [mockUser.designLead, mockUser.designer],
    project: mockProjects[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
  },
  {
    id: 'task-02',
    title: 'Pesquisa de paleta de cores',
    status: 'todo',
    priority: 'medium',
    assignees: [mockUser.designer],
    project: mockProjects[0],
  },
  {
    id: 'task-03',
    title: 'Criar mockups para aprovação',
    status: 'backlog',
    priority: 'medium',
    assignees: [],
    project: mockProjects[0],
  },
  {
    id: 'task-04',
    title: 'Definir estratégia de lançamento',
    status: 'done',
    priority: 'high',
    assignees: [mockUser.marketingLead, mockUser.admin],
    project: mockProjects[1],
    dueDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
  },
  {
    id: 'task-05',
    title: 'Comprar domínio e alojamento',
    status: 'cancelled',
    priority: 'low',
    assignees: [mockUser.admin],
    project: mockProjects[2],
  },
    {
    id: 'task-06',
    title: 'Reunião de kickoff com cliente',
    status: 'done',
    priority: 'high',
    assignees: [mockUser.manager],
    project: mockProjects[1],
    dueDate: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
  },
];