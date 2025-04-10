
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Development = () => {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Desarrollo de Aplicaciones</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Convertimos tus prototipos en aplicaciones completamente funcionales y listas para el mercado.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios de desarrollo</h2>
            <p className="mb-4">
              En Kustoc ofrecemos un servicio completo de desarrollo de software, desde la creación del primer prototipo hasta la implementación de la aplicación final en producción.
            </p>
          </section>
          
          <section className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Desarrollo Web</h3>
              <p className="text-muted-foreground mb-4">
                Creamos sitios web y aplicaciones web modernas, responsivas y escalables.
              </p>
              <ul className="space-y-2">
                <li>• Aplicaciones React/Next.js</li>
                <li>• Comercio electrónico</li>
                <li>• Dashboards interactivos</li>
                <li>• Integraciones API</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Apps Móviles</h3>
              <p className="text-muted-foreground mb-4">
                Desarrollamos aplicaciones nativas e híbridas para iOS y Android.
              </p>
              <ul className="space-y-2">
                <li>• React Native</li>
                <li>• Swift/SwiftUI</li>
                <li>• Flutter</li>
                <li>• Integraciones con hardware</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Backend & APIs</h3>
              <p className="text-muted-foreground mb-4">
                Construimos backends robustos y APIs eficientes para tus aplicaciones.
              </p>
              <ul className="space-y-2">
                <li>• Node.js/Express</li>
                <li>• Python/Django/FastAPI</li>
                <li>• Bases de datos SQL/NoSQL</li>
                <li>• Arquitecturas serverless</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestro Proceso de Desarrollo</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Planificación y Diseño</h3>
                  <p className="text-muted-foreground">Definición de requisitos, arquitectura técnica y diseño de la interfaz de usuario.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Desarrollo Iterativo</h3>
                  <p className="text-muted-foreground">Implementación en sprints, con entregas frecuentes para validar el avance.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Pruebas y QA</h3>
                  <p className="text-muted-foreground">Pruebas rigurosas para garantizar la calidad, seguridad y rendimiento.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Despliegue</h3>
                  <p className="text-muted-foreground">Implementación en producción y configuración de infraestructura.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-medium">Mantenimiento y Soporte</h3>
                  <p className="text-muted-foreground">Soporte continuo y evolución del producto.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tecnologías que utilizamos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded p-4 text-center">React</div>
              <div className="border rounded p-4 text-center">Next.js</div>
              <div className="border rounded p-4 text-center">Node.js</div>
              <div className="border rounded p-4 text-center">Python</div>
              <div className="border rounded p-4 text-center">TypeScript</div>
              <div className="border rounded p-4 text-center">AWS</div>
              <div className="border rounded p-4 text-center">PostgreSQL</div>
              <div className="border rounded p-4 text-center">MongoDB</div>
              <div className="border rounded p-4 text-center">React Native</div>
              <div className="border rounded p-4 text-center">SwiftUI</div>
              <div className="border rounded p-4 text-center">Flutter</div>
              <div className="border rounded p-4 text-center">Docker</div>
            </div>
          </section>
          
          <section className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">¿Tienes un proyecto en mente?</h2>
            <p className="mb-6">Contáctanos para discutir cómo podemos ayudarte a convertir tu idea en realidad.</p>
            <Link to="/contact">
              <Button className="bg-bloodRed hover:bg-red-900">Contactar</Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Development;
