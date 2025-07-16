import React from "react";

interface ModalConfirmacaoProps {
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirmacao = ({
  mensagem,
  onConfirm,
  onCancel,
}: ModalConfirmacaoProps) => {
  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center relative">
        <h3 className="text-lg font-bold mb-4 text-[#7a183a]">Confirmação</h3>
        <p className="mb-6 text-gray-700">{mensagem}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
