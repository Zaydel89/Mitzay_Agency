
/**
 * Servicio para conectar el frontend con un flujo de n8n.
 * Esto permite usar bases de datos externas y lógica compleja de backend.
 */

export const getGeminiResponse = async (userMessage: string, history: {role: 'user'|'assistant', content: string}[]) => {
  try {
    // Asumimos que la URL del Webhook de n8n está en una variable de entorno o es fija
    // Reemplaza esta URL con la URL de "Production Webhook" de tu nodo Webhook en n8n
    const N8N_WEBHOOK_URL = "https://tu-instancia-n8n.com/webhook/chat-mitzay";

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: history,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la comunicación con n8n');
    }

    const data = await response.json();
    
    // n8n debe devolver un objeto que contenga la respuesta en una propiedad (ej: data.text o data.output)
    return data.text || data.output || data.response || "Lo siento, mi conexión con la base de datos de MitZay ha fallado.";
    
  } catch (error) {
    console.error("n8n Connection Error:", error);
    return "Error de enlace con el núcleo de datos. Por favor, asegúrate de que el flujo de n8n esté activo.";
  }
};
