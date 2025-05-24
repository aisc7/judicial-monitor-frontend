import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "../components/DataTable";
import StatCard from "../components/StartCard";
import ProcessDetail from "../components/ProcessDetail";
import {
  consultaPorNombre,
  consultaPorRadicado,
  detalleProceso,
} from "../services/api";

const Dashboard = () => {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [searchType, setSearchType] = useState(""); 
  const [searchInput, setSearchInput] = useState(""); 
  const [personType, setPersonType] = useState(""); 
  const [nameInput, setNameInput] = useState(""); 
  const [cityInput, setCityInput] = useState(""); 
  const [dateRange, setDateRange] = useState("30dias"); 

  const history = useHistory();

  // Función para buscar procesos por nombre
  const fetchProcesosPorNombre = async () => {
    try {
      setLoading(true);
      const response = await consultaPorNombre(nameInput, personType, cityInput, 1);
      setProcesos(response.procesos || []);
      setError(null);
    } catch (err) {
      console.error("Error al buscar procesos por nombre:", err);
      setError("No se pudieron cargar los datos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar procesos por radicado
  const fetchProcesosPorRadicado = async () => {
    try {
      setLoading(true);
      const response = await consultaPorRadicado(searchInput, 1);
      setProcesos(response.procesos || []);
      setError(null);
    } catch (err) {
      console.error("Error al buscar procesos por radicado:", err);
      setError("No se encontraron resultados para el radicado.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la búsqueda según el tipo
  const handleSearch = () => {
    if (searchType === "nombre") {
      fetchProcesosPorNombre();
    } else if (searchType === "radicado") {
      fetchProcesosPorRadicado();
    } else {
      setError("Seleccione un tipo de búsqueda válido.");
    }
  };

  // Función para obtener detalles de un proceso
  const fetchDetalleProceso = async (idProceso) => {
    try {
      setLoading(true);
      const response = await detalleProceso(idProceso);
      setSelectedProcess(response);
    } catch (err) {
      console.error("Error al obtener detalles del proceso:", err);
      setError("No se pudieron cargar los detalles del proceso.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar clic en una fila de la tabla
  const onRowClick = (proceso) => {
    fetchDetalleProceso(proceso.idProceso);
  };

  // Función para redirigir a la página de detalles
  const goToDetailsPage = () => {
    history.push("/detalle");
  };

  // Estadísticas del panel de control
  const stats = [
    {
      title: "Procesos Activos",
      value: procesos.filter((p) => p.estado === "Activo").length,
      icon: "📝",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Próximas Audiencias",
      value: procesos.filter((p) => p.proximaAudiencia && new Date(p.proximaAudiencia) > new Date()).length,
      icon: "📅",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Pendientes de Respuesta",
      value: procesos.filter((p) => p.estado === "Pendiente").length,
      icon: "⏳",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-lg">Cargando su información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Monitor Judicial</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Formulario de búsqueda */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Buscar Procesos</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tipo de Búsqueda:</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-800"
            >
              <option value="">Seleccione...</option>
              <option value="nombre">Por Nombre</option>
              <option value="radicado">Por Radicado</option>
            </select>
          </div>

          {searchType === "nombre" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Tipo de Persona:</label>
                <select
                  value={personType}
                  onChange={(e) => setPersonType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-800"
                >
                  <option value="">Seleccione...</option>
                  <option value="jur">Jurídica</option>
                  <option value="natural">Natural</option> 
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Ingrese el nombre"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Ciudad:</label>
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Ingrese la ciudad"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-800"
                />
              </div>
            </div>
          )}

          {searchType === "radicado" && (
            <div>
              <label className="block text-gray-700 font-bold mb-2">Radicado:</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ingrese el radicado"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white text-gray-800"
              />
            </div>
          )}

          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors mt-4"
          >
            Buscar
          </button>
        </div>

        {/* Panel de control */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
          <button
            onClick={goToDetailsPage}
            className="mt-4 px-6 py-2 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
          >
            Detalle
          </button>
        </div>

        {/* Tabla de procesos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Procesos Judiciales</h2>
          {procesos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-lg text-gray-600">No tiene procesos judiciales asociados.</p>
            </div>
          ) : (
            <DataTable data={procesos} onRowClick={onRowClick} />
          )}
        </div>

        {selectedProcess && (
          <ProcessDetail process={selectedProcess} onClose={() => setSelectedProcess(null)} />
        )}

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
      </main>
    </div>
  );
};

export default Dashboard;