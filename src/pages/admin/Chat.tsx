
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("unread");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState("chat-1");
  const [newMessage, setNewMessage] = useState("");
  
  const conversations = {
    unread: [
      {
        id: "chat-1",
        name: "Juan Pérez",
        lastMessage: "¿Cuándo podré ver la primera versión del prototipo?",
        time: "10:30",
        unread: true,
        avatar: "JP",
        projectId: "ORD-001"
      },
      {
        id: "chat-2",
        name: "María López",
        lastMessage: "Gracias por la información, tengo algunas dudas adicionales.",
        time: "09:45",
        unread: true,
        avatar: "ML",
        projectId: "ORD-002"
      },
      {
        id: "chat-3",
        name: "Carlos Rodríguez",
        lastMessage: "Me gustaría hacer algunos cambios en el diseño.",
        time: "Ayer",
        unread: true,
        avatar: "CR",
        projectId: "ORD-003"
      },
    ],
    all: [
      {
        id: "chat-1",
        name: "Juan Pérez",
        lastMessage: "¿Cuándo podré ver la primera versión del prototipo?",
        time: "10:30",
        unread: true,
        avatar: "JP",
        projectId: "ORD-001"
      },
      {
        id: "chat-2",
        name: "María López",
        lastMessage: "Gracias por la información, tengo algunas dudas adicionales.",
        time: "09:45",
        unread: true,
        avatar: "ML",
        projectId: "ORD-002"
      },
      {
        id: "chat-3",
        name: "Carlos Rodríguez",
        lastMessage: "Me gustaría hacer algunos cambios en el diseño.",
        time: "Ayer",
        unread: true,
        avatar: "CR",
        projectId: "ORD-003"
      },
      {
        id: "chat-4",
        name: "Laura Gómez",
        lastMessage: "El prototipo se ve genial, muchas gracias.",
        time: "Ayer",
        unread: false,
        avatar: "LG",
        projectId: "ORD-004"
      },
      {
        id: "chat-5",
        name: "Pedro Martínez",
        lastMessage: "Perfecto, gracias por la entrega a tiempo.",
        time: "06/04",
        unread: false,
        avatar: "PM",
        projectId: "ORD-005"
      },
      {
        id: "chat-6",
        name: "Ana Sánchez",
        lastMessage: "Excelente trabajo, estoy muy satisfecho con el resultado.",
        time: "02/04",
        unread: false,
        avatar: "AS",
        projectId: "ORD-006"
      },
    ],
  };
  
  const messages = [
    {
      id: 1,
      sender: "client",
      content: "Hola, tengo algunas dudas sobre mi prototipo.",
      time: "10:00",
    },
    {
      id: 2,
      sender: "admin",
      content: "¡Hola Juan! Claro, estoy aquí para ayudarte. ¿Qué dudas tienes?",
      time: "10:05",
    },
    {
      id: 3,
      sender: "client",
      content: "Me gustaría saber cuándo podré ver la primera versión del prototipo.",
      time: "10:30",
    },
  ];

  const filteredConversations = conversations[activeTab].filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.projectId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    // En una implementación real, aquí enviarías el mensaje al backend
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
        <h1 className="text-2xl font-bold">Mensajes</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
        <Card className="md:col-span-1 border-2 flex flex-col h-full">
          <div className="p-4 border-b">
            <Tabs defaultValue="unread" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="unread">
                  No Leídos <Badge className="ml-2 bg-bloodRed">{conversations.unread.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat === chat.id
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{chat.avatar}</AvatarFallback>
                        </Avatar>
                        {chat.unread && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-bloodRed" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{chat.name}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage}
                          </p>
                          <Badge variant="outline" className="ml-1 shrink-0">
                            {chat.projectId}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No se encontraron conversaciones
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        <Card className="md:col-span-2 border-2 flex flex-col h-full">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">Juan Pérez</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">ORD-001</Badge>
                    <p className="text-xs text-muted-foreground">App de Gestión de Tareas</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver Pedido
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] lg:max-w-[60%] rounded-lg p-3 ${
                      message.sender === "admin"
                        ? "bg-bloodRed text-white rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">
                        {message.sender === "admin" ? "Tú" : "Juan Pérez"}
                      </span>
                      <span
                        className={`text-xs ${
                          message.sender === "admin" ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
