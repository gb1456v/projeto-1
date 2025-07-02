import { Project, Task, Client, Invoice, User, TimeEntry, Expense, Team } from '../types/erp';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin JUBS',
    email: 'admin@jubs.com',
    role: 'admin',
    department: 'Administração',
    hourlyRate: 100,
    permissions: ['all'],
    teams: ['1', '2', '3'],
    workspaces: ['1'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'maria@jubs.com',
    role: 'manager',
    department: 'Comercial',
    hourlyRate: 75,
    permissions: ['projects_read', 'projects_write', 'tasks_read', 'tasks_write', 'clients_all'],
    teams: ['1'],
    workspaces: ['1'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'João Santos',
    email: 'joao@jubs.com',
    role: 'member',
    department: 'Produção',
    hourlyRate: 60,
    permissions: ['tasks_read', 'tasks_write', 'time_tracking'],
    teams: ['2'],
    workspaces: ['1'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Ana Designer',
    email: 'ana@jubs.com',
    role: 'member',
    department: 'Design',
    hourlyRate: 70,
    permissions: ['tasks_read', 'tasks_write', 'time_tracking'],
    teams: ['3'],
    workspaces: ['1'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '5',
    name: 'Carlos Vendas',
    email: 'carlos@jubs.com',
    role: 'member',
    department: 'Comercial',
    hourlyRate: 65,
    permissions: ['tasks_read', 'tasks_write', 'clients_read'],
    teams: ['1'],
    workspaces: ['1'],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '6',
    name: 'Fernanda Produção',
    email: 'fernanda@jubs.com',
    role: 'member',
    department: 'Produção',
    hourlyRate: 55,
    permissions: ['tasks_read', 'tasks_write', 'time_tracking'],
    teams: ['2'],
    workspaces: ['1'],
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Equipe Comercial',
    description: 'Responsável por vendas, relacionamento com clientes e gestão de contratos',
    members: ['2', '5'],
    leaderId: '2',
    projects: ['1', '2'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Equipe de Produção',
    description: 'Responsável pela confecção, qualidade e entrega dos produtos',
    members: ['3', '6'],
    leaderId: '3',
    projects: ['1', '2'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Equipe de Design',
    description: 'Responsável pela criação, aprovação e revisão de designs',
    members: ['4'],
    leaderId: '4',
    projects: ['1', '2'],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    company: 'Silva & Associados',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    document: '123.456.789-00',
    type: 'individual',
    status: 'active',
    totalProjects: 3,
    totalRevenue: 15000,
    createdAt: '2024-01-10T00:00:00Z',
    lastContactDate: '2024-01-20T00:00:00Z',
    notes: 'Cliente preferencial, sempre paga em dia'
  },
  {
    id: '2',
    name: 'Empresa ABC Ltda',
    email: 'contato@empresaabc.com',
    phone: '(11) 88888-8888',
    company: 'ABC Ltda',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    document: '12.345.678/0001-90',
    type: 'company',
    status: 'active',
    totalProjects: 5,
    totalRevenue: 45000,
    createdAt: '2024-01-05T00:00:00Z',
    lastContactDate: '2024-01-18T00:00:00Z',
    notes: 'Grande cliente corporativo, pedidos recorrentes'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Uniformes Corporativos ABC',
    description: 'Projeto de confecção de uniformes para empresa ABC',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-02-15T00:00:00Z',
    progress: 65,
    budget: 25000,
    spent: 16250,
    teamMembers: ['2', '3', '4'],
    clientId: '2',
    tags: ['uniforme', 'corporativo', 'urgente'],
    createdBy: '2',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    name: 'Camisetas Personalizadas Silva',
    description: 'Camisetas personalizadas para evento da família Silva',
    status: 'active',
    priority: 'medium',
    startDate: '2024-01-18T00:00:00Z',
    endDate: '2024-01-28T00:00:00Z',
    progress: 30,
    budget: 5000,
    spent: 1500,
    teamMembers: ['2', '4'],
    clientId: '1',
    tags: ['camiseta', 'personalizado', 'evento'],
    createdBy: '2',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Projeto Interno - Treinamento',
    description: 'Projeto interno para treinamento da equipe',
    status: 'planning',
    priority: 'low',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-02-28T00:00:00Z',
    progress: 10,
    budget: 3000,
    spent: 300,
    teamMembers: ['3', '6'],
    tags: ['interno', 'treinamento'],
    createdBy: '3',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Aprovação do Design - Uniformes ABC',
    description: 'Criar e aprovar design dos uniformes corporativos',
    status: 'in_progress',
    priority: 'high',
    assignedTo: ['4'],
    projectId: '1',
    subtasks: [],
    dueDate: '2024-01-25T00:00:00Z',
    estimatedHours: 8,
    actualHours: 5,
    tags: ['design', 'aprovacao'],
    attachments: [],
    comments: [],
    dependencies: [],
    createdBy: '2',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'Produção - Lote 1 Uniformes',
    description: 'Confeccionar primeiro lote de 50 uniformes',
    status: 'todo',
    priority: 'high',
    assignedTo: ['3'],
    projectId: '1',
    subtasks: [],
    startDate: '2024-01-26T00:00:00Z',
    dueDate: '2024-02-05T00:00:00Z',
    estimatedHours: 40,
    actualHours: 0,
    tags: ['producao', 'uniforme'],
    attachments: [],
    comments: [],
    dependencies: ['1'],
    createdBy: '2',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    title: 'Design Camisetas Silva',
    description: 'Criar design personalizado para camisetas do evento',
    status: 'review',
    priority: 'medium',
    assignedTo: ['4'],
    projectId: '2',
    subtasks: [],
    dueDate: '2024-01-22T00:00:00Z',
    estimatedHours: 6,
    actualHours: 6,
    tags: ['design', 'camiseta'],
    attachments: [],
    comments: [],
    dependencies: [],
    createdBy: '2',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '4',
    title: 'Controle de Qualidade - Uniformes',
    description: 'Verificar qualidade dos uniformes produzidos',
    status: 'todo',
    priority: 'medium',
    assignedTo: ['6'],
    projectId: '1',
    subtasks: [],
    dueDate: '2024-02-08T00:00:00Z',
    estimatedHours: 4,
    actualHours: 0,
    tags: ['qualidade', 'uniforme'],
    attachments: [],
    comments: [],
    dependencies: ['2'],
    createdBy: '3',
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '5',
    title: 'Vendas - Prospecção Novos Clientes',
    description: 'Buscar novos clientes para produtos personalizados',
    status: 'in_progress',
    priority: 'medium',
    assignedTo: ['5'],
    subtasks: [],
    dueDate: '2024-01-30T00:00:00Z',
    estimatedHours: 12,
    actualHours: 8,
    tags: ['vendas', 'prospeccao'],
    attachments: [],
    comments: [],
    dependencies: [],
    createdBy: '2',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
];

export const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    taskId: '1',
    userId: '4',
    description: 'Criação do design inicial dos uniformes',
    hours: 3,
    date: '2024-01-20',
    billable: true,
    hourlyRate: 70,
    createdAt: '2024-01-20T15:00:00Z'
  },
  {
    id: '2',
    taskId: '1',
    userId: '4',
    description: 'Revisão e ajustes no design',
    hours: 2,
    date: '2024-01-20',
    billable: true,
    hourlyRate: 70,
    createdAt: '2024-01-20T17:00:00Z'
  },
  {
    id: '3',
    taskId: '3',
    userId: '4',
    description: 'Design das camisetas personalizadas',
    hours: 6,
    date: '2024-01-19',
    billable: true,
    hourlyRate: 70,
    createdAt: '2024-01-19T18:00:00Z'
  },
  {
    id: '4',
    taskId: '5',
    userId: '5',
    description: 'Pesquisa de mercado e contatos',
    hours: 4,
    date: '2024-01-19',
    billable: false,
    hourlyRate: 65,
    createdAt: '2024-01-19T16:00:00Z'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    clientId: '2',
    projectId: '1',
    items: [
      {
        id: '1',
        description: 'Design de Uniformes Corporativos',
        quantity: 1,
        unitPrice: 2000,
        total: 2000,
        taxRate: 0.1
      },
      {
        id: '2',
        description: 'Confecção de Uniformes - Lote 1',
        quantity: 50,
        unitPrice: 80,
        total: 4000,
        taxRate: 0.1
      }
    ],
    subtotal: 6000,
    taxes: 600,
    discount: 0,
    total: 6600,
    status: 'sent',
    issueDate: '2024-01-20T00:00:00Z',
    dueDate: '2024-02-20T00:00:00Z',
    notes: 'Pagamento em 30 dias',
    createdBy: '2',
    createdAt: '2024-01-20T00:00:00Z'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Tecido para uniformes - Lote 1',
    amount: 1500,
    category: 'Material',
    date: '2024-01-18',
    projectId: '1',
    status: 'approved',
    submittedBy: '3',
    approvedBy: '2',
    createdAt: '2024-01-18T00:00:00Z'
  },
  {
    id: '2',
    description: 'Tinta para estamparia',
    amount: 300,
    category: 'Material',
    date: '2024-01-19',
    projectId: '2',
    status: 'pending',
    submittedBy: '4',
    createdAt: '2024-01-19T00:00:00Z'
  }
];