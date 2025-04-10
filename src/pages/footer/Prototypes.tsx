
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Prototypes = () => {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Nuestros Prototipos</h1>
        <p className="text-lg text-muted-foreground mb-8">
          En Kustoc, nos especializamos en la creación de prototipos funcionales que transforman ideas en realidades tangibles.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">¿Qué es un prototipo?</h2>
            <p className="mb-4">
              Un prototipo es una versión preliminar de un producto o servicio que permite visualizar, probar y validar su concepto antes de invertir en su desarrollo completo.
            </p>
            <p className="mb-4">
              Nuestros prototipos están diseñados para ser funcionales, permitiéndote interactuar con ellos como si fueran el producto final.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Tipos de Prototipos</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Prototipo Normal</h3>
                <p className="text-muted-foreground mb-4">
                  Ideal para validar conceptos básicos y obtener feedback inicial.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>• Hasta 5 pantallas interactivas</li>
                  <li>• Diseño básico adaptado a tu marca</li>
                  <li>• 1 revisión incluida</li>
                  <li>• Entrega en 7 días</li>
                </ul>
                <p className="font-semibold mb-4">Precio: €1500</p>
                <Link to="/pricing">
                  <Button className="w-full bg-bloodRed hover:bg-red-900">Ver detalles</Button>
                </Link>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">Prototipo Premium</h3>
                <p className="text-muted-foreground mb-4">
                  Perfecto para conceptos más complejos que requieren mayor detalle.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>• Hasta 10 pantallas interactivas</li>
                  <li>• Diseño avanzado personalizado</li>
                  <li>• 3 revisiones incluidas</li>
                  <li>• Soporte prioritario</li>
                  <li>• Entrega en 14 días</li>
                </ul>
                <p className="font-semibold mb-4">Precio: €3000</p>
                <Link to="/pricing">
                  <Button className="w-full bg-bloodRed hover:bg-red-900">Ver detalles</Button>
                </Link>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Proceso de Creación</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Consulta Inicial</h3>
                  <p className="text-muted-foreground">Analizamos tu idea y requisitos para entender completamente tu visión.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Diseño Conceptual</h3>
                  <p className="text-muted-foreground">Creamos wireframes y mockups para visualizar la estructura y flujo.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Desarrollo del Prototipo</h3>
                  <p className="text-muted-foreground">Convertimos los diseños en un prototipo interactivo y funcional.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Revisión y Refinamiento</h3>
                  <p className="text-muted-foreground">Incorporamos tu feedback para pulir el prototipo.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-bloodRed text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-medium">Entrega Final</h3>
                  <p className="text-muted-foreground">Recibe tu prototipo listo para ser probado con usuarios reales.</p>
                </div>
              </li>
            </ol>
          </section>
          
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">¿Listo para dar vida a tu idea?</h2>
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
