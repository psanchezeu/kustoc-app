
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Pricing = () => {
  const features = [
    "Formulario detallado",
    "Prototipo funcional",
    "Interfaz de usuario",
    "Chat de soporte",
    "Revisiones incluidas",
    "Documentación",
    "Reunión personalizada",
    "Prioridad en cola"
  ];

  const normalPlan = {
    name: "Prototipo Normal",
    price: "1500 €",
    description: "Perfecto para validar conceptos básicos rápidamente",
    delivery: "6 días",
    features: {
      "Formulario detallado": true,
      "Prototipo funcional": true,
      "Interfaz de usuario": true,
      "Chat de soporte": "5/7",
      "Revisiones incluidas": "1",
      "Documentación": false,
      "Reunión personalizada": false,
      "Prioridad en cola": false
    }
  };

  const premiumPlan = {
    name: "Prototipo Premium",
    price: "3500 €",
    description: "Para ideas que necesitan mayor detalle y funcionalidad",
    delivery: "10 días",
    features: {
      "Formulario detallado": true,
      "Prototipo funcional": true,
      "Interfaz de usuario": true,
      "Chat de soporte": "24/7",
      "Revisiones incluidas": "3",
      "Documentación": true,
      "Reunión personalizada": true,
      "Prioridad en cola": true
    }
  };

  return (
    <div className="container px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Planes y Precios</h1>
        <p className="text-xl text-muted-foreground">
          Elige el plan que mejor se adapte a tus necesidades y comienza a dar forma a tus ideas hoy mismo.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Normal Plan */}
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{normalPlan.name}</h2>
                <div className="text-5xl font-bold mb-2">{normalPlan.price}</div>
                <p className="text-muted-foreground mb-2">{normalPlan.description}</p>
                <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm">
                  Entrega en {normalPlan.delivery}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between">
                    <span>{feature}</span>
                    {normalPlan.features[feature] === true ? (
                      <CheckCircle2 className="h-5 w-5 text-bloodRed" />
                    ) : normalPlan.features[feature] === false ? (
                      <X className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <span className="font-medium">{normalPlan.features[feature]}</span>
                    )}
                  </div>
                ))}
              </div>

              <Link to="/request-prototype" className="block">
                <Button className="w-full bg-bloodRed hover:bg-red-900 py-6">
                  Solicitar Ahora
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-bloodRed hover:shadow-lg transition-all relative">
            <div className="absolute top-0 right-0 bg-bloodRed text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
              Recomendado
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{premiumPlan.name}</h2>
                <div className="text-5xl font-bold mb-2">{premiumPlan.price}</div>
                <p className="text-muted-foreground mb-2">{premiumPlan.description}</p>
                <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm">
                  Entrega en {premiumPlan.delivery}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between">
                    <span>{feature}</span>
                    {premiumPlan.features[feature] === true ? (
                      <CheckCircle2 className="h-5 w-5 text-bloodRed" />
                    ) : premiumPlan.features[feature] === false ? (
                      <X className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <span className="font-medium">{premiumPlan.features[feature]}</span>
                    )}
                  </div>
                ))}
              </div>

              <Link to="/request-prototype" className="block">
                <Button className="w-full bg-bloodRed hover:bg-red-900 py-6">
                  Solicitar Ahora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center p-8 border border-dashed rounded-lg">
          <h3 className="text-2xl font-bold mb-4">¿Necesitas algo personalizado?</h3>
          <p className="text-muted-foreground mb-6">
            Contáctanos para discutir tus requisitos específicos y obtener un presupuesto a medida.
          </p>
          <Link to="/contact">
            <Button variant="outline">Contactar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
