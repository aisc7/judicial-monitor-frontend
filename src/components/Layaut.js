import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;