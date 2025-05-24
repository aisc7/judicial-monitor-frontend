import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import { useNavigate } from 'react-router-dom';

const ProcesosPage = () => {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedProceso, setSelectedProceso] = useState(null);
  const navigate = useNavigate();

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar procesos judiciales
  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:8000/api/procesos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setProcesos(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener procesos:", err);
        setError(err.response?.data?.message || "Error al cargar los procesos judiciales");
        setLoading(false);
      }
    };

    fetchProcesos();
  }, []);

  // Definición de columnas para la tabla de procesos
  const columns = useMemo(
    () => [
      {
        Header: 'Radicado',
        accessor: 'radicado',
        Cell: ({ value }) => <span className="font-medium">{value}</span>,
      },
      {
        Header: 'Tipo de Proceso',
        accessor: 'tipo',
      },
      {
        Header: 'Juzgado',
        accessor: 'juzgado',
      },
      {
        Header: 'Fecha de Inicio',
        accessor: 'fecha_inicio',
        Cell: ({ value }) => new Date(value).toLocaleDateString('es-CO'),
      },
      {
        Header: 'Estado',
        accessor: 'estado',
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded-full text-white ${
              value === 'Activo' ? 'bg-green-500' :
              value === 'En trámite' ? 'bg-blue-500' :
              value === 'Pendiente' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: 'Última Actualización',
        accessor: 'ultima_actualizacion',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString('es-CO') : 'N/A',
      },
    ],
    []
  );

  const handleProcesoSelect = (proceso) => {
    navigate(`/procesos/${proceso.id}`);
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Cargando procesos judiciales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-red-500 text-5xl mb-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error de Consulta</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <div className="text-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Procesos Judiciales</h1>
        <p className="text-gray-600 mb-4">
          Consulte la información actualizada de sus procesos judiciales. 
          Haga clic en un proceso para ver más detalles.
        </p>
        
        {procesos.length === 0 && !loading ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No se encontraron procesos asociados a su identificación</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <DataTable 
              columns={columns} 
              data={procesos} 
              setData={setProcesos}
              onRowClick={handleProcesoSelect} 
            />
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">¿Necesita ayuda?</h2>
        <p className="text-gray-600 mb-4">
          Si tiene dudas sobre la información mostrada o requiere asistencia adicional,
          comuníquese con la línea de atención al usuario: <strong>01 8000 123 456</strong>
        </p>
        <div className="flex">
          <button 
            onClick={() => window.open('/guia-usuario.pdf')}
            className="bg-white border border-blue-800 text-blue-800 px-4 py-2 rounded hover:bg-blue-50"
          >
            Ver guía de usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcesosPage;