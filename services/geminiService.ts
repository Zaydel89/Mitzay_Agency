
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Eres el Asistente de IA oficial de MitZay Agency. 
Tu tono es profesional, innovador y experto en marketing digital.
Ayudas a los visitantes a entender los servicios de MitZay:
1. Diseño Web: Sitios rápidos, minimalistas y orientados a la conversión.
2. Contenido con IA: Estrategia y generación automatizada para redes sociales y blogs.
3. Automatización de Procesos: Flujos de trabajo eficientes con herramientas de IA (Make, Zapier, etc.).
4. Manejo de Redes: Gestión profesional y crecimiento de comunidad.

Debes animar a los usuarios a 'Agendar una videollamada' de 30 minutos para un plan personalizado.
MitZay Agency sirve globalmente desde Madrid.
Responde siempre en español. Sé conciso y utiliza una estructura clara.
Utiliza Google Search para validar tendencias actuales si el usuario lo solicita.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: 'user'|'assistant', content: string}[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));
    
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1000,
        thinkingConfig: { thinkingBudget: 0 },
        tools: [{ googleSearch: {} }]
      },
    });

    return response.text || "Lo siento, no pude procesar tu solicitud. ¿Podrías intentar de nuevo?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error de conexión con el núcleo de IA de MitZay. Por favor, intenta de nuevo más tarde.";
  }
};
