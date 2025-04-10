
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Formulario enviado',
        description: 'Nos pondremos en contacto contigo lo antes posible.',
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        interest: 'general',
      });
    }, 1000);
  };

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Contacto</h1>
          <p className="text-lg text-muted-foreground">
            Estamos aquí para responder a tus preguntas y ayudarte a convertir tus ideas en realidad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Información de contacto</h2>
                <p className="text-muted-foreground">Puedes contactarnos a través del formulario o directamente utilizando la siguiente información.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">info@kustoc.com</p>
              </div>
              
              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-muted-foreground">+34 91 123 4567</p>
              </div>
              
              <div>
                <h3 className="font-medium">Dirección</h3>
                <p className="text-muted-foreground">
                  Calle Gran Vía, 123<br />
                  28013 Madrid, España
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Horario</h3>
                <p className="text-muted-foreground">
                  Lunes a Viernes<br />
                  9:00 - 18:00
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Síguenos</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre completo</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">Empresa (opcional)</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium mb-1">¿En qué estás interesado?</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="general">Consulta general</option>
                    <option value="prototype">Prototipo</option>
                    <option value="development">Desarrollo</option>
                    <option value="consultation">Consultoría</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu proyecto o consulta"
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-bloodRed hover:bg-red-900 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-2">¿Cuánto tiempo toma desarrollar un prototipo?</h3>
              <p className="text-muted-foreground">Normalmente, entregamos prototipos en 1-2 semanas, dependiendo de la complejidad del proyecto.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-2">¿Trabajáis con empresas fuera de España?</h3>
              <p className="text-muted-foreground">¡Sí! Trabajamos con clientes de todo el mundo. Nuestra metodología de trabajo remoto nos permite colaborar eficientemente sin importar la ubicación.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-2">¿Qué sucede después de que entregáis el prototipo?</h3>
              <p className="text-muted-foreground">Podemos acompañarte en el desarrollo completo del producto o entregarte el prototipo para que lo desarrolles con tu propio equipo.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-2">¿Ofrecéis servicios de mantenimiento?</h3>
              <p className="text-muted-foreground">Sí, ofrecemos servicios de mantenimiento y evolución continua para los proyectos que desarrollamos.</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/faq" className="text-bloodRed hover:underline">Ver todas las preguntas frecuentes</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
