import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identificacion.trim()) {
      setError('Por favor ingrese su número de cédula o radicado');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Llamada a la API de backend (Python)
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        identificacion: identificacion.trim()
      });
      
      // Guardar información del usuario
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
      
      // Redireccionar al dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Error de autenticación:', err);
      if (err.response && err.response.status === 404) {
        setError('Identificación no encontrada en el sistema');
      } else {
        setError('Error al conectar con el servidor. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-2 bg-blue-800 rounded-full inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Monitor Judicial</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Seguimiento de Procesos Judiciales
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">
              Número de Cédula / Radicado
            </label>
            <div className="mt-1">
              <input
                id="identificacion"
                name="identificacion"
                type="text"
                required
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese su número de identificación"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Accediendo...
                </span>
              ) : (
                'Acceder'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="border-t border-gray-200 pt-5">
            <p className="text-xs text-gray-500">
              Este es un sistema oficial para el seguimiento de procesos judiciales.
              <br />
              Rama Judicial de Colombia © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;