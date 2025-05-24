import React from 'react';

const ProcessDetail = ({ process, onClose }) => {
  if (!process) return null;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{process.radicado}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>
        
        <div className="mt-4">
          <p><span className="font-semibold">Estado:</span> {process.estado}</p>
          <p><span className="font-semibold">Tipo:</span> {process.tipo}</p>
          <p><span className="font-semibold">Juzgado:</span> {process.juzgado}</p>
          <p><span className="font-semibold">Fecha inicio:</span> {formatDate(process.fecha_inicio)}</p>
          <p><span className="font-semibold">Última actualización:</span> {formatDate(process.ultima_actualizacion)}</p>
        </div>
        
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessDetail;