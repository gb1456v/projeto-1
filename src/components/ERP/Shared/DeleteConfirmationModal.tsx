// src/components/ERP/Shared/DeleteConfirmationModal.tsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Excluir Item
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Tem a certeza de que deseja excluir <strong>{itemName}</strong>?
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-500 my-4">
          Esta ação não pode ser desfeita. Todos os dados associados a este item serão permanentemente removidos.
        </p>
        <div className="mt-5 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
            onClick={onConfirm}
          >
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;