import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DataTable from '../components/DataTable';
import StatCard from '../components/StartCard';
import ProcessDetail from '../components/ProcessDetail';

const Dashboard = () => {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [fontSize, setFontSize] = useState('normal');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const userName = userData.nombre || 'Usuario del Sistema';

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/procesos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProcesos(response.data);
      } catch (err) {
        console.error('Error al cargar los procesos:', err);
        setError('No se pudieron cargar los procesos judiciales. Por favor intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProcesos();
  }, []);

  const handleSearch = () => {
    console.log('Buscando por:', searchInput);
    // Aquí puedes implementar la lógica para buscar procesos por cédula, documento o radicado
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    history.push('/');
  };

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  const stats = [
    {
      title: 'Procesos Activos',
      value: procesos.filter(p => p.estado === 'Activo').length,
      icon: '📝',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Próximas Audiencias',
      value: procesos.filter(p => p.proxima_audiencia && new Date(p.proxima_audiencia) > new Date()).length,
      icon: '📅',
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Pendientes de Respuesta',
      value: procesos.filter(p => p.estado === 'Pendiente').length,
      icon: '⏳',
      color: 'bg-yellow-100 text-yellow-800',
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
    <div className={`min-h-screen bg-gray-50 ${fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : ''}`}>
      <header className="bg-blue-800 text-white shadow">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <h1 className="text-2xl font-bold">Monitor Judicial</h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center mr-0 md:mr-6 mb-2 md:mb-0">
              <span className="mr-2">Tamaño del texto:</span>
              <button onClick={() => changeFontSize('normal')} className={`px-2 py-1 mx-1 rounded ${fontSize === 'normal' ? 'bg-white text-blue-800' : 'bg-blue-700'}`}>A</button>
              <button onClick={() => changeFontSize('large')} className={`px-2 py-1 mx-1 rounded ${fontSize === 'large' ? 'bg-white text-blue-800' : 'bg-blue-700'}`}>A+</button>
              <button onClick={() => changeFontSize('xlarge')} className={`px-2 py-1 mx-1 rounded ${fontSize === 'xlarge' ? 'bg-white text-blue-800' : 'bg-blue-700'}`}>A++</button>
            </div>
            <div className="flex items-center">
              <span className="hidden md:inline mr-2">Bienvenido(a),</span>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Cerrar sesión</button>
            </div>
          </div>
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
          <p className="text-gray-600 mb-4">
            Ingrese su número de cédula, documento o radicado para buscar un proceso judicial.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Ingrese cédula, documento o radicado"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Panel de control */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Tabla de procesos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Procesos Judiciales</h2>
          {procesos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-lg text-gray-600">No tiene procesos judiciales asociados.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <DataTable columns={columns} data={procesos} setData={setProcesos} onRowClick={handleProcessSelect} />
              </div>
            </div>
          )}
        </div>

        {selectedProcess && (
          <ProcessDetail process={selectedProcess} onClose={() => setSelectedProcess(null)} />
        )}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 p-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            Sistema de Monitoreo Judicial © {new Date().getFullYear()} - Rama Judicial de Colombia
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Para soporte técnico llame a la línea: 01 8000 123 456
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;