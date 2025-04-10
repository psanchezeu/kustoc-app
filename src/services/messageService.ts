
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  content: string;
  created_at?: string;
}

export const messageService = {
  // Obtener mensajes de un pedido específico
  async getMessages(orderId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  // Enviar un nuevo mensaje
  async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('No se pudo enviar el mensaje');
    return data;
  },
  
  // Suscribirse a nuevos mensajes de un pedido
  subscribeToMessages(orderId: string, callback: (message: Message) => void) {
    const channel = supabase
      .channel(`messages:${orderId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `order_id=eq.${orderId}`
      }, (payload) => {
        callback(payload.new as Message);
      })
      .subscribe();
    
    // Devolver una función para cancelar la suscripción
    return () => {
      supabase.removeChannel(channel);
    };
  }
};
