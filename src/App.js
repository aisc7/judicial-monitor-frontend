import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import Layout from './components/Layaut';
import ProtectedRoute from './components/ProtectedRoute'; 

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