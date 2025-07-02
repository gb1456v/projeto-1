export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
  spent: number;
  teamMembers: string[];
  clientId?: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string[];
  projectId?: string;
  parentTaskId?: string;
  subtasks: string[];
  startDate?: string;
  dueDate?: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: Attachment[];
  comments: Comment[];
  dependencies: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  mentions: string[];
  attachments: Attachment[];
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description: string;
  hours: number;
  date: string;
  billable: boolean;
  hourlyRate?: number;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  document: string;
  type: 'individual' | 'company';
  status: 'active' | 'inactive';
  totalProjects: number;
  totalRevenue: number;
  createdAt: string;
  lastContactDate?: string;
  notes: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  projectId?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  notes?: string;
  paymentMethod?: string;
  createdBy: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxRate: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  projectId?: string;
  receipt?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  approvedBy?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'project' | 'time' | 'financial' | 'productivity';
  filters: ReportFilters;
  data: any;
  generatedBy: string;
  generatedAt: string;
}

export interface ReportFilters {
  dateRange: {
    start: string;
    end: string;
  };
  projects?: string[];
  users?: string[];
  clients?: string[];
  status?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  userId: string;
  actionUrl?: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  leaderId: string;
  projects: string[];
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  teams: string[];
  projects: string[];
  settings: WorkspaceSettings;
  createdBy: string;
  createdAt: string;
}

export interface WorkspaceSettings {
  timeTracking: boolean;
  budgetTracking: boolean;
  clientAccess: boolean;
  customFields: CustomField[];
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox';
  options?: string[];
  required: boolean;
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

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member' | 'client';
  department: string;
  hourlyRate?: number;
  permissions: string[];
  teams: string[];
  workspaces: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Dashboard {
  id: string;
  name: string;
  widgets: Widget[];
  layout: LayoutItem[];
  isDefault: boolean;
  userId: string;
  createdAt: string;
}

export interface Widget {
  id: string;
  type: 'tasks' | 'projects' | 'time' | 'revenue' | 'calendar' | 'chart';
  title: string;
  config: any;
  size: 'small' | 'medium' | 'large';
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}