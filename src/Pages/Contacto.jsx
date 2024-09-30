import React from 'react';

const Contacto = () => {
  return (
    <div className="flex h-screen p-20">
      <div className="flex-1">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627927975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1d7f7b0b1b!2sCalle%20Falsa%20123%2C%20Villa%20Elisa!5e0!3m2!1ses!2sar!4v1633021234567!5m2!1ses!2sar"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Nombre del Establecimiento</h2>
        <p className="mb-2">Dirección: Calle Falsa 123, Villa Elisa</p>
        <p className="mb-4">Teléfono: 123411124</p>
        <div className="flex space-x-4">
          <a
            href="https://wa.me/123411124"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="whatsapp-logo.png" alt="WhatsApp" className="w-10 h-10" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="facebook-logo.png" alt="Facebook" className="w-10 h-10" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="instagram-logo.png"
              alt="Instagram"
              className="w-10 h-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
