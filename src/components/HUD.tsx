import { X } from "lucide-react";

interface HUDProps {
  data: any;
  onClose: () => void;
  onConnect: () => void;
}

export function HUD({ data, onClose, onConnect }: HUDProps) {
  if (!data) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-96 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-2xl z-20">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>
      
      <h2 className="text-2xl font-mono font-bold mb-4 text-cyan-400 tracking-wider">ANÁLISIS DE OBJETIVO</h2>
      
      <div className="space-y-3 font-mono text-sm mb-6">
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Masa:</span>
          <span>{data.mass}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Velocidad:</span>
          <span>{data.velocity}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Integridad:</span>
          <span className="text-emerald-400">{data.integrity}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Estado:</span>
          <span className="text-red-400 animate-pulse">{data.status}</span>
        </div>
      </div>

      <button 
        onClick={onConnect}
        className="w-full py-3 bg-cyan-900/50 hover:bg-cyan-800/80 border border-cyan-500/50 rounded-xl font-mono text-cyan-100 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
      >
        ESTABLECER SINCRONÍA CON SOFÓN
      </button>
    </div>
  );
}
