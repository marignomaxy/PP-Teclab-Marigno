import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const { login, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const eliminarTodosProductos = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const finalizarCompra = () => {
    if (login && token) {
      setMostrarPopup(true);
    } else {
      alert('Por favor, inicie sesión para finalizar la compra.');
      navigate('/login');
    }
  };

  const aceptarCompra = () => {
    setMostrarPopup(false);
    setCarrito([]);
    localStorage.removeItem('carrito');
    setMensajeConfirmacion(' Gracias por su compra, ' + user);
  };

  const cancelarCompra = () => {
    setMostrarPopup(false);
  };

  const incrementarCantidad = (index) => {
    const nuevoCarrito = carrito.map((item, i) =>
      i === index ? { ...item, cantidad: item.cantidad + 1 } : item,
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const decrementarCantidad = (index) => {
    const nuevoCarrito = carrito.map((item, i) =>
      i === index && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item,
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const cambiarCantidad = (index, cantidad) => {
    const nuevoCarrito = carrito.map((item, i) =>
      i === index ? { ...item, cantidad: cantidad } : item,
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0,
    );
  };

  return (
    <div className="p-5 font-poppins">
      {mensajeConfirmacion && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold font-poppins">¡Procesado!</strong>
          <span className="block sm:inline font-poppins">
            {mensajeConfirmacion}
          </span>
        </div>
      )}
      {carrito.map((producto, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white shadow-md rounded p-4 mb-4"
        >
          <div className="flex items-center">
            <img
              className="w-16 h-16 object-cover rounded mr-4"
              src={producto.imagen}
              alt={producto.nombre}
            />
            <span className="font-bold font-poppins text-lg text-gray-800">
              {producto.nombre}
            </span>
          </div>
          <div className="flex items-center">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => decrementarCantidad(index)}
            >
              ◀
            </button>
            <input
              type="number"
              className="mx-2 w-12 text-center border rounded"
              value={producto.cantidad}
              onChange={(e) => cambiarCantidad(index, parseInt(e.target.value))}
              min="1"
            />
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => incrementarCantidad(index)}
            >
              ▶
            </button>
            <span className="ml-4 font-bold font-poppins text-lg text-gray-800 w-20 text-right">
              ${(producto.precio * producto.cantidad).toFixed(2)}
            </span>
            <span
              className="text-red-500 cursor-pointer font-bold text-xl ml-4"
              onClick={() => eliminarProducto(index)}
            >
              x
            </span>
          </div>
        </div>
      ))}
      <div className="text-center font-bold font-poppins text-xl text-black mb-5">
        Total: ${calcularTotal().toFixed(2)}
      </div>
      <div className="flex justify-between mt-5 space-x-2">
        <button
          onClick={finalizarCompra}
          className={`w-3/4 font-poppins text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform ${
            carrito.length === 0
              ? 'bg-green-200 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700'
          }`}
          disabled={carrito.length === 0}
        >
          Finalizar Compra
        </button>
        <button
          onClick={eliminarTodosProductos}
          className={`w-1/4 font-poppins text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform ${
            carrito.length === 0
              ? 'bg-red-200 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-700'
          }`}
          disabled={carrito.length === 0}
        >
          Eliminar Productos
        </button>
      </div>
      {mostrarPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <p className="mb-4">
              ¿Está seguro de finalizar la compra por un total de $
              {calcularTotal().toFixed(2)}?
            </p>
            <div className="flex justify-center">
              <button
                onClick={aceptarCompra}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Aceptar
              </button>
              <button
                onClick={cancelarCompra}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
