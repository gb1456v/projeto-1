// src/types/erp.ts

// --- Tipos Existentes (sem alterações) ---
export interface User { id: number; name: string; email: string; role: 'admin' | 'manager' | 'member' | 'client'; department: string; avatar: string; }
export interface Client { id: string; name: string; email: string; phone: string; company: string; status: 'active' | 'inactive' | 'lead'; createdAt: string; }
export interface TeamMember extends User {}
export interface Team { id: string; name: string; description: string; leaderId: number; members: TeamMember[]; createdAt: string; }
export interface Project { id: string; name: string; clientCompany: string; }
export interface Note { id: string; content: string; author: User; createdAt: string; }
export type TaskStatus = 'backlog' | 'todo' | 'inprogress' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export interface Task { id: string; title: string; description?: string; status: TaskStatus; priority: TaskPriority; assignees: User[]; project: Project; dueDate?: string; notes?: Note[]; }

// --- ESTRUTURAS ATUALIZADAS E NOVAS ---

export interface OrderLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'pendente' | 'em_producao' | 'concluido' | 'cancelado';
export type InvoiceStatus = 'nao_paga' | 'paga' | 'atrasada' | 'anulada';

// Pedido agora tem uma referência para a Fatura
export interface Order {
  id: string; // Ex: "PED-2024-001"
  client: Client;
  orderDate: string;
  status: OrderStatus;
  items: OrderLine[];
  total: number;
  invoiceId: string | null; // ID da fatura associada
}

// Nova estrutura para a Fatura
export interface Invoice {
  id: string; // Ex: "FAT-2024-001"
  orderId: string;
  client: Client;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: OrderLine[];
  subtotal: number;
  tax: number; // Valor do imposto
  total: number;
}