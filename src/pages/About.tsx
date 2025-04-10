
import { Users, Trophy, Heart, Sparkles, Bot, Code } from "lucide-react";

const About = () => {
  return (
    <div className="container px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Sobre ProtoSpark
        </h1>
        <p className="text-xl text-muted-foreground">
          Somos un equipo apasionado por transformar ideas en realidad a través
          de la innovación y la tecnología.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-lg mb-4">
              En ProtoSpark, tenemos la misión de democratizar la creación de
              prototipos funcionales, permitiendo que cualquier persona o empresa
              pueda validar rápidamente sus ideas con soluciones reales.
            </p>
            <p className="text-lg">
              Creemos firmemente que las grandes ideas merecen la oportunidad de
              ser probadas, y estamos aquí para hacer ese proceso accesible,
              rápido y eficiente.
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden blood-gradient">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Sparkles className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Innovación Accesible</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Por Qué Existimos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-bloodRed text-white">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Experiencia</h3>
            <p className="text-muted-foreground">
              Años desarrollando prototipos exitosos para startups y empresas.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-bloodRed text-white">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pasión</h3>
            <p className="text-muted-foreground">
              Cada proyecto lo abordamos con entusiasmo y dedicación.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-bloodRed text-white">
              <Bot className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovación</h3>
            <p className="text-muted-foreground">
              Utilizamos IA para optimizar y acelerar nuestros procesos.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Nuestro Equipo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="text-center">
              <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-muted"></div>
              <h3 className="text-xl font-bold mb-1">Nombre Apellido</h3>
              <p className="text-sm text-muted-foreground mb-3">Cargo / Posición</p>
              <p className="text-muted-foreground text-sm">
                Breve descripción de su experiencia y especialidad.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          ¿Listo para Trabajar con Nosotros?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Estamos ansiosos por conocer tu idea y ayudarte a convertirla en un
          prototipo funcional.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/request-prototype" className="bg-bloodRed hover:bg-red-900 text-white px-6 py-3 rounded-md font-medium">
            Solicitar Prototipo
          </a>
          <a href="/contact" className="border border-input hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-md font-medium">
            Contactar
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
