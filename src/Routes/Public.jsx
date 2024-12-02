import { Route, Routes } from 'react-router-dom';
import Nosotros from '../Pages/Nosotros';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

import Contacto from '../Pages/Contacto';
import Carrito from '../Pages/Carrito';
import Registrarse from '../Pages/Registrarse';
import Detalle from '../Pages/Detalle';
import Activacion from '../Pages/Activacion';
import DetalleUsuario from '../Pages/DetalleUsuario';
import DetalleFactura from '../Pages/DetalleFactura';
import PanelAdministrador from '../Pages/PanelAdministrador';

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
      <Route path="/activado" element={<Activacion />} />
      <Route path="/detalleUsuario/:id" element={<DetalleUsuario />} />
      <Route path="/detalleFactura/:id" element={<DetalleFactura />} />
      <Route path="/adminPanel" element={<PanelAdministrador />} />
    </Routes>
  );
}

export default Public;
