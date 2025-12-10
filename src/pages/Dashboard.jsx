import React from 'react';
import { useUserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
// 1. Importa el componente del gráfico
import SalesChart from '../components/SalesChart';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useUserContext();
  const tokenActual = localStorage.getItem('authToken');

  return (
    <div style={{ padding: '20px', minHeight: '60vh' }}>
      <h1>Dashboard Administrativo</h1>
      
      {/* 2. Contenedor principal para la disposición lateral */}
      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* Contenido principal del dashboard */}
        <div style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px', 
            flex: 2, // Ocupa más espacio, por ejemplo, 2/3
            border: '1px solid #ddd'
        }}>
          <p><strong>Sesión iniciada como: </strong> {usuario.nombre} ({usuario.email})</p>
          
          {/* SECCIÓN DEL TOKEN */}
          <div style={{
            background: '#e9ecef',
            padding: '5px',
            borderRadius: '4px',
            margin: '5px 0',
            fontSize: '14px',
            border: '1px solid #ddd'
          }}>
            <strong>Token de autenticación:</strong>
            <br />
            <code>{tokenActual}</code>
          </div>

          {/* SECCIÓN DE ACCIONES ADMIN */}
          <div style={{ margin: '20px 0' }}>
            <h3>Acciones:</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              <Link
                to="/actualizar-producto"
                style={{
                  padding: '10px 20px',
                  background: '#28a745',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                Agregar Nuevo Producto
              </Link>
              
              <Link
                to="/productos"
                style={{
                  padding: '10px 20px',
                  background: '#17a2b8',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                Ver Todos los Productos
              </Link>
            </div>
          </div>
          <hr></hr>
          
          {/* BOTÓN CERRAR SESIÓN */}
          <button
            onClick={cerrarSesion}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Cerrar sesión
          </button>
        </div>
        
        {/* 3. El Aside con el Gráfico de Ventas */}
        <aside style={{ 
            background: '#f5f5f5', 
            padding: '10px 10px 40px 10px', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flex: 1 // Ocupa menos espacio, por ejemplo, 1/3
        }}>
            <h3>📊 Gráfico de Ventas</h3>
            <SalesChart />
        </aside>

      </div> 
      {/* Fin del contenedor flex */}

    </div>
  );
}