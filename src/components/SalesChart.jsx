// src/components/SalesChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// **Importante:** Registrar los elementos que usará Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Datos de ejemplo para el gráfico
const salesData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Ventas Mensuales (Miles $)',
      data: [12, 19, 13, 5, 11, 22], // Valores de ejemplo
      backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color de las barras
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      
      
    },
  ],
};

// Opciones de configuración del gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {legend: {position: 'top'},
            title: {display: true, text: 'Resumen de Ventas'},
            },
  scales: {y: {beginAtZero: true,
             title: {display: true, text: 'Ventas (Miles $)'},
            }}
};


export default function SalesChart() {
  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={salesData} options={chartOptions} />
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
         Datos primer semestre.
      </p>
    </div>
  );
}