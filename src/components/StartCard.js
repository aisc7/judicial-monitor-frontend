import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`rounded-lg shadow p-6 ${color || 'bg-white'}`}>
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;