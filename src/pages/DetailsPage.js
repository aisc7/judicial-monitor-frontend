import React, { useState } from "react";

const DetailsPage = ({ proceso }) => {
  const [activeTab, setActiveTab] = useState("datos");

  const tabs = [
    { id: "datos", label: "Datos del Proceso" },
    { id: "sujetos", label: "Sujetos Procesales" },
    { id: "documentos", label: "Documentos del Proceso" },
    { id: "actuaciones", label: "Actuaciones" },
  ];

  const renderTabContent = () => {
    if (!proceso) {
      return (
        <div className="text-center text-gray-600">
          <p>No se registran procesos judiciales asociados.</p>
        </div>
      );
    }

    switch (activeTab) {
      case "datos":
        return <div>Información general del proceso...</div>;
      case "sujetos":
        return <div>Lista de sujetos procesales...</div>;
      case "documentos":
        return <div>Documentos asociados al proceso...</div>;
      case "actuaciones":
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">Actuaciones</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                  <th className="border border-gray-300 px-4 py-2">Tipo de Actuación</th>
                  <th className="border border-gray-300 px-4 py-2">Anotaciones</th>
                  <th className="border border-gray-300 px-4 py-2">Documentos</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí se mapearían las actuaciones */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2025-05-24</td>
                  <td className="border border-gray-300 px-4 py-2">Fijación Estado</td>
                  <td className="border border-gray-300 px-4 py-2">Anotación de ejemplo</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href="#" className="text-blue-600 hover:underline">
                      Descargar
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Detalle del Proceso</h1>
      <div className="mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 mr-2 ${
              activeTab === tab.id
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            } rounded-lg`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {proceso ? renderTabContent() : (
          <div className="text-center text-gray-600">
            <p>No se registran procesos judiciales asociados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;