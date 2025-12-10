import React from 'react';
import { Button } from "react-bootstrap";


const MiBoton = ({fondo, funcAlClickear,  texto , icono, tipo, children }) => (

    <Button type={tipo || "button"} variant={fondo || 'warning'}   
    onClick={funcAlClickear  /*|| (() => alert('click x defecto'))*/ }>
        {icono && <span className="me-1">{icono}</span>}
        {<span>{texto || 'texto x defecto'}</span>}
        {children}
    </Button>
);

export default MiBoton; 