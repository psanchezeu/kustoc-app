
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Prototypes = () => {
  return (
    <div className="bg-background py-16">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-left mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Nuestros Prototipos</h1>
          <p className="text-lg text-muted-foreground">
            En Kustoc, nos especializamos en la creación de prototipos funcionales que transforman ideas en realidades tangibles.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-left">¿Qué es un prototipo?</h2>
            <div className="text-left space-y-4">
              <p>
                Un prototipo es una versión preliminar de un producto o servicio que permite visualizar, probar y validar su concepto antes de invertir en su desarrollo completo.
              </p>
              <p>
                Nuestros prototipos están diseñados para ser funcionales, permitiéndote interactuar con ellos como si fueran el producto final.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-left">Tipos de Prototipos</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="border rounded-lg p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-3 text-left">Prototipo Normal</h3>
                <p className="text-muted-foreground mb-6 text-left">
                  Ideal para validar conceptos básicos y obtener feedback inicial.
                </p>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Hasta 5 pantallas interactivas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Diseño básico adaptado a tu marca</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>1 revisión incluida</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Entrega en 7 días</span>
                  </li>
                </ul>
                <div className="flex flex-col space-y-4">
                  <p className="font-semibold text-left text-lg">Precio: €1500</p>
                  <Link to="/pricing" className="text-left">
                    <Button className="w-full bg-bloodRed hover:bg-red-900">Ver detalles</Button>
                  </Link>
                </div>
              </div>
              
              <div className="border rounded-lg p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-3 text-left">Prototipo Premium</h3>
                <p className="text-muted-foreground mb-6 text-left">
                  Perfecto para conceptos más complejos que requieren mayor detalle.
                </p>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Hasta 10 pantallas interactivas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Diseño avanzado personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>3 revisiones incluidas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-bloodRed mr-2">•</span>
                    <span>Entrega en 14 días</span>
                  </li>
                </ul>
                <div className="flex flex-col space-y-4">
                  <p className="font-semibold text-left text-lg">Precio: €3000</p>
                  <Link to="/pricing" className="text-left">
                    <Button className="w-full bg-bloodRed hover:bg-red-900">Ver detalles</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-left">Proceso de Creación</h2>
            <ol className="space-y-6 text-left">
              <li className="flex gap-5">
                <div className="bg-bloodRed text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium text-lg">Consulta Inicial</h3>
                  <p className="text-muted-foreground">Analizamos tu idea y requisitos para entender completamente tu visión.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="bg-bloodRed text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium text-lg">Diseño Conceptual</h3>
                  <p className="text-muted-foreground">Creamos wireframes y mockups para visualizar la estructura y flujo.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="bg-bloodRed text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium text-lg">Desarrollo del Prototipo</h3>
                  <p className="text-muted-foreground">Convertimos los diseños en un prototipo interactivo y funcional.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="bg-bloodRed text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium text-lg">Revisión y Refinamiento</h3>
                  <p className="text-muted-foreground">Incorporamos tu feedback para pulir el prototipo.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="bg-bloodRed text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-medium text-lg">Entrega Final</h3>
                  <p className="text-muted-foreground">Recibe tu prototipo listo para ser probado con usuarios reales.</p>
                </div>
              </li>
            </ol>
          </section>
          
          <div className="bg-muted p-8 rounded-lg text-left">
            <h2 className="text-2xl font-semibold mb-3">¿Listo para dar vida a tu idea?</h2>
            <p className="mb-6">Solicita ahora tu prototipo y comienza a validar tu concepto</p>
            <Link to="/request-prototype">
              <Button className="bg-bloodRed hover:bg-red-900">Solicitar Prototipo</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prototypes;
