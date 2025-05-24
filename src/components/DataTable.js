import React from "react";

const DataTable = ({ data = [], onRowClick }) => {
  // Asegúrate de que `data` tiene un valor por defecto como un arreglo vacío
  if (!Array.isArray(data)) {
    console.error("DataTable: 'data' no es un arreglo válido.");
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Nombre</th>
          <th className="border border-gray-300 px-4 py-2">Estado</th>
          <th className="border border-gray-300 px-4 py-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onRowClick(row)}
          >
            <td className="border border-gray-300 px-4 py-2">{row.idProceso}</td>
            <td className="border border-gray-300 px-4 py-2">{row.nombre}</td>
            <td className="border border-gray-300 px-4 py-2">{row.estado}</td>
            <td className="border border-gray-300 px-4 py-2">{row.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;