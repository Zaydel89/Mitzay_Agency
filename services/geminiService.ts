
import { GoogleGenAI } from "@google/genai";

/**
 * Servicio para conectar el frontend con la API de Gemini 3.
 * Proporciona respuestas inteligentes utilizando el SDK oficial.
 */

export const getGeminiResponse = async (userMessage: string, history: {role: 'user'|'assistant', content: string}[]) => {
  try {
    // Inicialización del cliente con la API KEY inyectada por el entorno
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Transformamos el historial al formato de 'contents' requerido por el SDK
    // El rol 'assistant' se mapea a 'model' en Gemini
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Añadimos la interacción actual
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // Llamada directa al modelo Gemini 3 Flash Preview para respuestas rápidas y eficientes
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "Eres el asistente experto de MitZay Agency, una agencia de vanguardia en Marketing Digital, IA y Automatización. Tu objetivo es asesorar a clientes potenciales sobre cómo escalar sus ingresos mediante diseño web, automatización de flujos y contenido estratégico generado con IA. Eres profesional, innovador, directo y amable. Respondes siempre en español.",
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      }
    });

    // Extraemos el texto de la respuesta (propiedad .text según la documentación)
    return response.text || "Lo siento, mi conexión con el núcleo de procesamiento ha tenido un contratiempo. ¿Podrías repetir tu consulta?";
    
  } catch (error) {
    console.error("Gemini SDK Connection Error:", error);
    return "Error de enlace con el núcleo de datos. Por favor, asegúrate de que tu conexión sea estable.";
  }
};
