// src/components/ERP/Invoices/InvoiceDetailView.tsx
import React from 'react';
import { Invoice } from '../../../types/erp';
import { Printer, ArrowLeft } from 'lucide-react';

interface InvoiceDetailViewProps {
  invoice: Invoice;
  onBack: () => void;
}

const InvoiceDetailView: React.FC<InvoiceDetailViewProps> = ({ invoice, onBack }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-500 hover:text-gray-800"><ArrowLeft size={18} /><span>Voltar</span></button>
        <button onClick={() => window.print()} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"><Printer size={18} /><span>Imprimir</span></button>
      </div>
      <header className="flex justify-between items-start mb-8 pb-8 border-b"><h1 className="text-3xl font-bold text-gray-800">FATURA</h1><div className="text-right"><h2 className="text-xl font-bold">JUBS Estúdio Têxtil</h2><p className="text-sm">Rua da Inovação, 123, São Paulo, SP</p></div></header>
      <section className="grid grid-cols-2 gap-8 mb-8"><div><p className="text-sm text-gray-500 mb-1">FATURADO A</p><p className="font-bold text-gray-800">{invoice.client.name}</p><p>{invoice.client.company}</p></div><div className="text-right"><p className="text-sm">Nº Fatura: <span className="font-medium">{invoice.id}</span></p><p className="text-sm">Data Emissão: <span className="font-medium">{new Date(invoice.issueDate).toLocaleDateString()}</span></p><p className="text-sm">Vencimento: <span className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</span></p></div></section>
      <table className="min-w-full mb-8"><thead><tr className="bg-gray-50"><th className="px-4 py-2 text-left text-xs font-medium uppercase">Descrição</th><th className="px-4 py-2 text-center text-xs font-medium uppercase">Qtd.</th><th className="px-4 py-2 text-right text-xs font-medium uppercase">Preço Unit.</th><th className="px-4 py-2 text-right text-xs font-medium uppercase">Total</th></tr></thead><tbody>{invoice.items.map(item => (<tr key={item.id} className="border-b"><td className="px-4 py-3">{item.description}</td><td className="px-4 py-3 text-center">{item.quantity}</td><td className="px-4 py-3 text-right">R$ {item.unitPrice.toFixed(2).replace('.', ',')}</td><td className="px-4 py-3 text-right">R$ {(item.quantity * item.unitPrice).toFixed(2).replace('.', ',')}</td></tr>))}</tbody></table>
      <footer className="flex justify-end"><div className="w-full max-w-sm space-y-3"><div className="flex justify-between"><span>Subtotal</span><span>R$ {invoice.subtotal.toFixed(2).replace('.', ',')}</span></div><div className="flex justify-between"><span>Impostos</span><span>R$ {invoice.tax.toFixed(2).replace('.', ',')}</span></div><div className="flex justify-between font-bold text-xl border-t pt-3 mt-3"><span>Total a Pagar</span><span>R$ {invoice.total.toFixed(2).replace('.', ',')}</span></div></div></footer>
    </div>
  );
};

export default InvoiceDetailView;