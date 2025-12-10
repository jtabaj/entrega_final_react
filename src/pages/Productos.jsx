import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Container, Row, Col, Alert } from "react-bootstrap";
import MiBoton from "../components/MiBoton";
import { useCartContext } from "../context/CartContext";
import { FaCartShopping, FaEye, FaCircleXmark, FaKey, FaXbox } from "react-icons/fa6";
import { useUserContext } from "../context/UserContext";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { agregarCarrito, formatJT } = useCartContext();
  const { esAdmin } = useUserContext();

  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = products.filter((p) => {
    const textoBusqueda = busqueda.trim().toLowerCase();
    if (!textoBusqueda) return true; // si no hay búsqueda, mostrar todos

    const nombre = p.producto ? String(p.producto).toLowerCase() : "";
    const categoria = p.categoria ? String(p.categoria).toLowerCase() : "";

    return nombre.includes(textoBusqueda) || categoria.includes(textoBusqueda);
  });


  const productosPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://68d99d6890a75154f0dac9e3.mockapi.io/tienda/productos/");
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Restaurar scroll después de que los productos se han renderizado
  useEffect(() => {
    if (products.length > 0) {
      const scrollY = sessionStorage.getItem("scrollPos");
      if (scrollY) {
        requestAnimationFrame(() => { 
          window.scrollTo({ top: parseInt(scrollY), behavior: "smooth" });
          sessionStorage.removeItem("scrollPos"); 
        });
      }
    }
  }, [products]);

  // Guardar posición de scroll antes de navegar
  const handleVerDetalle = (producto) => {
    sessionStorage.setItem("scrollPos", window.scrollY); 
    navigate(`/producto/${producto.id}`);
  };

  // 🌀 Loading
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Cargando productos...</span>
      </div>
    );


  const handleEliminar = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate('/eliminar-producto', { state: { producto } });
  };

  const handleEditar = (producto) => {
    // Navegar al formulario de edición
    navigate('/actualizar-producto', { state: { producto } });
  };



  // ⚠️ Error
  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );

  // 🛍️ Productos
  return (
    <div 
      style={{ 
        backgroundColor: "#001f3f", 
        minHeight: "100vh", 
        padding: "2rem 1rem",
        paddingBottom: "5rem"
      }}
    >
      <Container>
        <h2 className="text-center text-white mb-4">Productos Disponibles</h2>
        <div className="row mb-4 justify-content-end">
          <div className="col-8 col-md-6">
            
            <div className="d-flex">
              <label className="form-label fw-bold text-white me-2 text-nowrap">Buscar productos</label>
 
 
 
 <div className="position-relative w-100">
  <input
    type="text"
    placeholder="🔍 Buscar por nombre o categoría..."
    className="form-control form-control-sm"
    style={{ paddingRight: "2rem" }} // espacio interno para la X
    value={busqueda}
    onChange={manejarBusqueda}
  />

  {busqueda && (
    <button
      type="button"
      onClick={() => setBusqueda("")}
      className="btn position-absolute p-0"
      style={{
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <FaCircleXmark  size={20} color="#204e94ea" />
    </button>
  )}
</div>



            </div>

            {busqueda && (
              <small className="text-white d-block text-end mt-1">
                Mostrando {productosFiltrados.length} de {products.length} productos
              </small>
            )}

          </div>
        </div>

    
        <Row className="g-4">
          {productosActuales.map((p, index) => (
            <Col
              key={p.id}
              xs={12} sm={6} md={4} lg={3}
              style={{animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={p.avatar || "default-image-url.jpg"} alt={p.producto}
                  style={{
                    objectFit: "cover", height: "200px",
                    borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem",
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-center">{p.producto}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">
                    Categoría: {p.categoria}
                  </Card.Subtitle>
                  <Card.Text className="text-muted" style={{ textAlign: "center" }}>
                    ID: {p.id }
                  </Card.Text>
                  <Card.Text className="text-muted" style={{ minHeight: "2rem" }}>
                    {p.descripcion || "Sin descripción disponible."}
                  </Card.Text>
                  <Card.Text className="fw-bold text-center mb-3">
                    Precio: ${formatJT(p.precio)}
                  </Card.Text>

                  <div className="d-flex justify-content-center gap-2">

                    <MiBoton 
                      icono={<FaEye/>} 
                      texto="ver detalle" fondo="primary"
                      funcAlClickear={() => handleVerDetalle(p)}
                     />

                    <MiBoton
                      icono={<FaCartShopping />}
                      texto={"Agregar"}  fondo="success"
                      funcAlClickear={() => agregarCarrito(p)}
                    />
                  </div>

                   {/* Botones de admin */}
                    {esAdmin && (
                      <div className="mt-3 pt-3 border-top">
                        <div className="d-flex gap-2">
                          <MiBoton
                            funcAlClickear={() => handleEditar(p)}
                            texto={"Editar"}
                            fondo="warning btn-sm flex-fill"
                            >
                          </MiBoton>
                          <MiBoton
                            funcAlClickear={() => handleEliminar(p)}
                            texto={"Eliminar"}
                            fondo="danger btn-sm flex-fill"
                          >
                          </MiBoton>
                        </div>
                      </div>
                    )}

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Paginador - Estilo simplificado */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}


        {/* Información de la página actual */}
        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {productosActuales.length} productos
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}


      </Container>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Productos;
