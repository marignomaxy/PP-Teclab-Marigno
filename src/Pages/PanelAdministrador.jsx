import React, { useState, useEffect } from 'react';
import { getFacturas, updateFactura } from '../Services/facturaServices';
import {
  getProductos,
  updateProducto,
  deleteProducto,
  createProducto,
} from '../Services/productosServices';
import { Link } from 'react-router-dom';

const PanelAdministrador = () => {
  const [productos, setProductos] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [error, setError] = useState('');
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [isUpdatePopupVisible, setIsUpdatePopupVisible] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isCreatePopupVisible, setIsCreatePopupVisible] = useState(false);
  const [newArticulo, setNewArticulo] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    marca: '',
    stock: '',
    imagen: null,
  });
  const entregadas = facturas.filter((factura) => factura.entregado);
  const noEntregadas = facturas.filter((factura) => !factura.entregado);

  useEffect(() => {
    fetchFacturas();
    fetchProductos();
  }, []);

  const fetchFacturas = async () => {
    try {
      const response = await getFacturas();
      console.log(response);
      setFacturas(response);
    } catch (error) {
      setError('Error al cargar las facturas');
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await getProductos();
      setProductos(response);
    } catch (error) {
      setError('Error al cargar los productos');
    }
  };

  const confirmUpdate = () => {
    const newEntregadoState = !selectedFactura.entregado;
    handleUpdateFactura(selectedFactura.id, { entregado: newEntregadoState });
    setShowConfirm(false);
    setSelectedFactura(null);
  };

  const cancelUpdate = () => {
    setShowConfirm(false);
    setSelectedFactura(null);
  };

  const handleUpdateProducto = async (id, updatedData) => {
    try {
      let token = localStorage.getItem('Token');
      if (!token) {
        setError('No se encontró el token. Por favor, inicie sesión.');
        return;
      }
      token = token.replace(/"/g, '');

      const formData = new FormData();
      const updatedDataCopy = { ...updatedData };
      delete updatedDataCopy.imagen; // Eliminar la URL de la imagen existente
      delete updatedDataCopy.nuevaImagen; // Eliminar la propiedad nuevaImagen

      formData.append('producto', JSON.stringify(updatedDataCopy));
      if (updatedData.nuevaImagen) {
        formData.append('file', updatedData.nuevaImagen);
      }

      await updateProducto(id, formData, token);
      fetchProductos();
      setIsUpdatePopupVisible(false);
    } catch (error) {
      console.log(error);
      setError('Error al actualizar el artículo');
    }
  };

  const handleDeleteProducto = async (id) => {
    try {
      let token = localStorage.getItem('Token');
      token = token.replace(/"/g, '');
      await deleteProducto(id, token);
      fetchProductos();
      setIsDeletePopupVisible(false);
    } catch (error) {
      setError('Error al eliminar el artículo');
    }
  };

  const handleCreateProducto = async () => {
    try {
      let token = localStorage.getItem('Token');
      if (!token) {
        setError('No se encontró el token. Por favor, inicie sesión.');
        return;
      }
      token = token.replace(/"/g, '');

      const formData = new FormData();
      const newArticuloCopy = { ...newArticulo };
      delete newArticuloCopy.imagen; // Eliminar la URL de la imagen existente si la hay

      formData.append('producto', JSON.stringify(newArticuloCopy));
      if (newArticulo.imagen) {
        formData.append('file', newArticulo.imagen);
      }

      await createProducto(formData, token);
      fetchProductos();
      setIsCreatePopupVisible(false);
    } catch (error) {
      console.log(error);
      setError('Error al crear el artículo');
    }
  };

  const openUpdatePopup = (articulo) => {
    setSelectedProducto(articulo);
    setIsUpdatePopupVisible(true);
  };

  const openDeletePopup = (articulo) => {
    setSelectedProducto(articulo);
    setIsDeletePopupVisible(true);
  };

  const openCreatePopup = () => {
    setIsCreatePopupVisible(true);
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
      fetchFacturas();
    } catch (error) {
      console.log(error);
      setError('Error al actualizar la factura');
    }
  };

  const handleConfirm = (factura) => {
    setSelectedFactura(factura);
    setShowConfirm(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Panel de Administrador
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Artículos en Venta</h2>
        <button
          onClick={openCreatePopup}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Crear Nuevo Artículo
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Imagen</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Descripcion</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((articulo) => (
                <tr key={articulo.id}>
                  <td className="py-2 px-4 border-b">{articulo.id}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={articulo.imagen}
                      alt={articulo.nombre}
                      className="w-20 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{articulo.nombre}</td>
                  <td className="py-2 px-4 border-b">{articulo.descripcion}</td>
                  <td className="py-2 px-4 border-b">{articulo.precio}$</td>
                  <td className="py-2 px-4 border-b">{articulo.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openUpdatePopup(articulo)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => openDeletePopup(articulo)}
                      className="text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Pedidos No Entregados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Fecha</th>
                <th className="py-2 px-4 border-b">Precio Total</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noEntregadas.map((factura) => (
                <tr key={factura.id}>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/detalleFactura/${factura.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {factura.id ? factura.id : 'ID no disponible'}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(factura.fecha)}
                  </td>
                  <td className="py-2 px-4 border-b">{factura.precioTotal}$</td>
                  <td className="py-2 px-4 border-b">No Enviado</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleConfirm(factura)}
                      className="text-blue-500 hover:underline"
                    >
                      Marcar como Enviado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Pedidos Entregados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Fecha</th>
                <th className="py-2 px-4 border-b">Precio Total</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {entregadas.map((factura) => (
                <tr key={factura.id}>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/detalleFactura/${factura.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {factura.id ? factura.id : 'ID no disponible'}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(factura.fecha)}
                  </td>
                  <td className="py-2 px-4 border-b">{factura.precioTotal}$</td>
                  <td className="py-2 px-4 border-b">Enviado</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleConfirm(factura)}
                      className="text-blue-500 hover:underline"
                    >
                      Marcar como No Enviado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">
              ¿Realmente quieres modificar el envio?
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

      {isUpdatePopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modificar Producto</h2>
            <input
              type="text"
              value={selectedProducto.nombre}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  nombre: e.target.value,
                })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              value={selectedProducto.descripcion}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  descripcion: e.target.value,
                })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              value={selectedProducto.precio}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  precio: e.target.value,
                })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <div className="mb-2">
              <label className="block mb-1">Imagen actual:</label>
              <img
                src={selectedProducto.imagen}
                alt="Imagen del producto"
                className="mb-2 w-32 h-32 object-cover"
              />
              <input
                type="file"
                onChange={(e) =>
                  setSelectedProducto({
                    ...selectedProducto,
                    nuevaImagen: e.target.files[0],
                  })
                }
                className="mb-2 p-2 border rounded w-full"
              />
            </div>
            <input
              type="text"
              value={selectedProducto.stock}
              onChange={(e) =>
                setSelectedProducto({
                  ...selectedProducto,
                  stock: e.target.value,
                })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() =>
                  handleUpdateProducto(selectedProducto.id, selectedProducto)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsUpdatePopupVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeletePopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Eliminar Producto</h2>
            <p>¿Está seguro que quiere eliminar este producto?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDeleteProducto(selectedProducto.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Aceptar
              </button>
              <button
                onClick={() => setIsDeletePopupVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreatePopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Artículo</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newArticulo.nombre}
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, nombre: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newArticulo.descripcion}
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, descripcion: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="number"
              placeholder="Precio"
              value={newArticulo.precio}
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, precio: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Categoría"
              value={newArticulo.categoria}
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, categoria: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Marca"
              value={newArticulo.marca}
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, marca: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={newArticulo.cantidad}
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, stock: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewArticulo({ ...newArticulo, imagen: e.target.files[0] })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCreateProducto}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Crear
              </button>
              <button
                onClick={() => setIsCreatePopupVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelAdministrador;
