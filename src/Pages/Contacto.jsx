import React from 'react';

const Contacto = () => {
  return (
    <div className="flex h-screen p-20">
      <div className="flex-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d818.1865750372822!2d-58.12718694534735!3d-34.8877164827893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2d900503a99a1%3A0x53cf11ba298b75db!2sAmapola!5e0!3m2!1ses-419!2sar!4v1733096602406!5m2!1ses-419!2sar"
          className="w-full h-full border-0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Amapola Tienda Natural</h2>
        <p className="mb-2">Dirección: Calle Falsa 123, Villa Elisa</p>
        <p className="mb-4">Teléfono: 123411124</p>
        <div className="flex space-x-4">
          <a
            href="https://wa.me/123411124"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
              alt="WhatsApp"
              className="w-10 h-10"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
              alt="Facebook"
              className="w-10 h-10"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"
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
