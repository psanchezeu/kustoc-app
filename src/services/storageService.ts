
// Prefijo para todas las claves en localStorage para evitar colisiones
const PREFIX = "protospark_";

// Servicio para manejar el almacenamiento en localStorage
export const storageService = {
  // Guardar un valor en localStorage
  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${PREFIX}${key}`, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
  },

  // Obtener un valor de localStorage
  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const serializedValue = localStorage.getItem(`${PREFIX}${key}`);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  // Eliminar un valor de localStorage
  remove(key: string): void {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },

  // Limpiar todos los valores de la aplicación en localStorage
  clear(): void {
    try {
      // Solo eliminar las claves que empiezan con nuestro prefijo
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }
};
