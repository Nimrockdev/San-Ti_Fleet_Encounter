import { useState } from "react";
import { Scene } from "./components/Scene";
import { HUD } from "./components/HUD";
import { Chat } from "./components/Chat";
import { MobileControls } from "./components/MobileControls";

export default function App() {
  const [selectedDroplet, setSelectedDroplet] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <Scene onDropletClick={(data) => setSelectedDroplet(data)} />
      
      {selectedDroplet && !isChatOpen && (
        <HUD 
          data={selectedDroplet} 
          onClose={() => setSelectedDroplet(null)} 
          onConnect={() => {
            setSelectedDroplet(null);
            setIsChatOpen(true);
          }}
        />
      )}

      {isChatOpen && (
        <Chat onClose={() => setIsChatOpen(false)} />
      )}

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
        <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 text-white/50 font-mono text-xs pointer-events-none hidden md:block">
        <p>WASD: Mover Nave</p>
        <p>Flechas: Rotar Nave</p>
        <p>Click en Gota: Analizar</p>
      </div>

      {/* Mobile Controls (only visible on small screens) */}
      {!isChatOpen && <MobileControls />}
    </div>
  );
}
