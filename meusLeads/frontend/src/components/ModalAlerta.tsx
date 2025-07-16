interface ModalAlertaProps {
  mensagem: string;
  tipo?: "sucesso" | "erro" | "info";
  onClose: () => void;
}

const ModalAlerta = ({
  mensagem,
  tipo = "info",
  onClose,
}: ModalAlertaProps) => {
  const cor =
    tipo === "sucesso"
      ? "bg-green-100 text-green-700"
      : tipo === "erro"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";
  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`rounded-xl shadow-lg p-6 w-full max-w-sm text-center relative ${cor}`}
      >
        <p className="mb-6 font-semibold">{mensagem}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-[#7a183a] text-white hover:bg-[#5a102a] font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalAlerta;
