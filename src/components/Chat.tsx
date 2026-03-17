import { useState, useEffect, useRef } from "react";
import { sendMessageToSanTi } from "../services/geminiService";
import { X, Send } from "lucide-react";

interface ChatProps {
  onClose: () => void;
}

export function Chat({ onClose }: ChatProps) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "San-Ti", text: "CONEXIÓN ESTABLECIDA. HABLA, INSECTO." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const responseText = await sendMessageToSanTi(input, messages);
    
    // Typewriter effect
    setIsTyping(false);
    let currentText = "";
    setMessages((prev) => [...prev, { role: "San-Ti", text: "" }]);
    
    for (let i = 0; i < responseText.length; i++) {
      currentText += responseText[i];
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = currentText;
        return newMessages;
      });
      await new Promise((resolve) => setTimeout(resolve, 20)); // Typewriter speed
    }
  };

  return (
    <div className="absolute bottom-0 right-0 w-full h-[60vh] md:bottom-8 md:right-8 md:w-[400px] md:h-[500px] bg-black/80 backdrop-blur-xl border-t border-red-900/50 md:border md:rounded-2xl flex flex-col shadow-[0_0_30px_rgba(220,38,38,0.2)] z-20">
      <div className="flex justify-between items-center p-4 border-b border-red-900/50 bg-red-950/30 md:rounded-t-2xl">
        <h3 className="font-mono text-red-500 font-bold tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          ENLACE SOFÓN
        </h3>
        <button onClick={onClose} className="text-red-500/50 hover:text-red-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <span className={`text-[10px] uppercase mb-1 ${msg.role === "user" ? "text-cyan-600" : "text-red-800"}`}>
              {msg.role === "user" ? "Transmisión Local" : "Respuesta San-Ti"}
            </span>
            <div className={`max-w-[85%] p-3 rounded-lg ${
              msg.role === "user" 
                ? "bg-cyan-950/50 text-cyan-100 border border-cyan-900/50" 
                : "bg-red-950/50 text-red-100 border border-red-900/50"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start">
            <span className="text-[10px] uppercase mb-1 text-red-800">Respuesta San-Ti</span>
            <div className="max-w-[85%] p-3 rounded-lg bg-red-950/50 text-red-100 border border-red-900/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-red-900/50 bg-black/50 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Transmitir mensaje..."
            className="flex-1 bg-transparent border border-red-900/50 rounded-lg px-4 py-2 text-red-100 font-mono text-sm focus:outline-none focus:border-red-500/50 placeholder:text-red-900/50"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="p-2 bg-red-950/50 text-red-500 border border-red-900/50 rounded-lg hover:bg-red-900/50 hover:text-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
