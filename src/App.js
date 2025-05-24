import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import Layout from './components/Layaut'; // Corregido: nombre del archivo y ruta
import ProtectedRoute from './components/ProtectedRoute'; // Corregido: ruta correcta

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/dashboard">
            <DashboardPage />
          </ProtectedRoute>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;