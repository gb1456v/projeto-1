// src/data/invoicesData.ts
import { Invoice } from '../types/erp';
import { mockClients } from './clientsData';

export const mockInvoices: Invoice[] = [
  {
    id: 'FAT-2024-001',
    orderId: 'PED-2024-001',
    client: mockClients[0],
    issueDate: '2024-06-16T10:00:00Z',
    dueDate: '2024-07-16T10:00:00Z',
    status: 'paga',
    items: [{ id: 'item-1', description: 'Criação de Estampa Exclusiva', quantity: 1, unitPrice: 1200 }, { id: 'item-2', description: 'Impressão em Tecido (10m)', quantity: 10, unitPrice: 45 }],
    subtotal: 1650,
    tax: 379.50, // 23% de 1650
    total: 2029.50,
  },
  {
    id: 'FAT-2024-002',
    orderId: 'PED-2024-002',
    client: mockClients[1],
    issueDate: '2024-06-29T14:30:00Z',
    dueDate: '2024-07-29T14:30:00Z',
    status: 'nao_paga',
    items: [{ id: 'item-3', description: 'Consultoria de Design Têxtil', quantity: 5, unitPrice: 150 }],
    subtotal: 750,
    tax: 172.50, // 23% de 750
    total: 922.50,
  }
];