import { useState } from "react";

interface LeadData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

interface FormularioLeadsProps {
  onSubmit: (data: LeadData) => void;
  onClose: () => void;
  initialData?: LeadData;
  editar?: boolean;
}

const FormularioLeads = ({
  onSubmit,
  onClose,
  initialData = {nome: "", email: "", telefone: "", mensagem: ""},
  editar
}: FormularioLeadsProps) => {
  const [nome, setNome] = useState(initialData.nome || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [telefone, setTelefone] = useState(initialData.telefone || "");
  const [mensagem, setMensagem] = useState(initialData.mensagem || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, email, telefone, mensagem });
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#7a183a] text-xl font-bold"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#7a183a] mb-6 text-center">
          {editar ? "Editar Lead" : "Novo Lead"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-left text-gray-700 text-sm mb-1"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              id="nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a183a] transition"
              placeholder="Nome completo"
            />
          </div>
          <div>
            <label
              className="block text-left text-gray-700 text-sm mb-1"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a183a] transition"
              placeholder="email@exemplo.com"
            />
          </div>
          <div>
            <label
              className="block text-left text-gray-700 text-sm mb-1"
              htmlFor="telefone"
            >
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a183a] transition"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <label
              className="block text-left text-gray-700 text-sm mb-1"
              htmlFor="mensagem"
            >
              Mensagem
            </label>
            <textarea
              id="mensagem"
              required
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a183a] transition resize-none"
              placeholder="Digite a mensagem"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#7a183a] hover:bg-[#5a102a] text-white font-semibold py-2 rounded-lg transition"
          >
            {editar ? "Salvar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioLeads;
