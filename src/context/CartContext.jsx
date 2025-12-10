import React, { createContext, useContext, useState } from "react";

// Crear el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
  
  // Estado del carrito
  const [carrito, setCarrito] = useState([]);
  
  // Cantidad total de productos en el carrito
  const qProds = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  // Funciones para el carrito
const agregarCarrito = (producto) => {
  setCarrito((prevCarrito) => {
    const existente = prevCarrito.find((item) => item.id === producto.id);
    if (existente) {
      // Si ya existe, sumamos cantidad
      return prevCarrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      // Si no existe, lo agregamos con cantidad 1
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    }
  });
};

  const agregarUnidad = (id) => {
    const item = carrito.find((item) => item.id === id);
    if (item) {
      item.cantidad++;
      setCarrito([...carrito]);
    }
  };
  const eliminarUnidad = (id) => {
    const item = carrito.find((item) => item.id === id);
    if (item) {
      item.cantidad--;
      if (item.cantidad === 0) {
        setCarrito(carrito.filter((item) => item.id !== id));
      } else {
        setCarrito([...carrito]);
      }
    }
  };

  const eliminarCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const formatJT = (num) => {
  const n = Number(num); // convierte "1500" → 1500
  if (isNaN(n)) return "0,00"; // opcional: por si llega undefined o basura

  return n.toLocaleString("es-AR", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

  // Valor que se provee a todos los componentes
  const value = {    
    carrito,
    vaciarCarrito,
    eliminarCarrito,
    agregarCarrito,
    agregarUnidad,
    eliminarUnidad,
    qProds,
    // Formateo de Nros
    formatJT
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}
