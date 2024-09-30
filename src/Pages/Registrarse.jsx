import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';
import { guardarUsuario } from '../Services/usuariosService';

function Registrarse() {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { handlerLogin } = useContext(AuthContext);

  const handleRegistro = async (data) => {
    try {
      const registroData = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        contraseña: data.password,
      };
      const response = await guardarUsuario(registroData);
      let usuario = response.usuario;
      let token = response.token;
      console.log('usuario y token recibidos', usuario, token); // Verifica que usuario y token se reciban correctamente
      setMensajeConfirmacion(`Bienvenido ${usuario?.nombre}`);
      handlerLogin(usuario.nombre, token);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error en handleRegistro', error); // Añade un log para el error
      setMensajeConfirmacion('Error al registrar el usuario');
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-12">
      <div className="w-full max-w-md bg-white rounded-lg m-3 shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {mensajeConfirmacion && (
          <div
            className={`${
              mensajeConfirmacion.includes('Bienvenido')
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            } px-4 py-3 rounded relative mt-4`}
            role="alert"
          >
            <strong className="font-bold font-poppins">
              {mensajeConfirmacion.includes('Bienvenido')
                ? '¡Procesado! '
                : '¡Error! '}
            </strong>
            <span className="block sm:inline font-poppins">
              {mensajeConfirmacion}
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit(handleRegistro)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              {...register('nombre', { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="apellido"
            >
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="apellido"
              type="text"
              {...register('apellido', { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              {...register('password', { required: true })}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrarse
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <p className="text-gray-700 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <NavLink
                className="font-bold text-blue-500 hover:text-blue-800"
                to="/login"
              >
                Inicia sesión acá
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registrarse;
