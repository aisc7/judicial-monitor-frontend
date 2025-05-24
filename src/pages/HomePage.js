import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const handleConsultClick = () => {
    console.log("Botón 'Consultar Procesos' clickeado");
  };

  const handleLoginClick = () => {
    console.log("Botón 'Iniciar Sesión' clickeado");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Encabezado */}
      <header className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center"></div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Bienvenido al Sistema de Monitoreo Judicial
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Plataforma oficial para el seguimiento y consulta de procesos
              judiciales de la República de Colombia.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
                onClick={handleConsultClick}
              >
                Consultar Procesos
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-blue-800 border-2 border-blue-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
                onClick={handleLoginClick}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Rama Judicial de Colombia. Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;