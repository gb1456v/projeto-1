export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'comercial' | 'producao' | 'designer';
  avatar?: string;
  department: 'comercial' | 'producao' | 'design' | 'admin';
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  image: string;
  rating: number;
  description: string;
  stock: number;
  minStock: number;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientDocument: string;
  productId: string;
  productName: string;
  customization: string;
  designBrief: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'novo_pedido' | 'aprovado_comercial' | 'em_design' | 'design_aprovado' | 'em_producao' | 'producao_concluida' | 'aprovacao_final' | 'pronto_entrega' | 'entregue' | 'faturado';
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  assignedTo?: string;
  designerId?: string;
  notes: string;
  internalNotes: string;
  tags: string[];
  attachments: Attachment[];
  designFiles: DesignFile[];
  timeTracked: number;
  estimatedTime: number;
  workflow: WorkflowStep[];
  invoiceGenerated: boolean;
  invoiceNumber?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface DesignFile {
  id: string;
  name: string;
  url: string;
  version: number;
  status: 'em_andamento' | 'aprovado' | 'rejeitado';
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  comments: string;
}

export interface WorkflowStep {
  id: string;
  step: string;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'rejeitado';
  assignedTo?: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  timeSpent?: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  document: string;
  type: 'pessoa_fisica' | 'pessoa_juridica';
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  clientId: string;
  clientName: string;
  clientDocument: string;
  clientAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  taxes: number;
  total: number;
  status: 'rascunho' | 'emitida' | 'enviada' | 'paga' | 'cancelada';
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
  notes?: string;
}

export interface InvoiceItem {
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'design' | 'producao' | 'comercial' | 'geral';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  orderId?: string;
  timeTracked: number;
  estimatedTime: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  userId: string;
  actionUrl?: string;
  orderId?: string;
}

export interface OrderStatus {
  key: 'novo_pedido' | 'aprovado_comercial' | 'em_design' | 'design_aprovado' | 'em_producao' | 'producao_concluida' | 'aprovacao_final' | 'pronto_entrega' | 'entregue' | 'faturado';
  label: string;
  color: string;
  bgColor: string;
  department: 'comercial' | 'design' | 'producao' | 'comercial';
}

export interface Priority {
  key: 'baixa' | 'media' | 'alta' | 'urgente';
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type ViewMode = 'list' | 'board' | 'calendar' | 'gantt';

export interface FilterOptions {
  status: string[];
  priority: string[];
  assignedTo: string[];
  department: string[];
  dateRange: {
    start?: string;
    end?: string;
  };
  tags: string[];
}

export interface DashboardStats {
  orders: {
    total: number;
    newOrders: number;
    inProgress: number;
    completed: number;
    overdue: number;
  };
  financial: {
    revenue: number;
    pending: number;
    invoiced: number;
  };
  production: {
    inDesign: number;
    inProduction: number;
    readyForDelivery: number;
  };
  users: {
    total: number;
    active: number;
  };
}