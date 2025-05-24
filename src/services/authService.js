// export const login = async (credentials) => {
//   try {
//     const response = await fetch('http://localhost:8000/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       throw new Error('Error en la autenticación');
//     }

//     const data = await response.json();
//     localStorage.setItem('token', data.token); // Guardar el token en localStorage
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('token'); // Eliminar el token de localStorage
// };

// export const isAuthenticated = () => {
//   return localStorage.getItem('token') !== null; // Verificar si hay un token
// };