
import { supabase } from "@/integrations/supabase/client";

export interface Order {
  id: string;
  customer_id: string;
  project: string;
  type: 'normal' | 'premium';
  price: number;
  status: 'pending' | 'in_progress' | 'completed';
  date: string;
  deadline: string;
  created_at?: string;
}

export const orderService = {
  // Obtener todos los pedidos (para administradores)
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  // Obtener pedidos de un cliente específico
  async getCustomerOrders(customerId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  // Obtener un pedido por ID
  async getOrder(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 es el código para 'no encontrado'
    return data || null;
  },
  
  // Crear un nuevo pedido
  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('No se pudo crear el pedido');
    return data;
  },
  
  // Actualizar un pedido
  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('No se pudo actualizar el pedido');
    return data;
  }
};
