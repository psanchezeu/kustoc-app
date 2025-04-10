
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sobre Kustoc</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Transformando ideas en soluciones digitales que generan impacto.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
            <p className="mb-4">
              Kustoc nació en 2021 con una misión clara: hacer accesible la innovación tecnológica a empresas de todos los tamaños.
            </p>
            <p className="mb-4">
              Lo que comenzó como un pequeño equipo de desarrolladores apasionados por la tecnología, se ha convertido en una consultora digital integral que ha ayudado a más de 100 clientes a transformar sus ideas en productos digitales exitosos.
            </p>
            <p>
              Nuestra experiencia combinada en desarrollo, diseño y estrategia de producto nos permite ofrecer soluciones holísticas que realmente atienden las necesidades del mercado y los usuarios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="italic text-lg">
                "Democratizar la creación de productos digitales y ayudar a emprendedores y empresas a materializar sus ideas a través de prototipos funcionales y soluciones tecnológicas accesibles."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Innovación</h3>
                <p className="text-muted-foreground">
                  Buscamos constantemente nuevas formas de crear soluciones más eficientes y efectivas.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Calidad</h3>
                <p className="text-muted-foreground">
                  Nos comprometemos con la excelencia en cada aspecto de nuestro trabajo.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Transparencia</h3>
                <p className="text-muted-foreground">
                  Mantenemos una comunicación clara y honesta con nuestros clientes en todo momento.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Colaboración</h3>
                <p className="text-muted-foreground">
                  Trabajamos de la mano con nuestros clientes como verdaderos socios estratégicos.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Agilidad</h3>
                <p className="text-muted-foreground">
                  Adaptamos nuestros procesos para entregar valor de forma rápida y continua.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Impacto</h3>
                <p className="text-muted-foreground">
                  Nos motiva crear soluciones que generen verdadero valor para los usuarios finales.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Experiencia Comprobada</h3>
                  <p className="text-muted-foreground">Más de 200 prototipos entregados con éxito para clientes de diversos sectores.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Equipo Multidisciplinario</h3>
                  <p className="text-muted-foreground">Contamos con especialistas en desarrollo, diseño UX, producto, y estrategia digital.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Proceso Probado</h3>
                  <p className="text-muted-foreground">Metodología ágil que garantiza resultados de calidad en tiempo récord.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Enfoque en Resultados</h3>
                  <p className="text-muted-foreground">Nos centramos en crear soluciones que realmente impacten en tu negocio.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Reconocimientos y Alianzas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="border rounded p-4 aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Partner AWS</span>
              </div>
              <div className="border rounded p-4 aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Google Cloud</span>
              </div>
              <div className="border rounded p-4 aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">Microsoft</span>
              </div>
              <div className="border rounded p-4 aspect-square flex items-center justify-center">
                <span className="text-muted-foreground">StartUp Spain</span>
              </div>
            </div>
          </section>
          
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Conoce al Equipo</h2>
              <p className="mb-6">Descubre a los profesionales que hacen posible Kustoc.</p>
              <Link to="/team">
                <Button variant="outline">Nuestro Equipo</Button>
              </Link>
            </div>
            
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
              <p className="mb-6">¿Tienes preguntas o quieres iniciar tu proyecto?</p>
              <Link to="/contact">
                <Button className="bg-bloodRed hover:bg-red-900">Contactar</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
