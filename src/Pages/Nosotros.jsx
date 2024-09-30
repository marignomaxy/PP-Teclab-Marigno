import { useRef, useEffect } from 'react';

function Nosotros() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.2; // Reproduce el video a la mitad de la velocidad
    }
  }, []);

  return (
    <>
      {/* Video Section */}
      <div>
        <video
          ref={videoRef}
          src="https://i.gifer.com/Qtxm.mp4"
          autoPlay
          loop
          muted
          className="w-full videoHome"
        />
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 xl:px-12">
        <h1 className="font-poppins font-800 text-3xl lg:text-5xl text-center mt-3 mb-5">
          Amapola, Tienda natural
        </h1>

        {/* Paragraphs Container */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-poppins mb-2 px-4">
            Bienvenidos a Amapola, Tienda Natural, un espacio dedicado a cuidar
            de ti y de tu bienestar a través de productos 100% naturales. En
            Amapola, creemos en la armonía entre el cuerpo, la mente y la
            naturaleza. Por eso, nuestra misión es ofrecerte los mejores
            productos naturales que te ayuden a alcanzar un equilibrio saludable
            y sostenible en tu vida diaria.
          </p>

          {/* Sections with Information */}
          <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-4 mb-2">
            {/* Section 1 */}
            <div className="bg-primaryGreen rounded-22 mx-2 text-black p-4 mb-4 lg:mb-0 lg:w-1/3">
              <h2 className="font-poppins text-xl lg:text-2xl mb-2 font-bold">
                Nuestro Compromiso con la Calidad y el Servicio
              </h2>
              <p className="font-poppins">
                En Amapola, nos esforzamos cada día para brindarte el mejor
                servicio posible. Sabemos que cada persona es única, y por eso
                nos dedicamos a escucharte y entender tus necesidades
                específicas. Nuestro equipo de expertos está aquí para
                asesorarte y guiarte en la elección de productos que realmente
                marquen una diferencia en tu vida.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-primaryGreen rounded-22 mx-2 text-black p-4 mb-4 lg:mb-0 lg:w-1/3">
              <h2 className="font-poppins text-xl lg:text-2xl mb-2 font-bold">
                Productos Naturales para el Bienestar Integral
              </h2>
              <p className="font-poppins">
                Creemos que lo natural es lo mejor para el cuerpo y la mente.
                Por eso, en Amapola ofrecemos una amplia gama de productos que
                respetan la pureza de los ingredientes naturales. Nuestros
                productos están diseñados para ayudarte a cuidar tu salud de
                manera integral, desde dentro hacia fuera. Queremos ser tu
                aliado en la búsqueda de un estilo de vida más saludable,
                ofreciéndote alternativas que respeten tanto tu bienestar como
                el medio ambiente.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-primaryGreen rounded-22 mx-2 text-black p-4 lg:w-1/3">
              <h2 className="font-poppins text-xl lg:text-2xl mb-2 font-bold">
                Nuestra Misión: Asesoramiento y Confianza
              </h2>
              <p className="font-poppins">
                Nuestra misión en Amapola va más allá de simplemente vender
                productos. Queremos ser tu fuente de confianza cuando se trata
                de productos naturales. Nos apasiona educar y asesorar a
                nuestros clientes para que puedan tomar decisiones informadas
                sobre su salud y bienestar. Estamos aquí para ayudarte a
                descubrir los beneficios de los productos naturales y cómo
                pueden transformar tu vida de manera positiva.
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <h2 className="font-poppins text-xl lg:text-2xl mb-2 font-bold">
            Únete a la Comunidad Amapola
          </h2>
          <p className="font-poppins mb-5 px-4">
            Te invitamos a explorar nuestra página web y descubrir todo lo que
            Amapola tiene para ofrecer. Únete a nuestra comunidad y comienza tu
            viaje hacia un estilo de vida más saludable y natural. Estamos aquí
            para acompañarte en cada paso del camino, brindándote el apoyo, el
            conocimiento y los productos que necesitas para vivir tu mejor vida,
            naturalmente.
          </p>

          <p className="font-poppins font-bold mt-5 px-4">
            ¡Gracias por elegir Amapola, Tienda Natural! Aquí, cuidamos de ti y
            de la naturaleza, juntos.
          </p>
        </div>
      </div>
    </>
  );
}

export default Nosotros;
