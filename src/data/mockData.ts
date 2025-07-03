// src/data/mockData.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member' | 'client';
  department: string;
  avatar: string;
}

export const mockUser: Record<string, User> = {
  // --- Utilizadores Existentes ---
  admin: {
    id: 1,
    name: 'Júlia Sampaio', // Admin
    email: 'julia.sampaio@jubs.com',
    role: 'admin',
    department: 'Diretoria',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  manager: {
    id: 2,
    name: 'Ricardo Mendes', // Gerente
    email: 'ricardo.mendes@jubs.com',
    role: 'manager',
    department: 'Comercial',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  // --- Novos Utilizadores para as Equipas ---
  designLead: {
    id: 3,
    name: 'Carla Vianna',
    email: 'carla.vianna@jubs.com',
    role: 'manager', // Líder de equipa
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  designer: {
    id: 4,
    name: 'Lucas Martins',
    email: 'lucas.martins@jubs.com',
    role: 'member',
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  marketingLead: {
    id: 5,
    name: 'Fernanda Lima',
    email: 'fernanda.lima@jubs.com',
    role: 'manager', // Líder de equipa
    department: 'Marketing',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  marketingAnalyst: {
    id: 6,
    name: 'Gustavo Oliveira',
    email: 'gustavo.oliveira@jubs.com',
    role: 'member',
    department: 'Marketing',
    avatar: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  productionLead: {
    id: 7,
    name: 'Roberto Souza',
    email: 'roberto.souza@jubs.com',
    role: 'manager', // Líder de equipa
    department: 'Produção',
    avatar: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  productionOperator: {
    id: 8,
    name: 'Mariana Costa',
    email: 'mariana.costa@jubs.com',
    role: 'member',
    department: 'Produção',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
};