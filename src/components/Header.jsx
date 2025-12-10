import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaServicestack, FaBoxOpen } from 'react-icons/fa';
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";

const Header = () => {
  const { qProds } = useCartContext();
  const { usuario } = useUserContext();
  

  // 1. Estado para controlar si el menú está expandido o no
  const [expanded, setExpanded] = useState(false);

  // 2. Función para cerrar el menú
  const handleLinkClick = () => {
    setExpanded(false);
  };

  const CartButton = ( // Componente auxiliar para el botón del carrito
    <Nav.Link 
    as={Link} 
    to="/carrito" 
    className="position-relative d-flex align-items-center me-2" // Añadimos d-flex para mejor alineación en móvil
    onClick={handleLinkClick}
    >
      <FaShoppingCart className="me-1" />
      Carrito
    {qProds > 0 && (
        <span
          className="badge bg-success position-absolute"
          style={{
            top: "2px",
            right: "-12px",
            fontSize: "0.7rem",
            width: "20px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            // Ajuste para la posición absoluta en dispositivos móviles
            // Cuando está fuera del Collapse, a veces necesita un ajuste de posición.
            transform: 'translate(0, 0)', 
            zIndex: 1050 // Asegura que esté sobre otros elementos
          }}
        >
          {qProds}
        </span>
      )}
    </Nav.Link>
  );

  return (
    <Navbar 
      fixed="top" 
      bg="dark" 
      variant="dark" 
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        {/* Logo + Nombre */}
        <Navbar.Brand 
          as={Link} to="/" onClick={handleLinkClick}
        >
        <img
            src="/vite.svg"
            alt="Logo"
            width={30}
            height={30}
            className="me-2"
        />
          Mi Tienda
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="order-lg-2"> {/* order-lg-2 lo pone en el centro en desktop */}
          <Nav className="ms-auto align-items-center">
            
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>
              <FaHome className="me-1" />Inicio
            </Nav.Link>
            
            <Nav.Link as={Link} to="/servicios" onClick={handleLinkClick}>
              <FaServicestack className="me-1" />Servicios
            </Nav.Link>
            
            <Nav.Link as={Link} to="/productos" onClick={handleLinkClick}>
              <FaBoxOpen className="me-1" />Productos
            </Nav.Link>

            {usuario?.nombre === "admin" && (
              <Nav.Link as={Link} to="/dashboard" onClick={handleLinkClick}>
                <FaBoxOpen className="me-1" />Dashboard
              </Nav.Link>
            )}

            {/* Botón de autenticación */}
            <Button
              as={Link}
              to="/iniciar-sesion"
              variant="outline-light"
              className="ms-3"
              onClick={handleLinkClick}
            >
              {usuario?.nombre ? "Usuario: " + usuario.nombre : "Iniciar Sesión"}
            </Button>
          </Nav>
        </Navbar.Collapse>
        
        {/*  EL BOTÓN FUERA DEL COLLAPSE */}
        {qProds > 0 &&
        <Nav className="d-flex order-lg-3"> {/* order-lg-3 lo pone al final en desktop */}
            {CartButton}
        </Nav>
 }
      </Container>
    </Navbar>
  );
};

export default Header;