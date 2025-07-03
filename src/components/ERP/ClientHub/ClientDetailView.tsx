import React, { useState } from 'react';
import { Client, Order, Invoice } from '../../../types/erp';
import { mockOrders } from '../../../data/ordersData';
import { mockInvoices } from '../../../data/invoicesData';
import OrderFormModal from '../Invoices/OrderFormModal';
import InvoiceDetailView from '../Invoices/InvoiceDetailView';
import { ArrowLeft, Plus, DollarSign, ShoppingCart, FileText } from 'lucide-react';

interface ClientDetailViewProps {
  client: Client;
  onBack: () => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ client, onBack }) => {
  const [orders, setOrders] = useState(() => mockOrders.filter(o => o.client.id === client.id));
  const [invoices, setInvoices] = useState(() => mockInvoices.filter(i => i.client.id === client.id));
  
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleSaveOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setOrderFormOpen(false);
  };
  
  const handleGenerateInvoice = (order: Order) => {
    if (order.invoiceId) { alert("Este pedido já tem uma fatura."); return; }
    
    const subtotal = order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const newInvoice: Invoice = {
      id: `FAT-2024-${String(invoices.length + 10).padStart(3, '0')}`,
      orderId: order.id, client, issueDate: new Date().toISOString(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
      status: 'nao_paga', items: order.items, subtotal, tax, total,
    };
    
    setInvoices(prev => [newInvoice, ...prev]);
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, invoiceId: newInvoice.id, status: 'concluido' } : o));
    alert(`Fatura ${newInvoice.id} gerada!`);
  };

  // Se uma fatura for selecionada, mostra apenas a fatura
  if (selectedInvoice) {
    return <InvoiceDetailView invoice={selectedInvoice} onBack={() => setSelectedInvoice(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-500 hover:text-gray-800">
          <ArrowLeft size={18} />
          <span>Todos os Clientes</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{client.name}</h1>
        <p className="text-lg text-gray-600">{client.company}</p>
      </div>
      
      {/* Secção de Pedidos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center"><ShoppingCart className="mr-2" size={22}/> Pedidos</h2>
          <button onClick={() => setOrderFormOpen(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
            <Plus size={16} /><span>Novo Pedido</span>
          </button>
        </div>
        {orders.map(order => (
          <div key={order.id} className="flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold">{order.id} <span className="text-xs font-normal bg-gray-200 px-2 py-0.5 rounded-full ml-2">{order.status}</span></p>
              <p className="text-sm">Data: {new Date(order.orderDate).toLocaleDateString()} - Total: R$ {order.total.toFixed(2).replace('.', ',')}</p>
            </div>
            {!order.invoiceId && <button onClick={() => handleGenerateInvoice(order)} className="text-sm text-green-600 hover:underline">Gerar Fatura</button>}
          </div>
        ))}
        {orders.length === 0 && <p className="text-sm text-gray-500">Nenhum pedido para este cliente.</p>}
      </div>

      {/* Secção de Faturas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center"><DollarSign className="mr-2" size={22}/> Faturas</h2>
        {invoices.map(invoice => (
          <div key={invoice.id} className="flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold">{invoice.id} <span className="text-xs font-normal bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-2">{invoice.status}</span></p>
              <p className="text-sm">Vencimento: {new Date(invoice.dueDate).toLocaleDateString()} - Total: R$ {invoice.total.toFixed(2).replace('.', ',')}</p>
            </div>
            <button onClick={() => setSelectedInvoice(invoice)} className="text-sm text-blue-600 hover:underline">Ver Detalhes</button>
          </div>
        ))}
         {invoices.length === 0 && <p className="text-sm text-gray-500">Nenhuma fatura para este cliente.</p>}
      </div>

      <OrderFormModal
        isOpen={isOrderFormOpen}
        onClose={() => setOrderFormOpen(false)}
        onSave={handleSaveOrder}
        lastOrderNumber={mockOrders.length} // Simplificação para mock data
      />
    </div>
  );
};

export default ClientDetailView;