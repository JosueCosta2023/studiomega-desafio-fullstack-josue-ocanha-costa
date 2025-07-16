import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="mt-[10%] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="h-12 mb-4" />
        <h1 className="text-3xl font-bold text-[#7a183a] mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Página não encontrada
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Ops! A página que você procura não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="bg-[#7a183a] hover:bg-[#5a102a] text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
