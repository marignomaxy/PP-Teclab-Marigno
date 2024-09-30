import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById } from '../Services/productosServices';

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchProducto = async () => {
      const result = await getProductoById(id);
      if (result.error) {
        setError(result.error);
      } else {
        setProducto(result);
      }
    };

    fetchProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    let nuevoCarrito;

    if (productoEnCarrito) {
      nuevoCarrito = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item,
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad }];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    console.log(`Agregado ${cantidad} de ${producto.nombre} al carrito`);
  };

  return (
    <div className="flex flex-col justify-around w-screen h-screen md:flex-row items-center  p-5">
      <img
        className="w-full md:w-1/3 h-auto object-cover md:max-w-[600px]"
        src={producto.imagen}
        alt="Producto"
      />
      <div className="md:ml-10 mt-5 md:mt-0 flex flex-col items-start">
        <div className="font-poppins font-bold text-3xl mb-4">
          {producto.nombre}
        </div>
        <div className="font-poppins text-lg mb-4">{producto.descripcion}</div>
        <div className="font-poppins font-bold text-2xl mb-4">
          Precio: {producto.precio}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded py-2 px-3 mr-4 w-20"
            min="1"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={agregarAlCarrito}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detalle;
