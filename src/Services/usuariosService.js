import axios from 'axios';

export const guardarUsuario = async (data) => {
  try {
    const response = await axios.post(
      'https://apiproyectofinal-production-3eb4.up.railway.app/auth/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      throw new Error('Error al realizar la solicitud.');
    }
  }
};

export const obtenerUsuario = async (data) => {
  try {
    const response = await axios.post(
      'https://apiproyectofinal-production-3eb4.up.railway.app/auth/login',
      data,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      throw new Error('Error al realizar la solicitud.');
    }
  }
};
