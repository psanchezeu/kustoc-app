
import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
        <p className="text-muted-foreground mb-8">Última actualización: 10 de abril de 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introducción</h2>
            <p className="mb-3">
              Estos términos y condiciones (los "Términos") rigen el uso del sitio web de Kustoc (el "Sitio") y los servicios de prototipos, desarrollo y consultoría (los "Servicios") proporcionados por Kustoc ("nosotros", "nuestro" o "la Empresa").
            </p>
            <p className="mb-3">
              Al acceder a nuestro Sitio y utilizar nuestros Servicios, aceptas estos Términos en su totalidad. Si no estás de acuerdo con estos Términos, no debes utilizar nuestro Sitio ni nuestros Servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Uso del Sitio</h2>
            <p className="mb-3">
              2.1 Al utilizar nuestro Sitio, garantizas que tienes al menos 18 años de edad o que estás accediendo al Sitio bajo la supervisión de un padre o tutor legal.
            </p>
            <p className="mb-3">
              2.2 Te comprometes a utilizar el Sitio únicamente para fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del Sitio por parte de cualquier tercero.
            </p>
            <p className="mb-3">
              2.3 Nos reservamos el derecho de restringir el acceso a ciertas áreas del Sitio, o al Sitio completo, a nuestra discreción.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Servicios de Prototipado y Desarrollo</h2>
            <p className="mb-3">
              3.1 Nuestros servicios de prototipado y desarrollo están sujetos a acuerdos específicos que se establecerán por separado con cada cliente.
            </p>
            <p className="mb-3">
              3.2 Los plazos de entrega, alcance del proyecto y costos se acordarán antes del inicio de cualquier trabajo. Cualquier cambio en el alcance del proyecto puede resultar en ajustes a los plazos y costos.
            </p>
            <p className="mb-3">
              3.3 La propiedad intelectual de los prototipos y desarrollos se transferirá al cliente solo después del pago completo de los servicios acordados, a menos que se especifique lo contrario en un acuerdo por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Servicios de Consultoría</h2>
            <p className="mb-3">
              4.1 Nuestros servicios de consultoría se proporcionan "tal cual" y no garantizamos resultados específicos a menos que se establezca explícitamente en un acuerdo por escrito.
            </p>
            <p className="mb-3">
              4.2 Los consejos y recomendaciones proporcionados como parte de nuestros servicios de consultoría se basan en nuestra experiencia y conocimiento profesional, pero la decisión final sobre la implementación de dichos consejos recae exclusivamente en el cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Pagos</h2>
            <p className="mb-3">
              5.1 Los precios de nuestros Servicios están sujetos a cambios, pero cualquier cambio no afectará los pedidos para los cuales ya hayamos enviado una confirmación.
            </p>
            <p className="mb-3">
              5.2 El pago debe realizarse en su totalidad antes del inicio del trabajo, a menos que se acuerde lo contrario en un contrato separado.
            </p>
            <p className="mb-3">
              5.3 Si los pagos no se realizan según lo acordado, nos reservamos el derecho de suspender o terminar los Servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Propiedad Intelectual</h2>
            <p className="mb-3">
              6.1 El Sitio y todo su contenido, características y funcionalidad son propiedad de la Empresa, sus licenciantes u otros proveedores de dicho material y están protegidos por leyes de propiedad intelectual.
            </p>
            <p className="mb-3">
              6.2 No debes reproducir, distribuir, modificar, crear trabajos derivados, mostrar públicamente, realizar públicamente, republicar, descargar, almacenar o transmitir cualquier material de nuestro Sitio, excepto según lo permitido por estos Términos.
            </p>
            <p className="mb-3">
              6.3 En cuanto a los Servicios, la propiedad intelectual se regirá por los acuerdos específicos establecidos con cada cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Limitación de Responsabilidad</h2>
            <p className="mb-3">
              7.1 En ningún caso la Empresa, sus directores, empleados, socios, agentes, proveedores o afiliados serán responsables por cualquier daño indirecto, consecuente, incidental, especial o punitivo, incluidos, entre otros, pérdida de ganancias, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tu acceso o uso, o incapacidad para acceder o usar el Sitio.</li>
              <li>Cualquier conducta o contenido de cualquier tercero en el Sitio.</li>
              <li>Cualquier contenido obtenido del Sitio.</li>
              <li>Acceso no autorizado, uso o alteración de tus transmisiones o contenido.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Indemnización</h2>
            <p className="mb-3">
              Aceptas defender, indemnizar y eximir de responsabilidad a la Empresa y sus licenciantes, afiliados, empleados, contratistas, agentes, directores y otros representantes de y contra todas y cada una de las reclamaciones, responsabilidades, daños, pérdidas y gastos, incluidos, entre otros, honorarios y costos legales y contables razonables, que surjan de o en cualquier manera relacionados con tu acceso o uso del Sitio o los Servicios, o tu violación de estos Términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Cambios en los Términos</h2>
            <p className="mb-3">
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Si hacemos cambios materiales a estos Términos, te notificaremos, ya sea a través de la dirección de correo electrónico asociada a tu cuenta o colocando un aviso prominente en nuestro Sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Ley Aplicable</h2>
            <p className="mb-3">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus normas de conflicto de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contacto</h2>
            <p className="mb-3">
              Cualquier pregunta sobre estos Términos debe dirigirse a:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p>Email: legal@kustoc.com</p>
              <p>Dirección postal: Calle Gran Vía, 123, 28013 Madrid, España</p>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-muted-foreground">
              Al utilizar nuestro Sitio o Servicios, confirmas que has leído, entendido y aceptado estos Términos y Condiciones y nuestra <Link to="/privacy" className="underline">Política de Privacidad</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
