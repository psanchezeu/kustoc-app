
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Code, Users, Clock, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="blood-gradient absolute inset-0 opacity-5"></div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Convertimos tus Ideas en Prototipos Reales
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtén un prototipo funcional de tu aplicación en tiempo récord.
              Potenciado por IA, diseñado por expertos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-prototype">
                <Button className="bg-bloodRed hover:bg-red-900 text-lg py-6 px-8 w-full sm:w-auto">
                  Solicitar Prototipo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="text-lg py-6 px-8 w-full sm:w-auto">
                  Cómo Funciona
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir nuestros prototipos?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Diseñamos, construimos y entregamos en tiempo récord. Nuestra plataforma impulsada por IA te garantiza:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-bloodRed transition-all duration-300 shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-bloodRed/10 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-bloodRed" />
                </div>
                <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
                <p className="text-muted-foreground">
                  Recibe tu prototipo en 6-10 días, dependiendo del plan que elijas.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-bloodRed transition-all duration-300 shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-bloodRed/10 p-4 rounded-full mb-4">
                  <Code className="h-8 w-8 text-bloodRed" />
                </div>
                <h3 className="text-xl font-bold mb-2">Código Funcional</h3>
                <p className="text-muted-foreground">
                  No solo maquetas: recibes prototipos con funcionalidades reales.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-bloodRed transition-all duration-300 shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-bloodRed/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-bloodRed" />
                </div>
                <h3 className="text-xl font-bold mb-2">Equipo de Expertos</h3>
                <p className="text-muted-foreground">
                  Diseñadores y desarrolladores especializados en prototipos rápidos.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-bloodRed transition-all duration-300 shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="bg-bloodRed/10 p-4 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-bloodRed" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comunicación Directa</h3>
                <p className="text-muted-foreground">
                  Chat en tiempo real con el equipo de desarrollo en todo momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Planes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades y comienza a materializar tus ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all hover:shadow-muted/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Prototipo Normal</h3>
                  <div className="text-4xl font-bold">1500 €</div>
                  <p className="text-muted-foreground mt-2">Entrega en 6 días</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Prototipo con funcionalidades básicas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Chat de soporte 5/7</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>1 revisión incluida</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Entrega en formato digital</span>
                  </li>
                </ul>
                <Link to="/request-prototype?plan=normal" className="block">
                  <Button className="w-full bg-bloodRed hover:bg-red-900">Solicitar</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-bloodRed hover:shadow-lg transition-all relative shadow hover:shadow-bloodRed/20">
              <div className="absolute top-0 right-0 bg-bloodRed text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Prototipo Premium</h3>
                  <div className="text-4xl font-bold">3000 €</div>
                  <p className="text-muted-foreground mt-2">Entrega en 10 días</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Prototipo con funcionalidades avanzadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Chat de soporte 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>3 revisiones incluidas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Entrega en formato digital + documentación</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                    <span>Reunión de presentación personalizada</span>
                  </li>
                </ul>
                <Link to="/request-prototype?plan=premium" className="block">
                  <Button className="w-full bg-bloodRed hover:bg-red-900">Solicitar</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="blood-gradient absolute inset-0 opacity-10"></div>
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para dar vida a tu idea?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              No esperes más para transformar tu visión en un prototipo real. Nuestro proceso es simple, rápido y efectivo.
            </p>
            <Link to="/request-prototype">
              <Button className="bg-bloodRed hover:bg-red-900 text-lg py-6 px-8">
                Solicitar mi Prototipo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
