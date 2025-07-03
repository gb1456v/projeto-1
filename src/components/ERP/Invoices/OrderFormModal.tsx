import React, { useState, useEffect } from 'react';
import { Order, OrderLine, Client } from '../../../types/erp';
import { mockClients } from '../../../data/clientsData';
import { X, Plus, Trash2 } from 'lucide-react';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
  lastOrderNumber: number;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, onSave, lastOrderNumber }) => {
  const [clientId, setClientId] = useState('');
  const [items, setItems] = useState<OrderLine[]>([{ id: `item-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }]);

  useEffect(() => {
    if (isOpen) {
      setClientId('');
      setItems([{ id: `item-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemChange = (index: number, field: keyof OrderLine, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };
  
  const addNewItem = () => setItems([...items, { id: `item-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (id: string) => setItems(items.filter(item => item.id !== id));

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const tax = subtotal * 0.18;
    return subtotal + tax;
  };
  const total = calculateTotal();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = mockClients.find(c => c.id === clientId);
    if (!client) {
      alert("Por favor, selecione um cliente.");
      return;
    }

    const newOrder: Order = {
      id: `PED-2024-${String(lastOrderNumber + 1).padStart(3, '0')}`,
      client,
      orderDate: new Date().toISOString(),
      status: 'pendente',
      items,
      total,
      invoiceId: null,
    };
    onSave(newOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Criar Novo Pedido</h2>
            <button type="button" onClick={onClose}><X size={24} /></button>
          </div>
          <div className="p-6">
            {/* LABEL CORRIGIDA */}
            <label className="block text-sm font-bold text-black mb-2">
              Cliente
            </label>
            <select value={clientId} onChange={e => setClientId(e.target.value)} className="w-full p-2 border rounded bg-white" required>
              <option value="" disabled>Selecione um cliente</option>
              {mockClients.filter(c => c.status === 'active').map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
            </select>

            <h3 className="text-lg font-medium mt-6 mb-4">Itens do Pedido</h3>
            
            {/* LABELS DOS ITENS CORRIGIDAS */}
            <div className="grid grid-cols-12 gap-3 items-center mb-2 text-sm font-bold text-black">
                <div className="col-span-6">Descrição</div>
                <div className="col-span-2">Quantidade</div>
                <div className="col-span-3">Preço Unit. (R$)</div>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-6">
                    <input type="text" placeholder="Ex: Criação de estampa" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="w-full p-2 border rounded" required/>
                  </div>
                  <div className="col-span-2">
                    <input type="number" placeholder="Qtd" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 1)} className="w-full p-2 border rounded" min="1"/>
                  </div>
                  <div className="col-span-3">
                    <input type="number" placeholder="0.00" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded" step="0.01"/>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} className="col-span-1 text-red-500 hover:text-red-700 flex justify-center"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addNewItem} className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Plus size={18}/><span>Adicionar linha</span>
            </button>
          </div>
          <div className="p-6 bg-gray-50 rounded-b-lg">
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between font-bold text-lg text-black"><p>Total do Pedido:</p><p>R$ {total.toFixed(2).replace('.', ',')}</p></div>
              </div>
            </div>
          </div>
          <div className="p-6 flex justify-end">
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Criar Pedido</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;