import React from 'react';
import { Link } from 'react-router-dom';

function CardProducto({ producto, agregarAlCarrito }) {
  return (
    <div className="min-w-[250px] max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col justify-between mx-5">
      <img
        className="w-full h-48 object-cover"
        src={producto.imagen}
        alt="Producto"
      />
      <div className="px-6 text-center py-4 flex flex-col flex-grow">
        <div className="font-poppins font-bold text-xl mb-2">
          {producto.nombre}
        </div>
        <div className="font-poppins font-bold text-xl mb-2">
          Precio: {producto.precio}
        </div>
        <div className="mt-auto flex justify-between">
          <Link
            to={`/descripcion/${producto.id}`}
            className="bg-blue-500 hover:bg-blue-700 mr-2 text-white font-bold py-2 px-4 rounded"
          >
            Ver Descripción
          </Link>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
