import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ajuste o caminho se necessário
import { api } from "@/service/api"; 

const Login = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/painel");
    } catch {
      setErro("Usuário ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-12 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Bem-vindo!</h1>
          <p className="text-gray-500 text-sm">Acesse sua conta para continuar</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 text-sm mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a183a] transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 text-sm mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a183a] transition"
              placeholder="********"
            />
          </div>
          {erro && (
            <div className="text-red-600 text-sm text-center">{erro}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="block w-full text-center bg-[#7a183a] hover:bg-[#5a102a] text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Botão de login com Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full mt-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Entrar com Google
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">Não tem uma conta?</span>
          <Link
            to="/cadastrar"
            className="ml-1 text-[#7a183a] hover:underline font-medium text-sm"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;