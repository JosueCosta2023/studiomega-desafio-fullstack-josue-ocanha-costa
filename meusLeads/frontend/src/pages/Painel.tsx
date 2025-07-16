/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut, Settings, Table } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Painel = () => {

  const token = localStorage.getItem("token");
  let user: any = null;

  if(token){
    try {
      user = jwtDecode(token)
    } catch {
      user = null
    }
  }

   console.log(user)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload();
  }

  const nome = user.name.split(" ");
    
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="Logo" className="h-7" />
          <span className="font-bold text-lg">
            L<span className="text-[#7a183a]">e</span>a
            <span className="text-[#7a183a]">d</span>'s
          </span>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/painel"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 font-semibold rounded-lg px-3 py-2 transition ${
                    isActive
                      ? "bg-[#f8e9f0] text-[#7a183a]"
                      : "text-gray-700 hover:text-[#7a183a]"
                  }`
                }
              >
                <Table size={18}/> Tabela
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/painel/configuracao"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                    isActive
                      ? "bg-[#f8e9f0] text-[#7a183a] font-semibold"
                      : "text-gray-700 hover:text-[#7a183a]"
                  }`
                }
              >
                <Settings size={18}/> Configurações
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="text-gray-500 flex gap-2 hover:text-[#7a183a] text-sm transition-colors"
          >
            Sair
            <LogOut size={18}/>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-8 py-6 border-b">
          <div>
            <span className="text-gray-500 text-sm">
              Olá, <span className="text-primary font-bold">{nome[0] || "usuario"}</span>, seja bem-vindo.
            </span> <br />
            <i className="text-xs text-gray-600 opacity-35 flex">{user?.email}</i>
          </div>
          <div>
                
            <img
              src={user?.picture || "https://randomuser.me/api/portraits/lego/5.jpg"}
              alt="Avatar"
              className="h-9 w-9 rounded-full border"
            />
          </div>
        </header>

        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Painel;
