import axios from 'axios';

export const guardarUsuario = async (data) => {
  try {
    return {
      usuario: data,
      token: 'fake-jwt-token',
    };
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    throw new Error('Error al guardar el usuario');
  }
};

export const obtenerUsuario = async (data) => {
  const response = await axios.get('/usuarios.json');
  const usuarios = response.data;

  // Encuentra el usuario con el email y contraseña proporcionados
  const usuario = usuarios.find(
    (user) => user.email === data.email && user.contraseña === data.contraseña,
  );

  if (usuario) {
    return { usuario, token: 'fake-token' }; // Simula un token
  } else {
    throw new Error('Usuario o contraseña incorrectos');
  }
};
