import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFacturaByUserId } from '../Services/facturaServices';

function DetalleUsuario() {
  const { id } = useParams();
  const [facturas, setFacturas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await getFacturaByUserId(id);
        console.log(response);
        setFacturas(response);
      } catch (error) {
        setError('Error al cargar la factura');
      }
    };

    fetchFactura();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mis Facturas</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id_factura}>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/detalleFactura/${factura.id_factura}`}
                    className="text-blue-500 hover:underline"
                  >
                    {factura.id_factura}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(factura.fecha)}
                </td>
                <td className="py-2 px-4 border-b">{factura.precioTotal}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetalleUsuario;
