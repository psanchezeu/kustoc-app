
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Completa el formulario",
      description:
        "Describe tu idea, selecciona funcionalidades y comparte detalles sobre tu proyecto.",
    },
    {
      number: 2,
      title: "Elige tu plan",
      description:
        "Selecciona entre nuestro plan Normal (6 días) o Premium (10 días) según tus necesidades.",
    },
    {
      number: 3,
      title: "Realiza el pago",
      description:
        "Proceso seguro a través de Stripe con diferentes opciones de pago.",
    },
    {
      number: 4,
      title: "Seguimiento en tiempo real",
      description:
        "Accede a tu dashboard para ver el progreso y comunicarte con el equipo.",
    },
    {
      number: 5,
      title: "Recibe tu prototipo",
      description:
        "Descarga tu prototipo funcional listo para usar o solicitar modificaciones.",
    },
  ];

  return (
    <div className="container px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Cómo Funciona Kustoc
        </h1>
        <p className="text-xl text-muted-foreground">
          Nuestro proceso está diseñado para ser simple, rápido y efectivo. Sigue
          estos pasos para transformar tu idea en un prototipo real.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-[29px] top-10 bottom-10 w-0.5 bg-muted md:left-1/2 md:-ml-0.5" />

          {steps.map((step, index) => (
            <div key={index} className="relative mb-16 md:mb-24">
              <div className="flex items-center md:justify-center">
                <div className="z-10 flex items-center justify-center w-14 h-14 rounded-full bg-background border-2 border-bloodRed text-bloodRed font-bold shadow-md md:absolute md:left-1/2 md:-ml-7">
                  {step.number}
                </div>
                <div className="ml-6 md:ml-0 md:w-1/2 md:pr-12 md:text-right md:flex md:flex-col md:items-end">
                  {index % 2 === 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </>
                  )}
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-12 md:text-left">
                  {index % 2 === 1 && (
                    <>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 ml-20 md:hidden">
                {index % 2 === 1 && (
                  <>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center px-4">
          <div className="bg-secondary/50 py-10 px-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Transforma tu idea en realidad con nuestro servicio de prototipos. 
              El proceso es simple y el resultado sorprendente.
            </p>
            <Link to="/request-prototype">
              <Button className="bg-bloodRed hover:bg-red-900 text-lg py-6 px-8">
                Solicitar mi Prototipo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
