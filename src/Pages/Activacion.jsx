import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';

const Activacion = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8">
        <FaThumbsUp className="text-green-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          ¡Su cuenta ha sido activada correctamente!
        </h1>
        <NavLink
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar sesión
        </NavLink>
      </div>
    </div>
  );
};

export default Activacion;
