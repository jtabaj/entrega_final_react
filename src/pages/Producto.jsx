import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import MiBoton from "../components/MiBoton";
import { useCartContext } from "../context/CartContext";

function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatJT } = useCartContext();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar producto por ID desde la API
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`https://68d99d6890a75154f0dac9e3.mockapi.io/tienda/productos/${id}`);
        if (!res.ok) throw new Error("Error al obtener el producto");
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Cargando producto...</span>
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
        <div className="text-center mt-3">
          <MiBoton
            texto="Volver"
            fondo="outline-secondary"
            funcAlClickear={() => navigate(-1)}
          />
        </div>
      </Container>
    );

  if (!producto)
    return (
      <Container className="text-center mt-5">
        <h4 className="text-danger">⚠️ Producto no encontrado</h4>
        <MiBoton
          texto="Volver"
          fondo="outline-secondary"
          funcAlClickear={() => navigate(-1)}
        />
      </Container>
    );

  return (
    <Container className="mt-5 mb-5 pb-5">  
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Img
              variant="top"
              src={producto.avatar}
              alt={producto.producto}
              style={{
                height: "400px",
                objectFit: "contain",
                padding: "15px",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
              }}
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold fs-4 text-primary">
                {producto.producto}
              </Card.Title>
              
              <Card.Subtitle className="mb-2 text-muted">
                ID: {producto.id} <br/> 
                Categoría: {producto.categoria}
              </Card.Subtitle>

              <Card.Text className="mb-2 text-muted">
                Precio: ${formatJT(producto.precio)}
              </Card.Text>
              <Card.Text className="mt-3">
                {producto.descripcion || "Sin descripción disponible."}
              </Card.Text>
              <div className="mt-4">
                <MiBoton
                  texto="Volver"
                  fondo="outline-primary"
                  funcAlClickear={() => navigate(-1)}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Producto;
