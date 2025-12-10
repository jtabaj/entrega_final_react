import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function RutaProtegida({ children, soloAdmin = false }) {
   const {isAuthenticated, usuario} = useUserContext();
  const location = useLocation();
 
  if (!isAuthenticated) {
    // Pasa el state actual (que contiene el carrito) a /login
    return <Navigate to="/iniciar-sesion" state={location.state} replace />;
  }

  if (soloAdmin && usuario.nombre !== 'admin') {
      return <Navigate to="/" replace />;
  }

  return children;
}
export default RutaProtegida;