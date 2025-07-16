import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import FormularioLeads from "./FormularioLeads";
import ModalConfirmacao from "./ModalConfirmacao";
import ModalAlerta from "./ModalAlerta";
import {useLeads} from "../hooks/useLeads"
import axios from "axios"

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

const TableLeads = () => {
  const {leads, setLeads, loading} = useLeads();
  const [leadEditando, setLeadEditando] = useState<Lead | null>(null);
  const [modalNovoLead, setModalNovoLead] = useState(false);
  const [modalEditarLead, setModalEditarLead] = useState<null | number>(null);
  const [modalExcluirLead, setModalExcluirLead] = useState<null | number>(null);
  const [modalAlerta, setModalAlerta] = useState<{
    mensagem: string;
    tipo?: "sucesso" | "erro";
  } | null>(null);

  // Funções para abrir modais
  const handleNovoLead = () => setModalNovoLead(true);
  const handleDelete = (id: number) => setModalExcluirLead(id);

  // Fechar modais
  const handleFecharModalNovo = () => setModalNovoLead(false);
  const handleFecharModalEditar = () => {
    setModalEditarLead(null)
    setLeadEditando(null)
  };
  const handleFecharModalExcluir = () => setModalExcluirLead(null);
  const handleFecharModalAlerta = () => setModalAlerta(null);

  // Submissão de lead novo
  const handleSubmitLead = async (data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
  }) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:3001/api/leads", {
          name: data.nome,
          email: data.email,
          phone: data.telefone,
          message: data.mensagem
        }, {
          headers: { Authorization: `Bearer ${token}`}
        }
      )

      console.log(response)

      setLeads((prevLeads)=> [...prevLeads, response.data.lead])
      setModalNovoLead(false);
      setModalAlerta({
        mensagem: "Lead cadastrado com sucesso",
        tipo: "sucesso"
      })
      
    } catch (error) {
      setModalAlerta({
        mensagem: `Erro ao cadastrar lead! ${error}`,
        tipo: "erro"
      })
    }
  };

  const handleEdit = (id: number) => {
    const lead = leads.find((lead) => lead.id === id )
    setLeadEditando(lead)
    setModalEditarLead(id)
  }

  // Submissão de edição
  const handleSubmitEditarLead = async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    if(!leadEditando) return;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/api/leads/${leadEditando.id}`,
        {
          name: data.nome,
          email: data.email,
          phone: data.telefone,
          message: data.mensagem
        },
        {
          headers: {Authorization: `Baerer ${token}`}
        }
      )
      setModalEditarLead(null)
      setLeadEditando(null)
      setLeads((prevLeads) => 
        prevLeads.map((lead) => 
          lead.id === leadEditando.id 
          ? {
          ...lead,
          name: data.nome,
          email: data.email,
          phone: data.telefone,
          message: data.mensagem,
        } 
          : lead) 
      )


      setModalAlerta({
        mensagem: "Lead atualizado com sucesso!",
        tipo: "sucesso"
      })
 
    } catch (error) {
      setModalAlerta({
        mensagem: `Erro ao atualizar Lead ${error}`,
        tipo: "erro"
      })
    }
  };



  // Confirmação de exclusão
  const handleConfirmarExcluir = () => {
    if(modalExluirLead !== null){
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== modalExcluirLead ))
    }
    setModalExcluirLead(null);
    setModalAlerta({ mensagem: "Lead excluído com sucesso!", tipo: "sucesso" });
  };

  if(loading){
    return
    <div classname="p-8">Carregando...</div>
  }

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
                  key={lead?.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 flex items-center gap-2">
                    <span>{lead?.name || lead?.nome || ""}</span>
                  </td>
                  <td className="px-6 py-4">{lead?.phone}</td>
                  <td className="px-6 py-4">{lead?.email}</td>
                  <td className="px-6 py-4">{(!lead?.message || lead?.message.length === 0) ? "Sem comentários" : lead?.message}</td>
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
      {modalEditarLead !== null && leadEditando && (
        <FormularioLeads
          initialData={{
            nome: leadEditando.name || "",
            email: leadEditando.email || "",
            telefone: leadEditando.phone || "",
            mensagem: leadEditando.message || "",
          }}
          onSubmit={handleSubmitEditarLead}
          onClose={handleFecharModalEditar}
          editar
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
