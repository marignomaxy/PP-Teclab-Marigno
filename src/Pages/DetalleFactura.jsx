import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFacturaById, updateFactura } from '../Services/facturaServices';

function DetalleFactura() {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const role = localStorage.getItem('role');
  const [updateTrigger, setUpdateTrigger] = useState(false); // Estado adicional para actualizar

  console.log(role);
  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const data = await getFacturaById(id);

        setFactura(data);
      } catch (error) {
        setError('Error al cargar la factura');
      }
    };

    fetchFactura();
  }, [id, updateTrigger]);

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleUpdateFactura = async (id, updatedData) => {
    try {
      let token = localStorage.getItem('Token');
      if (!token) {
        setError('No se encontró el token. Por favor, inicie sesión.');
        return;
      }
      token = token.replace(/"/g, '');

      await updateFactura(id, updatedData, token);
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.log(error);
      setError('Error al actualizar la factura');
    }
  };

  const confirmUpdate = async () => {
    const newEntregadoState = !factura.entregado;
    handleUpdateFactura(factura.id, { entregado: newEntregadoState });
    setShowConfirm(false);
  };

  const cancelUpdate = () => {
    setShowConfirm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!factura) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Detalle de Factura
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Factura ID: {factura.id}</h2>
          <p className="text-gray-600">Fecha: {formatDate(factura.fecha)}</p>
          <p className="text-gray-600">Usuario: {factura.user.firstname}</p>
          <p className="text-gray-600">Total: {factura.precioTotal}$</p>
        </div>
        <div>
          {factura.entregado ? (
            <p className="text-green-500 font-semibold">Enviado</p>
          ) : (
            <p className="text-gray-500 font-semibold">En preparación</p>
          )}
        </div>
        {role === '"ROLE_ADMIN"' && (
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Entregar Pedido
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Detalles</h3>
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-semibold">Imagen</th>
              <th className="py-2 px-4 border-b font-semibold">Producto</th>
              <th className="py-2 px-4 border-b font-semibold">Cantidad</th>
              <th className="py-2 px-4 border-b font-semibold">
                Precio Unitario
              </th>
              <th className="py-2 px-4 border-b font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {factura.detalleFactura.map((detalle, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <img
                    src={detalle.producto.imagen}
                    alt={detalle.producto.nombre}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {detalle.producto.nombre}
                </td>
                <td className="py-2 px-4 border-b">{detalle.cantidad}</td>
                <td className="py-2 px-4 border-b">
                  {detalle.producto.precio}$
                </td>
                <td className="py-2 px-4 border-b">
                  {detalle.cantidad * detalle.producto.precio}$
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">
              ¿Desea entregar este pedido?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sí
              </button>
              <button
                onClick={cancelUpdate}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalleFactura;
