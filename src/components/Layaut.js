import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      {/* Podrías agregar aquí componentes comunes como Header o Footer */}
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;