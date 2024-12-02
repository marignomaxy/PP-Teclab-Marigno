import axios from 'axios';

export const getFacturaByUserId = async (id) => {
  try {
    const response = await axios.get(
      `https://apiproyectofinal-production-3eb4.up.railway.app/factura/user/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error al buscar factura', error);
    throw error;
  }
};

export const getFacturaById = async (id) => {
  try {
    const response = await axios.get(
      `https://apiproyectofinal-production-3eb4.up.railway.app/factura/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error al buscar factura', error);
    throw error;
  }
};

export const getFacturas = async () => {
  try {
    const response = await axios.get(
      'https://apiproyectofinal-production-3eb4.up.railway.app/factura',
    );
    return response.data;
  } catch (error) {
    console.error('Error al buscar facturas', error);
    throw error;
  }
};

export const createFactura = async (factura, token) => {
  try {
    console.log('token', token);
    const response = await axios.post(
      'https://apiproyectofinal-production-3eb4.up.railway.app/factura',
      factura,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear factura', error);
    throw error;
  }
};

export const updateFactura = async (id, factura, token) => {
  try {
    const response = await axios.put(
      `https://apiproyectofinal-production-3eb4.up.railway.app/factura/${id}`,
      factura,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar factura', error);
    throw error;
  }
};
