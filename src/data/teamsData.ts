// src/data/teamsData.ts
import { Team } from '../types/erp'; // CAMINHO CORRIGIDO
import { mockUser } from './mockData';

// Vamos usar os novos utilizadores para montar as equipas
const { 
  admin, 
  designLead, 
  designer, 
  marketingLead, 
  marketingAnalyst, 
  productionLead, 
  productionOperator 
} = mockUser;

export const mockTeams: Team[] = [
  {
    id: 'team-design-01',
    name: 'Equipa de Design',
    description: 'Responsável pela criação de todas as artes, estampas e conceitos visuais dos produtos.',
    leaderId: designLead.id, // Carla Vianna é a líder
    members: [designLead, designer, admin], // A admin (Júlia) também participa aqui
    createdAt: '2023-01-20T10:00:00Z',
  },
  {
    id: 'team-marketing-02',
    name: 'Equipa de Marketing',
    description: 'Focada na promoção da marca, campanhas digitais e comunicação com o mercado.',
    leaderId: marketingLead.id, // Fernanda Lima é a líder
    members: [marketingLead, marketingAnalyst],
    createdAt: '2023-02-15T14:30:00Z',
  },
  {
    id: 'team-production-03',
    name: 'Equipa de Produção',
    description: 'Garante a qualidade e a execução de todas as peças, do corte à finalização.',
    leaderId: productionLead.id, // Roberto Souza é o líder
    members: [productionLead, productionOperator],
    createdAt: '2023-03-10T09:00:00Z',
  },
];