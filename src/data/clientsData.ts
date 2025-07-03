// src/data/clientsData.ts
import { Client } from '../types/client';

export const mockClients: Client[] = [
  {
    id: 'cli-001',
    name: 'Ana Silva',
    email: 'ana.silva@example.com',
    phone: '(11) 98765-4321',
    company: 'Silva & Filhos Ltda.',
    status: 'active',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'cli-002',
    name: 'Bruno Costa',
    email: 'bruno.costa@example.com',
    phone: '(21) 91234-5678',
    company: 'Costa Tech Solutions',
    status: 'active',
    createdAt: '2023-03-22T14:30:00Z',
  },
  {
    id: 'cli-003',
    name: 'Carla Dias',
    email: 'carla.dias@example.com',
    phone: '(31) 95555-8888',
    company: 'Design Criativo',
    status: 'inactive',
    createdAt: '2022-11-10T09:00:00Z',
  },
  {
    id: 'cli-004',
    name: 'Daniel Martins',
    email: 'daniel.martins@lead.com',
    phone: '(41) 97777-1111',
    company: 'Martins & Cia',
    status: 'lead',
    createdAt: '2023-05-20T11:45:00Z',
  },
];