import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import FormularioLeads from "./FormularioLeads";
import ModalConfirmacao from "./ModalConfirmacao";
import ModalAlerta from "./ModalAlerta";

const initialLeads = [
  {
    id: 1,
    nome: "Karen Flores",
    telefone: "(11) 99999-9999",
    email: "karen@email.com",
    mensagem: "Nao estou disponivel",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    nome: "Paulo Victor",
    telefone: "(21) 98888-8888",
    email: "paulo@email.com",
    mensagem: "Estou disponivel",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const TableLeads = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [modalNovoLead, setModalNovoLead] = useState(false);
  const [modalEditarLead, setModalEditarLead] = useState<null | number>(null);
  const [modalExcluirLead, setModalExcluirLead] = useState<null | number>(null);
  const [modalAlerta, setModalAlerta] = useState<{
    mensagem: string;
    tipo?: "sucesso" | "erro";
  } | null>(null);

  // Funções para abrir modais
  const handleNovoLead = () => setModalNovoLead(true);
  const handleEdit = (id: number) => setModalEditarLead(id);
  const handleDelete = (id: number) => setModalExcluirLead(id);

  // Fechar modais
  const handleFecharModalNovo = () => setModalNovoLead(false);
  const handleFecharModalEditar = () => setModalEditarLead(null);
  const handleFecharModalExcluir = () => setModalExcluirLead(null);
  const handleFecharModalAlerta = () => setModalAlerta(null);

  // Submissão de lead novo
  const handleSubmitLead = (data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
  }) => {
    setLeads((prevLeads) => [
      ...prevLeads,
      {
        id: prevLeads.length > 0 ? prevLeads[prevLeads.length - 1].id + 1 : 1,
        ...data,
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // default avatar
      },
    ]);
    setModalNovoLead(false);
    setModalAlerta({
      mensagem: "Lead cadastrado com sucesso!",
      tipo: "sucesso",
    });
  };

  // Submissão de edição
  const handleSubmitEditarLead = (data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
  }) => {
    if (modalEditarLead !== null) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === modalEditarLead
            ? { ...lead, ...data }
            : lead
        )
      );
    }
    setModalEditarLead(null);
    setModalAlerta({
      mensagem: "Lead atualizado com sucesso!",
      tipo: "sucesso",
    });
  };

  // Confirmação de exclusão
  const handleConfirmarExcluir = () => {
    // Aqui você pode adicionar a lógica para excluir o lead
    setModalExcluirLead(null);
    setModalAlerta({ mensagem: "Lead excluído com sucesso!", tipo: "sucesso" });
  };

  return (
    <>
      <section className="flex-1 p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Meus Leads{" "}
            <span className="text-gray-400 text-base">({leads.length})</span>
          </h2>
          <button
            onClick={handleNovoLead}
            className="bg-[#7a183a] hover:bg-[#5a102a] text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            + Novo Lead
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-[#7a183a] text-white">
                <th className="px-6 py-3 font-semibold">Nome</th>
                <th className="px-6 py-3 font-semibold">Telefone</th>
                <th className="px-6 py-3 font-semibold">E-mail</th>
                <th className="px-6 py-3 font-semibold">Mensagem</th>
                <th className="px-6 py-3 font-semibold">Açoes</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 flex items-center gap-2">
                    <img
                      src={lead.avatar}
                      alt={lead.nome}
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{lead.nome}</span>
                  </td>
                  <td className="px-6 py-4">{lead.telefone}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{lead.mensagem}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(lead.id)}
                        className="p-2 rounded hover:bg-gray-100 text-[#7a183a]"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 rounded hover:bg-gray-100 text-red-600"
                        title="Deletar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginação simples */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <button className="px-3 py-1 rounded hover:bg-gray-200">
            Anterior
          </button>
          <span>Página 1 de 1</span>
          <button className="px-3 py-1 rounded hover:bg-gray-200">
            Próxima
          </button>
        </div>
      </section>

      {/* Modal para novo lead */}
      {modalNovoLead && (
        <FormularioLeads
          onSubmit={handleSubmitLead}
          onClose={handleFecharModalNovo}
        />
      )}

      {/* Modal para editar lead */}
      {modalEditarLead !== null && (
        <FormularioLeads
          initialData={leads.find((l) => l.id === modalEditarLead)}
          onSubmit={handleSubmitEditarLead}
          onClose={handleFecharModalEditar}
        />
      )}

      {/* Modal de confirmação de exclusão */}
      {modalExcluirLead !== null && (
        <ModalConfirmacao
          mensagem="Tem certeza que deseja excluir este lead?"
          onConfirm={handleConfirmarExcluir}
          onCancel={handleFecharModalExcluir}
        />
      )}

      {/* Modal de alerta */}
      {modalAlerta && (
        <ModalAlerta
          mensagem={modalAlerta.mensagem}
          tipo={modalAlerta.tipo}
          onClose={handleFecharModalAlerta}
        />
      )}
    </>
  );
};

export default TableLeads;
