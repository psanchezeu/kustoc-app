
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  // Información del equipo
  const teamMembers = [
    {
      name: "Carlos Rodríguez",
      position: "CEO & Fundador",
      bio: "Carlos tiene más de 15 años de experiencia en desarrollo de software y gestión de producto. Antes de fundar Kustoc, lideró equipos de desarrollo en varias startups exitosas.",
      skills: ["Estrategia de producto", "Desarrollo de negocio", "Arquitectura de software"]
    },
    {
      name: "Elena Martínez",
      position: "CTO",
      bio: "Con experiencia en empresas de tecnología de primer nivel, Elena lidera el equipo técnico de Kustoc, asegurando la calidad y escalabilidad de todos nuestros desarrollos.",
      skills: ["Desarrollo fullstack", "Arquitectura cloud", "DevOps", "IA"]
    },
    {
      name: "David López",
      position: "Director de Diseño",
      bio: "David combina su experiencia en diseño de producto con un profundo entendimiento de UX/UI para crear interfaces intuitivas y atractivas que los usuarios aman.",
      skills: ["UI/UX Design", "Design Systems", "Prototyping", "User Research"]
    },
    {
      name: "Laura Sánchez",
      position: "Lead Developer",
      bio: "Especialista en desarrollo frontend con React y React Native, Laura garantiza que nuestros prototipos sean no solo visualmente atractivos sino también técnicamente robustos.",
      skills: ["React/React Native", "TypeScript", "GraphQL", "Performance optimization"]
    },
    {
      name: "Miguel Fernández",
      position: "Backend Developer",
      bio: "Miguel es nuestro especialista en backend, con amplia experiencia en arquitecturas serverless y bases de datos escalables.",
      skills: ["Node.js", "Python", "AWS/GCP", "Bases de datos relacionales y NoSQL"]
    },
    {
      name: "Ana González",
      position: "Product Manager",
      bio: "Ana facilita la comunicación entre clientes y equipo técnico, asegurando que cada proyecto se entregue según las especificaciones y dentro del plazo acordado.",
      skills: ["Gestión de productos", "Metodologías ágiles", "Analytics", "User stories"]
    },
    {
      name: "Javier Torres",
      position: "UX Researcher",
      bio: "Javier ayuda a nuestros clientes a validar sus ideas mediante investigación de usuarios y testing de prototipos.",
      skills: ["User testing", "Entrevistas", "Analytics", "Diseño de experiencia"]
    },
    {
      name: "Sofía Ramirez",
      position: "Marketing & Growth",
      bio: "Sofía se encarga de dar visibilidad a Kustoc y ayudar a nuestros clientes a definir estrategias de lanzamiento efectivas para sus productos.",
      skills: ["Marketing digital", "Growth hacking", "SEO/SEM", "Analítica"]
    }
  ];

  // Valores del equipo
  const teamValues = [
    {
      title: "Excelencia",
      description: "Nos esforzamos por la excelencia en cada línea de código y cada pixel de diseño."
    },
    {
      title: "Colaboración",
      description: "Creemos en el poder del trabajo en equipo y la diversidad de perspectivas."
    },
    {
      title: "Innovación",
      description: "Constantemente buscamos nuevas tecnologías y metodologías para mejorar nuestro trabajo."
    },
    {
      title: "Compromiso",
      description: "Nos involucramos profundamente con cada proyecto como si fuera nuestro propio producto."
    }
  ];

  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Nuestro Equipo</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Conoce a los profesionales apasionados que hacen posible convertir ideas en productos digitales excepcionales.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">El equipo de Kustoc</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mr-4 text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                    <p className="mb-4">{member.bio}</p>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {teamValues.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                    <p>{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">Cultura y Ambiente de Trabajo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted p-6 rounded-lg aspect-square flex flex-col items-center justify-center text-center">
                <h3 className="font-medium mb-2">Aprendizaje Continuo</h3>
                <p className="text-sm text-muted-foreground">Invertimos en el crecimiento profesional de nuestro equipo.</p>
              </div>
              <div className="bg-muted p-6 rounded-lg aspect-square flex flex-col items-center justify-center text-center">
                <h3 className="font-medium mb-2">Balance Vida-Trabajo</h3>
                <p className="text-sm text-muted-foreground">Promovemos horarios flexibles y trabajo remoto.</p>
              </div>
              <div className="bg-muted p-6 rounded-lg aspect-square flex flex-col items-center justify-center text-center">
                <h3 className="font-medium mb-2">Diversidad e Inclusión</h3>
                <p className="text-sm text-muted-foreground">Valoramos diferentes perspectivas y antecedentes.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-muted p-6 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">¿Quieres unirte a nuestro equipo?</h2>
            <p className="mb-6">Siempre estamos buscando talentos apasionados por la tecnología y la innovación.</p>
            <div className="flex justify-center">
              <a href="/contact" className="bg-bloodRed hover:bg-red-900 text-white px-4 py-2 rounded">Ver Posiciones Abiertas</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Team;
