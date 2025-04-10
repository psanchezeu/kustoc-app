
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Consultation = () => {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Servicios de Consultoría</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ayudamos a empresas y emprendedores a definir, refinir y ejecutar sus estrategias digitales y tecnológicas.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestra consultoría?</h2>
            <p className="mb-4">
              En Kustoc, combinamos experiencia técnica con visión de negocio para ofrecer soluciones que generan valor real para nuestros clientes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-2">Enfoque Práctico</h3>
                  <p className="text-muted-foreground">No solo recomendamos, también implementamos soluciones concretas.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-2">Experiencia Diversa</h3>
                  <p className="text-muted-foreground">Trabajo con startups, empresas medianas y corporaciones en diversos sectores.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-2">Resultados Medibles</h3>
                  <p className="text-muted-foreground">Nos enfocamos en KPIs concretos para medir el impacto de nuestro trabajo.</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios de Consultoría</h2>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Estrategia Digital</h3>
                <p className="text-muted-foreground mb-4">
                  Definimos la hoja de ruta para la transformación digital de tu empresa.
                </p>
                <ul className="space-y-2">
                  <li>• Auditoría digital</li>
                  <li>• Planificación estratégica</li>
                  <li>• Roadmap tecnológico</li>
                  <li>• Optimización de procesos</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Innovación de Producto</h3>
                <p className="text-muted-foreground mb-4">
                  Te ayudamos a conceptualizar, validar y lanzar nuevos productos digitales.
                </p>
                <ul className="space-y-2">
                  <li>• Ideación de producto</li>
                  <li>• Validación de mercado</li>
                  <li>• Diseño de MVP</li>
                  <li>• Estrategia de escalamiento</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Arquitectura Tecnológica</h3>
                <p className="text-muted-foreground mb-4">
                  Diseñamos arquitecturas escalables y soluciones técnicas robustas.
                </p>
                <ul className="space-y-2">
                  <li>• Evaluación de stack tecnológico</li>
                  <li>• Recomendaciones de arquitectura</li>
                  <li>• Estrategia de migración</li>
                  <li>• Seguridad y compliance</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Metodología</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Descubrimiento</h3>
                  <p className="text-muted-foreground">Entendemos tu negocio, objetivos y desafíos actuales.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Análisis</h3>
                  <p className="text-muted-foreground">Evaluamos tu situación actual e identificamos oportunidades de mejora.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Estrategia</h3>
                  <p className="text-muted-foreground">Desarrollamos un plan de acción concreto y medible.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Implementación</h3>
                  <p className="text-muted-foreground">Te acompañamos en la ejecución del plan estratégico.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-medium">Medición y Optimización</h3>
                  <p className="text-muted-foreground">Evaluamos resultados y ajustamos la estrategia según sea necesario.</p>
                </div>
              </li>
            </ol>
          </section>
          
          <section className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">¿Necesitas orientación para tu proyecto?</h2>
            <p className="mb-6">Agenda una sesión de consultoría inicial gratuita de 30 minutos con nuestros expertos.</p>
            <Link to="/contact">
              <Button className="bg-bloodRed hover:bg-red-900">Agendar Consulta</Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
