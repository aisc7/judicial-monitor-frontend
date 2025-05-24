// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login as loginService, logout as logoutService } from '../services/authService';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUser = async () => {
//       const currentUser = await checkAuthStatus(); // Implement this function in authService
//       setUser(currentUser);
//       setLoading(false);
//     };
//     checkUser();
//   }, []);

//   const login = async (credentials) => {
//     const userData = await loginService(credentials);
//     setUser(userData);
//     navigate('/dashboard'); // Redirect to dashboard after login
//   };

//   const logout = async () => {
//     await logoutService();
//     setUser(null);
//     navigate('/'); // Redirect to home after logout
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return React.useContext(AuthContext);
// };