
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ClientsPage = () => {
  // Ejemplos de testimonios
  const testimonials = [
    {
      name: "María López",
      company: "Fintech Solutions",
      position: "CEO",
      content: "Kustoc transformó nuestra idea en un prototipo funcional en tiempo récord. La calidad del trabajo y la atención al detalle fueron excepcionales.",
    },
    {
      name: "Javier Rodríguez",
      company: "HealthTech Innovations",
      position: "CTO",
      content: "Trabajar con el equipo de Kustoc ha sido una experiencia increíble. Su enfoque ágil y su capacidad para entender nuestras necesidades técnicas nos permitió validar nuestro concepto rápidamente.",
    },
    {
      name: "Laura Martínez",
      company: "Retail Connect",
      position: "Director de Producto",
      content: "Después de varios intentos fallidos con otras agencias, Kustoc logró capturar perfectamente nuestra visión y convertirla en un producto digital que nuestros usuarios adoran.",
    },
    {
      name: "Carlos Sánchez",
      company: "EduTech Learning",
      position: "Fundador",
      content: "La consultoría estratégica que recibimos de Kustoc fue fundamental para definir la dirección de nuestro producto. Su visión técnica combinada con su entendimiento del mercado nos dio una ventaja competitiva.",
    },
    {
      name: "Ana Gutiérrez",
      company: "GreenMobility",
      position: "CMO",
      content: "El prototipo desarrollado por Kustoc nos ayudó a asegurar una ronda de inversión de 500.000€. Los inversores quedaron impresionados por la calidad y funcionalidad del producto.",
    },
  ];

  // Ejemplos de clientes (logos)
  const clients = [
    "Acme Corp", "TechVision", "Future Finance", "Health Plus", "EduLearn", 
    "Green Solutions", "City Connect", "Travel Wise", "Food Delivery", "Smart Retail",
    "Media Group", "Sports Tech", "Insurance Pro", "Manufacturing Plus", "Creative Studio"
  ];

  // Ejemplos de casos de estudio
  const caseStudies = [
    {
      title: "Plataforma de telemedicina",
      client: "HealthTech Innovations",
      description: "Desarrollamos un prototipo de alta fidelidad para una plataforma de consultas médicas virtuales que permitió a HealthTech validar su concepto con inversores y usuarios reales.",
      results: "La plataforma ahora gestiona más de 10,000 consultas mensuales y ha reducido los tiempos de espera en un 85%."
    },
    {
      title: "App de finanzas personales",
      client: "Fintech Solutions",
      description: "Creamos un prototipo interactivo que permitió a Fintech Solutions validar su innovador enfoque de gestión financiera personal antes de invertir en el desarrollo completo.",
      results: "La app fue descargada más de 50,000 veces en el primer mes tras su lanzamiento, con una tasa de retención del 45%."
    },
    {
      title: "Sistema de gestión para tiendas",
      client: "Retail Connect",
      description: "Desarrollamos un prototipo funcional de un sistema de inventario y ventas, permitiendo a pequeñas tiendas modernizar sus operaciones de manera accesible.",
      results: "El sistema ha sido implementado en más de 200 tiendas, aumentando la eficiencia operativa en un 30%."
    },
  ];

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Nuestros Clientes</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Nos enorgullece trabajar con empresas innovadoras de diversos sectores que confían en Kustoc para materializar sus ideas.
        </p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Empresas que confían en nosotros</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {clients.map((client, index) => (
                <div key={index} className="border rounded-lg p-4 flex items-center justify-center h-24">
                  <p className="font-medium text-center">{client}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Casos de Éxito</h2>
            <div className="space-y-8">
              {caseStudies.map((caseStudy, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{caseStudy.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Cliente: {caseStudy.client}</p>
                    <p className="mb-4">{caseStudy.description}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Resultados:</h4>
                      <p className="text-muted-foreground">{caseStudy.results}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Lo que dicen nuestros clientes</h2>
            <div className="grid gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="mb-4 italic">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">¿Quieres ser nuestro próximo caso de éxito?</h2>
            <p className="mb-4">Contáctanos para discutir cómo podemos ayudarte a convertir tu idea en un producto digital exitoso.</p>
            <p className="text-muted-foreground mb-4">Explora las posibilidades:</p>
            <div className="flex flex-wrap gap-2">
              <a href="/contact" className="text-sm px-3 py-1 bg-background rounded-full">Solicitar consulta</a>
              <a href="/prototypes" className="text-sm px-3 py-1 bg-background rounded-full">Ver prototipos</a>
              <a href="/development" className="text-sm px-3 py-1 bg-background rounded-full">Desarrollo</a>
              <a href="/consultation" className="text-sm px-3 py-1 bg-background rounded-full">Consultoría</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
