import { Carousel } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CardProducto from '../Components/CardProducto';
import { getProductos } from '../Services/productosServices';

function Home() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    let nuevoCarrito;

    if (productoEnCarrito) {
      nuevoCarrito = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  useEffect(() => {
    getProductos()
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
        <Carousel>
          <img
            src="https://images.ecestaticos.com/Dy-k623a1Qb1peI5TrOoxdjkDck=/2x112:2120x1302/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fa58%2F338%2F915%2Fa583389152e68238246080fc07f1d5b5.jpg"
            alt="..."
            className="imagenCarrousel"
          />
          <img
            src="https://s3.abcstatics.com/media/bienestar/2019/10/04/cacao-1-U303043057595f0H--1248x698@abc.jpg"
            alt="..."
            className="imagenCarrousel"
          />
          <img
            src="https://cbdeportes.com/wp-content/uploads/2018/05/PriorizalosalimentosNaturalesyfrescos.jpg"
            alt="..."
            className="imagenCarrousel"
          />
        </Carousel>
      </div>

      <div className="flex flex-wrap justify-between">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
          >
            <CardProducto
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
