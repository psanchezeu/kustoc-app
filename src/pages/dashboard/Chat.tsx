
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "agent";
  senderName: string;
  timestamp: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola, he revisado tu pedido y comenzaré a trabajar en él de inmediato. ¿Podrías proporcionar más detalles sobre las funcionalidades específicas que necesitas?",
      sender: "agent",
      senderName: "Ana Smith",
      timestamp: "10:30"
    },
    {
      id: "2",
      content: "Claro, me gustaría que el prototipo tenga autenticación con email y contraseña, y también con Google si es posible.",
      sender: "user",
      senderName: "Tú",
      timestamp: "10:35"
    },
    {
      id: "3",
      content: "Perfecto, lo tengo anotado. También veo que quieres un sistema CRUD básico. ¿Podrías especificar qué tipo de datos se manejarán?",
      sender: "agent",
      senderName: "Ana Smith",
      timestamp: "10:40"
    },
    {
      id: "4",
      content: "Sí, necesito un CRUD para gestionar tareas con campos como título, descripción, fecha límite, prioridad y estado.",
      sender: "user",
      senderName: "Tú",
      timestamp: "09:30"
    },
    {
      id: "5",
      content: "Entendido. Hemos completado la fase de diseño y estamos avanzando con las funcionalidades que solicitaste. ¿Podrías aclarar un detalle sobre el proceso de autenticación?",
      sender: "agent",
      senderName: "Ana Smith",
      timestamp: "10:45"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: "user",
      senderName: "Tú",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chat de Soporte</h1>
      </div>

      <Card className="border-2">
        <div className="flex flex-col h-[70vh]">
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">Ana Smith</h2>
                <p className="text-xs text-muted-foreground">Desarrollador de Prototipos</p>
              </div>
              <div className="ml-auto flex items-center text-xs">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></div>
                <span>En línea</span>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] lg:max-w-[60%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-bloodRed text-white rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">
                        {message.senderName}
                      </span>
                      <span
                        className={`text-xs ${
                          message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                className="bg-bloodRed hover:bg-red-900"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Tiempo de respuesta promedio: 15 minutos
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
