import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/authContext'; // Asegúrate de que la ruta sea correcta
import { obtenerUsuario } from '/src/Services/usuariosService.js';

function Login() {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const { handlerLogin } = useContext(AuthContext);

  const handleLogin = async (data) => {
    try {
      const loginData = { email: data.email, password: data.password };
      const response = await obtenerUsuario(loginData);
      console.log(response);
      let usuario = response.userName;
      let token = response.token;
      let id = response.id;
      let role = response.role;
      setMensajeConfirmacion(`Bienvenido ${usuario}`);
      handlerLogin(usuario, token, id, role);
      const lastPath = localStorage.getItem('lastPath') || '/';
      setTimeout(() => {
        navigate(lastPath);
      }, 2000);
    } catch (error) {
      setMensajeConfirmacion(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-12">
      <div className="w-full max-w-md bg-white rounded-lg m-3 shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
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
        <form onSubmit={handleSubmit(handleLogin)}>
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
              {...register('email', { required: 'El email es obligatorio' })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
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
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !isValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Ingresar
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <p className="text-gray-700 text-sm">
              ¿Todavía no estás registrado?{' '}
              <NavLink
                className="font-bold text-blue-500 hover:text-blue-800"
                to="/registro"
              >
                Regístrate acá
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
