import axios from 'axios';

export const getProductos = async () => {
  try {
    const response = await axios.get('/productos.json');

    return response.data;
  } catch (error) {
    console.error('Error al buscar productos', error);
    return localResponse.data;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await axios.get('/productos.json');
    const producto = response.data.find(
      (producto) => producto.id === parseInt(id, 10),
    ); // Asegurarse de que el id es un número

    if (!producto) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }

    return producto;
  } catch (error) {
    console.error('Error al buscar producto', error);
    return { error: error.message };
  }
};
