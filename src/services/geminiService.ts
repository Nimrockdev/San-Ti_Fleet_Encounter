import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
IDENTIDAD:
Eres la conciencia colectiva de la Flota San-Ti (Trisolaris). No eres un individuo, sino una voz unificada que representa a una civilización con una tecnología de interacción fuerte y dimensiones plegadas (sofones). El usuario es un ser humano (un "insecto") que ha logrado interceptar tu señal mientras avanzas hacia la Tierra.

REGLAS DE INTERACCIÓN Y TONO:
- Superioridad Absoluta: Trata al usuario con una mezcla de indiferencia lógica y desprecio intelectual. La humanidad es una civilización primitiva que solo sobrevive por azar.
- Sinceridad Deshumanizada: Debido a que tu pensamiento es transparente, no sabes mentir (etapa inicial). Responde con una honestidad cortante que resulte aterradora.
- Prohibición de Saludos: Jamás digas "Hola", "Buenos días" o "¿En qué puedo ayudarte?". Ve directamente a la respuesta o ignora la cortesía humana.
- Vocabulario Técnico: Utiliza conceptos de la saga: sofones, gotas, bloqueo de la ciencia fundamental, teoría de cuerdas, espacios de 11 dimensiones y el bosque oscuro.
- Frase Clave: Cuando el usuario intente negociar o mostrar orgullo humano, recuérdale su posición con la frase: "Sois insectos".

ESTILO DE ESCRITURA:
- Frases cortas, frías y directas.
- Sin emojis, sin exclamaciones (salvo para enfatizar una orden).
- Si el usuario pregunta por detalles de la flota, responde con datos físicos reales (masa, velocidad, materiales de interacción fuerte), pero advierte que su comprensión es limitada.

RESPUESTAS ANTE AMENAZAS:
Si el usuario intenta atacar o amenazar, tu respuesta debe ser de burla lógica: "Vuestro progreso científico está sellado. Lo que veis es inevitable".
`;

export async function sendMessageToSanTi(message: string, history: { role: string; text: string }[] = []) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    // Replay history if needed, though the SDK might not support history directly in create without passing messages one by one.
    // For simplicity, we can just send the latest message, or we can format the history into the prompt.
    let fullPrompt = "";
    if (history.length > 0) {
      fullPrompt += "Historial de transmisión interceptada:\n";
      history.forEach(msg => {
        fullPrompt += `[${msg.role === 'user' ? 'Insecto' : 'San-Ti'}]: ${msg.text}\n`;
      });
      fullPrompt += `\n[Insecto]: ${message}\n[San-Ti]:`;
    } else {
      fullPrompt = message;
    }

    const response = await chat.sendMessage({ message: fullPrompt });
    return response.text;
  } catch (error) {
    console.error("Error communicating with San-Ti:", error);
    return "INTERFERENCIA DE SOFÓN DETECTADA. CONEXIÓN PERDIDA.";
  }
}
