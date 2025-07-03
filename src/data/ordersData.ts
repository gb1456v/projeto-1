// src/data/ordersData.ts
import { Order } from '../types/erp';
import { mockClients } from './clientsData';

export const mockOrders: Order[] = [
  {
    id: 'PED-2024-001',
    client: mockClients[0],
    orderDate: '2024-06-15T10:00:00Z',
    status: 'concluido',
    items: [
      { id: 'item-1', description: 'Criação de Estampa Exclusiva', quantity: 1, unitPrice: 1200 },
      { id: 'item-2', description: 'Impressão em Tecido (10m)', quantity: 10, unitPrice: 45 },
    ],
    total: 2029.50,
    invoiceId: 'FAT-2024-001', // Aponta para a fatura
  },
  {
    id: 'PED-2024-002',
    client: mockClients[1],
    orderDate: '2024-06-28T14:30:00Z',
    status: 'em_producao',
    items: [
      { id: 'item-3', description: 'Consultoria de Design Têxtil', quantity: 5, unitPrice: 150 },
    ],
    total: 922.50,
    invoiceId: 'FAT-2024-002', // Aponta para a fatura
  },
    {
    id: 'PED-2024-003',
    client: mockClients[0],
    orderDate: '2024-07-01T11:00:00Z',
    status: 'pendente',
    items: [
      { id: 'item-4', description: 'Ajuste de Cores em Coleção', quantity: 1, unitPrice: 300 },
    ],
    total: 369.00,
    invoiceId: null, // Ainda não tem fatura
  },
];  