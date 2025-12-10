import React from "react";
import Header from "./components/Header.jsx"; // Ajustá la ruta si es necesario
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Servicios from "./pages/Servicios.jsx";
import Productos from "./pages/Productos.jsx";
import Producto from "./pages/Producto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Footer from "./components/Footer.jsx";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import RutaProtegida from "./pages/RutaProtegida";
import Pagar from "./pages/Pagar";
import IniciarSesion from "./pages/IniciarSesion";
import Dashboard from "./pages/Dashboard";
import FormularioProducto from "./components/FormularioProducto";
import FormEliminarProducto from "./components/FormEliminarProducto";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <>
      <CartProvider>
        <UserProvider>
          <ProductsProvider>  
          <Header />
          <div className="container mt-4">
            <p>Bienvenido a nuestra aplicación</p>
            <Routes>
              <Route path="/"               element={<Inicio />} />
              <Route path="/servicios"      element={<Servicios />} />
              <Route path="/productos"      element={<Productos />} />
              <Route path="/producto/:id"   element={<Producto />} />
              <Route path="/carrito"        element={<Carrito />} />
              <Route path="/iniciar-sesion" element={<IniciarSesion />} />
              <Route path="/pagar"          element={<RutaProtegida>
                                                        <Pagar />
                                                     </RutaProtegida>} />
              <Route path="/dashboard"      element={<RutaProtegida soloAdmin={true}>
                                                        <Dashboard />
                                                    </RutaProtegida>} />

            {/* RUTA PROTEGIDA - Admin */}
            <Route path="/actualizar-producto" element={<RutaProtegida soloAdmin={true}>
                                                       <FormularioProducto />
                                                     </RutaProtegida>}   />
                                                            
             
            <Route path="/eliminar-producto" element={<RutaProtegida soloAdmin={true}>
                                                       <FormEliminarProducto />
                                                     </RutaProtegida>}   />
                                                            
            </Routes>            
          </div>
          <Footer />
          <ToastContainer
              position="top-right"
              style={{ marginTop: "100px" }}  
              autoClose={9000}
              hideProgressBar={false}
              closeOnClick
              draggable
              pauseOnHover
          />
          </ProductsProvider>
        </UserProvider>
      </CartProvider>
    </>
  );
}
export default App;
