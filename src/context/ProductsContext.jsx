import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errores, setErrores ] = useState(null);

 // f(x) validarProducto
  const validarProducto = (producto) => {
    const errores = {};

    // nombre
    if (!producto.producto?.trim()) {
      errores.producto = 'El nombre es obligatorio.';
    }

    // precio
    if (!producto.precio?.trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio?.replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);
     
      if (!/^[\d.,]+$/.test(producto.precio?.replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.';
      }
    }

    // descripción
    if (!producto.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.';
    }

    return errores;
  };


  // Valida el Producto y retorna si es válido junto con los errores
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido : Object.keys(errores).length === 0, errores
    };
  };

  // Cargar productos desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch("https://68d99d6890a75154f0dac9e3.mockapi.io/tienda/productos/");
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setErrores("No se pudieron cargar los productos. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    cargarProductos();
  }, []);


  // f(x) para agregarProducto
  const agregarProducto = async (producto) => {
    alert('en agregarProducto...');
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.replace(/\./g, '').replace(',', '.')
      };

      const respuesta = await fetch("https://68d99d6890a75154f0dac9e3.mockapi.io/tienda/productos/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEnviar),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto.');

      const data = await respuesta.json();
      toast.success('Producto agregado correctamente');
      return data;
    } catch (error) {
      toast.error('Hubo un problema al agregar el producto ' + producto.producto + '. ' + error.message);
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`https://68d99d6890a75154f0dac9e3.mockapi.io/tienda/productos/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar el producto');

      const data = await respuesta.json();
      setProducto(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };


  // Función para eliminar producto
 const eliminarProducto = async (productoAEliminar) => {
  console.log(">> Entré a eliminarProducto");
  // Validación segura
  if (!productoAEliminar || !productoAEliminar.id) {
    toast.error("Producto no válido para eliminar.");
    return;
  }

  const id = String(productoAEliminar.id);
  const nombre = productoAEliminar.producto || 'sin nombre';

  try {
    toast.info(`Eliminando ${nombre} (ID: ${id})...`);

    const respuesta = await fetch(
      `https://68d99d6890a75154f0dac9e3.mockapi.io/tienda/productos/${id}`,
      { method: 'DELETE' },
    );

    if (!respuesta.ok) {
      const errorText = await respuesta.text();
      toast.error(`Error al eliminar: ${respuesta.status} - ${errorText}`);
      throw new Error(`DELETE falló: ${respuesta.status} - ${errorText}`);
    }

    // Actualizar estado local: importantísimo
    setProducto(prev => prev.filter(p => String(p.id) !== id));

    toast.success('Producto eliminado correctamente.');
  } catch (error) {
    console.error('(EN ProductsContext) Error eliminando producto:', error);
    toast.error(`Hubo un error eliminando el producto: ${error.message}`);
  }
       
    alert('ccccccccc');
  };


  return (
    <ProductsContext.Provider
      value={{
        producto,
        loading,
        errores,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        // validarProducto,
        validar
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};



