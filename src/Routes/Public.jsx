import { Route, Routes } from 'react-router-dom';
import Nosotros from '../Pages/Nosotros';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

import Contacto from '../Pages/Contacto';
import Carrito from '../Pages/Carrito';
import Registrarse from '../Pages/Registrarse';
import Detalle from '../Pages/Detalle';

function Public() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/registro" element={<Registrarse />} />
      <Route path="/descripcion/:id" element={<Detalle />} />
    </Routes>
  );
}

export default Public;
