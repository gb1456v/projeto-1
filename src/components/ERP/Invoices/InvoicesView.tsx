// src/components/ERP/Invoices/InvoicesView.tsx
import React, { useState, useMemo } from 'react';
import { Invoice, InvoiceStatus, Order } from '../../../types/erp';
import { mockInvoices } from '../../../data/invoicesData';
import { mockOrders } from '../../../data/ordersData';
import InvoiceDetailView from './InvoiceDetailView';
import OrderFormModal from './OrderFormModal';
import { Plus, FileText, Send } from 'lucide-react';

const InvoiceStatusBadge = ({ status }: { status: InvoiceStatus }) => {
  const map: Record<InvoiceStatus, { label: string; color: string }> = {
    nao_paga: { label: 'Não Paga', color: 'bg-yellow-100 text-yellow-800' },
    paga: { label: 'Paga', color: 'bg-green-100 text-green-800' },
    atrasada: { label: 'Atrasada', color: 'bg-orange-100 text-orange-800' },
    anulada: { label: 'Anulada', color: 'bg-red-100 text-red-800' },
  };
  const { label, color } = map[status];
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${color}`}>{label}</span>;
};

const InvoicesView = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);

  const lastOrderNumber = useMemo(() => {
    if (orders.length === 0) return 0;
    const sorted = [...orders].sort((a,b) => parseInt(b.id.split('-')[2]) - parseInt(a.id.split('-')[2]));
    return parseInt(sorted[0].id.split('-')[2], 10);
  }, [orders]);

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
      orderId: order.id,
      client: order.client,
      issueDate: new Date().toISOString(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
      status: 'nao_paga',
      items: order.items, subtotal, tax, total,
    };
    
    setInvoices(prev => [newInvoice, ...prev]);
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, invoiceId: newInvoice.id, status: 'concluido' } : o));
    alert(`Fatura ${newInvoice.id} gerada para o pedido ${order.id}!`);
  };
  
  if (selectedInvoice) {
    return <InvoiceDetailView invoice={selectedInvoice} onBack={() => setSelectedInvoice(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Pedidos & Faturas</h1>
        <button onClick={() => setOrderFormOpen(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"><Plus size={20} /><span>Novo Pedido</span></button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Pedidos para Faturar</h2>
        {orders.filter(o => !o.invoiceId).map(order => (
          <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"><p><span className="font-bold">{order.id}</span> - {order.client.name}</p><button onClick={() => handleGenerateInvoice(order)} className="flex items-center space-x-2 text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"><Send size={14}/><span>Gerar Fatura</span></button></div>
        ))}
        {orders.filter(o => !o.invoiceId).length === 0 && <p className="text-sm text-gray-500">Não há pedidos pendentes de faturação.</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Faturas Emitidas</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead><tr><th className="px-4 py-2 text-left text-xs font-medium uppercase">Fatura</th><th className="px-4 py-2 text-left text-xs font-medium uppercase">Cliente</th><th className="px-4 py-2 text-left text-xs font-medium uppercase">Emissão</th><th className="px-4 py-2 text-left text-xs font-medium uppercase">Status</th><th className="px-4 py-2 text-right text-xs font-medium uppercase">Total</th><th className="px-4 py-2 text-right text-xs font-medium uppercase">Ações</th></tr></thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td className="px-4 py-2 font-mono">{invoice.id}</td><td className="px-4 py-2">{invoice.client.name}</td><td className="px-4 py-2">{new Date(invoice.issueDate).toLocaleDateString()}</td><td className="px-4 py-2"><InvoiceStatusBadge status={invoice.status} /></td><td className="px-4 py-2 text-right font-medium">R$ {invoice.total.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-2 text-right"><button onClick={() => setSelectedInvoice(invoice)} className="text-blue-600 hover:text-blue-900"><FileText size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <OrderFormModal isOpen={isOrderFormOpen} onClose={() => setOrderFormOpen(false)} onSave={handleSaveOrder} lastOrderNumber={lastOrderNumber} />
    </div>
  );
};

export default InvoicesView;