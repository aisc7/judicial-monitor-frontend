import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Encabezado */}
      <header className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-8-6h16" />
            </svg>
            <h1 className="text-2xl font-bold">Monitor Judicial</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Sección de bienvenida */}
          <div className="flex flex-col md:flex-row items-center md:space-x-12 mb-16">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
              <div className="relative w-64 h-64">
                {/* Escudo de Colombia */}
                <img 
                  src="/escudo-colombia.png" 
                  alt="Escudo de Colombia" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3cpath fill='%23FCD116' d='M0,0 L100,0 L100,100 L0,100 Z'/%3e%3cpath fill='%23003893' d='M0,50 L100,50 L100,100 L0,100 Z'/%3e%3cpath fill='%23CE1126' d='M0,75 L100,75 L100,100 L0,100 Z'/%3e%3c/svg%3e";
                    // Fallback simple a colores de la bandera colombiana
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Bienvenido al Sistema de Monitoreo Judicial
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Plataforma oficial para el seguimiento y consulta de procesos judiciales de la República de Colombia
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link 
                  to="/login" 
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
                >
                  Consultar Procesos
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white hover:bg-gray-100 text-blue-800 border-2 border-blue-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>

          {/* Sección de información */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl text-blue-800 mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Consulta tu Proceso</h3>
              <p className="text-gray-600">
                Accede a la información actualizada de tus procesos judiciales con solo ingresar tu número de documento o radicado.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl text-blue-800 mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ahorra Tiempo</h3>
              <p className="text-gray-600">
                Evita desplazamientos y filas innecesarias consultando el estado de tus procesos desde cualquier lugar.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl text-blue-800 mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Información Segura</h3>
              <p className="text-gray-600">
                Acceso seguro y confiable a la información judicial actualizada de la Rama Judicial de Colombia.
              </p>
            </div>
          </div>

          {/* Sección de guía de uso */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Cómo consultar su proceso judicial?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold mb-2">Ingrese sus datos</h3>
                <p className="text-gray-600">
                  Acceda con su número de cédula o el número de radicado de su proceso.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold mb-2">Consulte su proceso</h3>
                <p className="text-gray-600">
                  Visualice toda la información actualizada de sus procesos judiciales.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold mb-2">Reciba actualizaciones</h3>
                <p className="text-gray-600">
                  Manténgase informado sobre los avances y próximas fechas importantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Monitor Judicial</h4>
              <p className="text-gray-400">
                Sistema oficial de seguimiento de procesos judiciales de la República de Colombia.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Enlaces útiles</h4>
              <ul className="space-y-2">
                {/* <li><a href="#" className="text-gray-400 hover:text-white">Preguntas frecuentes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Términos y condiciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de privacidad</a></li> */}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contacto</h4>
              <p className="text-gray-400">
                Línea de atención: 01 8000 123 456<br />
                Email: soporte@monitorjudicial.gov.co
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Rama Judicial de Colombia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;