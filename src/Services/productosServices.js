import axios from 'axios';

export const getProductos = async () => {
  try {
    const response = await axios.get(
      'https://apiproyectofinal-production-3eb4.up.railway.app/productos',
    );

    return response.data;
  } catch (error) {
    console.error('Error al buscar productos', error);
    return localResponse.data;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await axios.get(
      `https://apiproyectofinal-production-3eb4.up.railway.app/productos/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error al buscar producto', error);
    return { error: error.message };
  }
};

export const createProducto = async (formData, token) => {
  try {
    const response = await axios.post(
      'https://apiproyectofinal-production-3eb4.up.railway.app/productos',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear producto', error);
    return { error: error.message };
  }
};

export const updateProducto = async (id, formData, token) => {
  try {
    const response = await axios.put(
      `https://apiproyectofinal-production-3eb4.up.railway.app/productos/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto', error);
    return { error: error.message };
  }
};

export const deleteProducto = async (id, token) => {
  try {
    const response = await axios.delete(
      `https://apiproyectofinal-production-3eb4.up.railway.app/productos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto', error);
    return { error: error.message };
  }
};
