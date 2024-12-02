import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { guardarUsuario } from '../Services/usuariosService';

function Registrarse() {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const handleRegistro = async (data) => {
    try {
      const registroData = {
        firstname: data.nombre,
        lastname: data.apellido,
        email: data.email,
        password: data.password,
        phone: data.telefono,
        address: data.direccion,
        role: 'ROLE_USER',
      };
      const response = await guardarUsuario(registroData);
      const mensaje = response.data;

      setMensajeConfirmacion(mensaje);
    } catch (error) {
      setMensajeConfirmacion(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-12">
      <div className="w-full max-w-md bg-white rounded-lg m-3 shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {mensajeConfirmacion && (
          <div
            className={`${
              mensajeConfirmacion.includes('Usuario creado correctamente')
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            } px-4 py-3 rounded relative mt-4`}
            role="alert"
          >
            <strong className="font-bold font-poppins">
              {mensajeConfirmacion.includes('Usuario creado correctamente')
                ? '¡Procesado! '
                : '¡Error! '}
            </strong>
            <span className="block sm:inline font-poppins">
              {mensajeConfirmacion}
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit(handleRegistro)}>
          {/* Campo Nombre */}
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
              {...register('nombre', { required: 'El nombre es obligatorio.' })}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs italic">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Campo Apellido */}
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
              {...register('apellido', {
                required: 'El apellido es obligatorio.',
              })}
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs italic">
                {errors.apellido.message}
              </p>
            )}
          </div>

          {/* Campo Email */}
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
              {...register('email', {
                required: 'El email es obligatorio.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El formato del email no es válido.',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
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
              {...register('password', {
                required: 'La contraseña es obligatoria.',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres.',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    'La contraseña debe incluir al menos una letra mayúscula y un número.',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="telefono"
              type="text"
              {...register('telefono', {
                required: 'El teléfono es obligatorio.',
              })}
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs italic">
                {errors.telefono.message}
              </p>
            )}
          </div>

          {/* Campo Dirección */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="direccion"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="direccion"
              type="text"
              {...register('direccion', {
                required: 'La dirección es obligatoria.',
              })}
            />
            {errors.direccion && (
              <p className="text-red-500 text-xs italic">
                {errors.direccion.message}
              </p>
            )}
          </div>

          {/* Botón de Registro */}
          <div className="flex items-center justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !isValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={!isValid} // Deshabilita si el formulario no es válido
            >
              Registrarse
            </button>
          </div>

          {/* Enlace a Login */}
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
