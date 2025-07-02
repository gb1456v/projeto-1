import { Product, Order, User, Client, Invoice, Task, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin JUBS',
    email: 'admin@jubs.com',
    role: 'admin',
    department: 'admin',
    permissions: ['all'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'maria@jubs.com',
    role: 'comercial',
    department: 'comercial',
    permissions: ['orders_read', 'orders_write', 'clients_read', 'clients_write', 'invoices_read', 'invoices_write'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'João Santos',
    email: 'joao@jubs.com',
    role: 'producao',
    department: 'producao',
    permissions: ['orders_read', 'orders_write', 'tasks_read', 'tasks_write'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Ana Designer',
    email: 'ana@jubs.com',
    role: 'designer',
    department: 'design',
    permissions: ['orders_read', 'orders_write', 'design_read', 'design_write'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '5',
    name: 'Carlos Comercial',
    email: 'carlos@jubs.com',
    role: 'comercial',
    department: 'comercial',
    permissions: ['orders_read', 'orders_write', 'clients_read', 'clients_write'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    category: 'Camiseta',
    price: 25.00,
    cost: 12.00,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    description: 'Camiseta básica 100% algodão, ideal para personalização',
    stock: 150,
    minStock: 20,
    sku: 'CAM-BAS-001'
  },
  {
    id: '2',
    name: 'Moletom Personalizado',
    category: 'Moletom',
    price: 65.00,
    cost: 35.00,
    image: 'https://images.pexels.com/photos/8532675/pexels-photo-8532675.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    description: 'Moletom com capuz, tecido de alta qualidade',
    stock: 80,
    minStock: 10,
    sku: 'MOL-PER-001'
  },
  {
    id: '3',
    name: 'Boné Personalizado',
    category: 'Boné',
    price: 35.00,
    cost: 18.00,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    description: 'Boné ajustável com bordado personalizado',
    stock: 120,
    minStock: 15,
    sku: 'BON-PER-001'
  },
  {
    id: '4',
    name: 'Caneca Personalizada',
    category: 'Caneca',
    price: 20.00,
    cost: 8.00,
    image: 'https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    description: 'Caneca de porcelana com impressão personalizada',
    stock: 200,
    minStock: 25,
    sku: 'CAN-PER-001'
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    document: '123.456.789-00',
    type: 'pessoa_fisica',
    createdAt: '2024-01-10T00:00:00Z',
    totalOrders: 3,
    totalSpent: 1250.00,
    lastOrderDate: '2024-01-17T00:00:00Z'
  },
  {
    id: '2',
    name: 'Empresa ABC Ltda',
    email: 'contato@empresaabc.com',
    phone: '(11) 88888-8888',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    document: '12.345.678/0001-90',
    type: 'pessoa_juridica',
    createdAt: '2024-01-05T00:00:00Z',
    totalOrders: 5,
    totalSpent: 3500.00,
    lastOrderDate: '2024-01-15T00:00:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'JUBS-2024-001',
    clientName: 'João Silva',
    clientEmail: 'joao@email.com',
    clientPhone: '(11) 99999-9999',
    clientAddress: 'Rua das Flores, 123, São Paulo - SP',
    clientDocument: '123.456.789-00',
    productId: '1',
    productName: 'Camiseta Básica',
    customization: 'Logo da empresa + nome do funcionário',
    designBrief: 'Cliente quer logo centralizado no peito e nome nas costas',
    quantity: 10,
    unitPrice: 25.00,
    totalPrice: 250.00,
    status: 'em_design',
    priority: 'alta',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    dueDate: '2024-01-25T18:00:00Z',
    assignedTo: '2',
    designerId: '4',
    notes: 'Cliente pediu entrega urgente',
    internalNotes: 'Verificar disponibilidade de estoque',
    tags: ['corporativo', 'urgente'],
    attachments: [
      {
        id: '1',
        name: 'logo-empresa.png',
        url: '/uploads/logo-empresa.png',
        type: 'image/png',
        size: 245760,
        uploadedBy: '2',
        uploadedAt: '2024-01-15T10:35:00Z'
      }
    ],
    designFiles: [
      {
        id: '1',
        name: 'design-camiseta-v1.ai',
        url: '/designs/design-camiseta-v1.ai',
        version: 1,
        status: 'em_andamento',
        createdBy: '4',
        createdAt: '2024-01-16T09:00:00Z',
        comments: 'Primeira versão do design'
      }
    ],
    timeTracked: 120,
    estimatedTime: 180,
    workflow: [
      {
        id: '1',
        step: 'Aprovação Comercial',
        status: 'concluido',
        assignedTo: '2',
        startedAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-15T11:00:00Z',
        notes: 'Pedido aprovado, cliente confirmou especificações',
        timeSpent: 30
      },
      {
        id: '2',
        step: 'Criação do Design',
        status: 'em_andamento',
        assignedTo: '4',
        startedAt: '2024-01-16T09:00:00Z',
        notes: 'Iniciando criação do design conforme briefing',
        timeSpent: 90
      }
    ],
    invoiceGenerated: false
  },
  {
    id: '2',
    orderNumber: 'JUBS-2024-002',
    clientName: 'Maria Santos',
    clientEmail: 'maria@email.com',
    clientPhone: '(11) 88888-8888',
    clientAddress: 'Av. Brasil, 456, Rio de Janeiro - RJ',
    clientDocument: '987.654.321-00',
    productId: '2',
    productName: 'Moletom Personalizado',
    customization: 'Estampa personalizada com foto da família',
    designBrief: 'Foto da família na frente, frase motivacional nas costas',
    quantity: 2,
    unitPrice: 65.00,
    totalPrice: 130.00,
    status: 'producao_concluida',
    priority: 'media',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-17T11:45:00Z',
    dueDate: '2024-01-20T15:00:00Z',
    assignedTo: '3',
    designerId: '4',
    notes: 'Produto finalizado, aguardando aprovação final',
    internalNotes: 'Qualidade excelente, cliente ficará satisfeito',
    tags: ['personalizado', 'familia'],
    attachments: [
      {
        id: '2',
        name: 'foto-familia.jpg',
        url: '/uploads/foto-familia.jpg',
        type: 'image/jpeg',
        size: 1024000,
        uploadedBy: '2',
        uploadedAt: '2024-01-14T09:20:00Z'
      }
    ],
    designFiles: [
      {
        id: '2',
        name: 'design-moletom-final.ai',
        url: '/designs/design-moletom-final.ai',
        version: 3,
        status: 'aprovado',
        createdBy: '4',
        createdAt: '2024-01-15T14:00:00Z',
        approvedBy: '2',
        approvedAt: '2024-01-15T16:00:00Z',
        comments: 'Design aprovado pelo cliente'
      }
    ],
    timeTracked: 240,
    estimatedTime: 200,
    workflow: [
      {
        id: '1',
        step: 'Aprovação Comercial',
        status: 'concluido',
        assignedTo: '2',
        completedAt: '2024-01-14T10:00:00Z',
        timeSpent: 45
      },
      {
        id: '2',
        step: 'Criação do Design',
        status: 'concluido',
        assignedTo: '4',
        completedAt: '2024-01-15T16:00:00Z',
        timeSpent: 120
      },
      {
        id: '3',
        step: 'Produção',
        status: 'concluido',
        assignedTo: '3',
        completedAt: '2024-01-17T11:45:00Z',
        timeSpent: 180
      }
    ],
    invoiceGenerated: false
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Criar design para camiseta corporativa',
    description: 'Desenvolver design conforme briefing do cliente',
    type: 'design',
    status: 'in_progress',
    priority: 'alta',
    assignedTo: '4',
    createdBy: '2',
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    dueDate: '2024-01-18T17:00:00Z',
    tags: ['design', 'corporativo'],
    orderId: '1',
    timeTracked: 90,
    estimatedTime: 180
  },
  {
    id: '2',
    title: 'Produzir moletom personalizado',
    description: 'Confeccionar moletom conforme design aprovado',
    type: 'producao',
    status: 'done',
    priority: 'media',
    assignedTo: '3',
    createdBy: '2',
    createdAt: '2024-01-15T16:30:00Z',
    updatedAt: '2024-01-17T11:45:00Z',
    dueDate: '2024-01-19T12:00:00Z',
    tags: ['producao', 'moletom'],
    orderId: '2',
    timeTracked: 180,
    estimatedTime: 200
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo pedido recebido',
    message: 'Pedido JUBS-2024-003 aguarda aprovação comercial',
    type: 'info',
    read: false,
    createdAt: '2024-01-18T10:00:00Z',
    userId: '2',
    actionUrl: '/orders/3',
    orderId: '3'
  },
  {
    id: '2',
    title: 'Design aprovado',
    message: 'Design do pedido JUBS-2024-002 foi aprovado pelo cliente',
    type: 'success',
    read: false,
    createdAt: '2024-01-17T16:00:00Z',
    userId: '3',
    actionUrl: '/orders/2',
    orderId: '2'
  },
  {
    id: '3',
    title: 'Prazo próximo do vencimento',
    message: 'Pedido JUBS-2024-001 vence em 2 dias',
    type: 'warning',
    read: true,
    createdAt: '2024-01-17T08:00:00Z',
    userId: '4',
    actionUrl: '/orders/1',
    orderId: '1'
  }
];