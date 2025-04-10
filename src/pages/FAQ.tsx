
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Mail } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    { id: "general", name: "General" },
    { id: "pricing", name: "Precios y Planes" },
    { id: "process", name: "Proceso" },
    { id: "technical", name: "Cuestiones Técnicas" },
    { id: "support", name: "Soporte" },
  ];
  
  const faqs = [
    {
      id: "what-is",
      question: "¿Qué es Kustoc y cómo funciona?",
      answer: "Kustoc es una plataforma especializada en crear prototipos funcionales de aplicaciones web y móviles en tiempo récord. Utilizamos IA y un equipo de desarrolladores expertos para transformar tus ideas en prototipos reales que puedes mostrar a inversores, validar con usuarios o utilizar como base para tu producto final.",
      category: "general"
    },
    {
      id: "difference",
      question: "¿Cuál es la diferencia entre los planes Normal y Premium?",
      answer: "El plan Normal (1500€) está diseñado para validar ideas rápidamente con funcionalidades básicas, incluye soporte 5/7 y una revisión. El plan Premium (3000€) ofrece funcionalidades más avanzadas, soporte 24/7, tres revisiones, documentación detallada y una reunión personalizada para presentar el prototipo.",
      category: "pricing"
    },
    {
      id: "timeline",
      question: "¿Cuánto tiempo tarda en desarrollarse mi prototipo?",
      answer: "Los prototipos normales se entregan en 6 días laborables, mientras que los prototipos premium requieren 10 días laborables. El tiempo comienza a contar desde la aprobación del pago y la recepción de toda la información necesaria.",
      category: "process"
    },
    {
      id: "revisions",
      question: "¿Qué incluye una revisión?",
      answer: "Una revisión te permite solicitar cambios o ajustes al prototipo entregado. El plan Normal incluye 1 revisión y el Premium incluye 3 revisiones. Cada revisión puede incluir varios cambios menores o un cambio significativo en la funcionalidad.",
      category: "process"
    },
    {
      id: "technologies",
      question: "¿Qué tecnologías utilizan para crear los prototipos?",
      answer: "Trabajamos principalmente con React, React Native, Vue.js, Node.js, y otras tecnologías modernas de desarrollo web y móvil. La elección específica de las tecnologías depende de los requisitos de tu proyecto y de lo que sea más adecuado para tu caso de uso.",
      category: "technical"
    },
    {
      id: "afterwards",
      question: "¿Qué sucede después de recibir mi prototipo?",
      answer: "Una vez entregado el prototipo, puedes solicitar las revisiones incluidas en tu plan. También puedes contratar servicios adicionales como mantenimiento, nuevas funcionalidades o convertir el prototipo en un producto completo. Ofrecemos asesoramiento continuo para ayudarte a llevar tu producto al siguiente nivel.",
      category: "process"
    },
    {
      id: "code",
      question: "¿Recibo el código fuente de mi prototipo?",
      answer: "Sí, todos nuestros planes incluyen la entrega del código fuente completo. Recibirás acceso a un repositorio Git con todo el código desarrollado, lo que te permite ser propietario al 100% del proyecto.",
      category: "technical"
    },
    {
      id: "support",
      question: "¿Qué tipo de soporte ofrecen durante el desarrollo?",
      answer: "Ofrecemos soporte a través de un chat dedicado donde puedes comunicarte directamente con el equipo de desarrollo. El plan Normal incluye soporte 5 días a la semana (lunes a viernes), mientras que el Premium ofrece soporte todos los días de la semana, las 24 horas del día.",
      category: "support"
    },
    {
      id: "payment",
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer: "Aceptamos pagos mediante tarjetas de crédito/débito (Visa, MasterCard, American Express) y PayPal. Todos los pagos se procesan de forma segura a través de Stripe, una plataforma líder en procesamiento de pagos.",
      category: "pricing"
    },
    {
      id: "refund",
      question: "¿Tienen política de reembolso?",
      answer: "Si por alguna razón no podemos comenzar tu proyecto después de realizar el pago, te ofreceremos un reembolso completo. Una vez iniciado el desarrollo, ofrecemos reembolsos parciales que dependen del progreso del proyecto y se evalúan caso por caso.",
      category: "pricing"
    },
  ];
  
  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group FAQs by category for display when there's no search
  const faqsByCategory = categories.map(category => ({
    ...category,
    faqs: filteredFaqs.filter(faq => faq.category === category.id)
  }));
  
  return (
    <div className="container px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Preguntas Frecuentes</h1>
        <p className="text-xl text-muted-foreground">
          Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de prototipado
        </p>
      </div>
      
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar en las preguntas frecuentes..."
            className="pl-12 py-6 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto">
        {searchTerm ? (
          // Search Results
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              {filteredFaqs.length > 0
                ? `Resultados para "${searchTerm}"`
                : `No se encontraron resultados para "${searchTerm}"`}
            </h2>
            
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <AccordionItem value={faq.id} key={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="py-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                  No hemos podido encontrar respuestas que coincidan con tu búsqueda.
                </p>
                <Link to="/contact">
                  <Button className="bg-bloodRed hover:bg-red-900">
                    Contacta con nosotros
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          // Categories and FAQs
          <div className="space-y-12">
            {faqsByCategory.map((category) => (
              category.faqs.length > 0 && (
                <div key={category.id}>
                  <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq) => (
                      <AccordionItem value={faq.id} key={faq.id} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left py-4 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="py-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )
            ))}
          </div>
        )}
        
        <div className="text-center mt-16 p-8 border border-dashed rounded-lg">
          <h3 className="text-2xl font-bold mb-4">¿No has encontrado lo que buscas?</h3>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo está disponible para responder cualquier pregunta que tengas
          </p>
          <Link to="/contact">
            <Button className="bg-bloodRed hover:bg-red-900">
              Contactar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
