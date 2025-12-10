import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();

  // 🔹 Cargar usuario desde localStorage al iniciar
  const [usuario, setUsuario] = useState(() => {
    const nombre = localStorage.getItem("authNombre") || "";
    const email = localStorage.getItem("authEmail") || "";
    return { nombre, email };
  });

  // 🔹 Cargar estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token ? true : false;
  });

  // 🔹 Iniciar sesión
  const iniciarSesion = (nombre, email = "") => {
    setIsAuthenticated(true);

    // Guardar datos en localStorage
    localStorage.setItem("authToken", `fake-token-${nombre}`);
    localStorage.setItem("authNombre", nombre);
    localStorage.setItem("authEmail", email);

    // Guardar en estado interno
    setUsuario({ nombre, email });
  };

  // 🔹 Cerrar sesión
  const cerrarSesion = () => {
    setIsAuthenticated(false);

    localStorage.removeItem("authToken");
    localStorage.removeItem("authNombre");
    localStorage.removeItem("authEmail");

    setUsuario({ nombre: "", email: "" });

    navigate("/productos");
  };

  // 🔹 esAdmin funciona SIEMPRE gracias a localStorage
  const value = {
    isAuthenticated,
    usuario,
    esAdmin: usuario?.nombre === "admin",
    iniciarSesion,
    cerrarSesion,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de UserProvider");
  }
  return context;
}
