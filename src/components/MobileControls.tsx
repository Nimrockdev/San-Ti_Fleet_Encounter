import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

const triggerKey = (code: string, isDown: boolean) => {
  window.dispatchEvent(new KeyboardEvent(isDown ? 'keydown' : 'keyup', { code }));
};

const ControlButton = ({ code, children }: { code: string, children: React.ReactNode }) => (
  <button
    className="w-12 h-12 bg-cyan-900/40 backdrop-blur-md border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-100 active:bg-cyan-500/50 active:text-white touch-none select-none transition-colors"
    onPointerDown={(e) => { e.preventDefault(); triggerKey(code, true); }}
    onPointerUp={(e) => { e.preventDefault(); triggerKey(code, false); }}
    onPointerLeave={(e) => { e.preventDefault(); triggerKey(code, false); }}
    onContextMenu={(e) => e.preventDefault()}
  >
    {children}
  </button>
);

export function MobileControls() {
  return (
    <div className="absolute bottom-8 left-0 w-full px-4 flex justify-between pointer-events-none md:hidden z-10">
      {/* Movement (Left) */}
      <div className="grid grid-cols-3 gap-2 pointer-events-auto">
        <div />
        <ControlButton code="KeyW"><span className="font-mono font-bold">W</span></ControlButton>
        <div />
        <ControlButton code="KeyA"><span className="font-mono font-bold">A</span></ControlButton>
        <ControlButton code="KeyS"><span className="font-mono font-bold">S</span></ControlButton>
        <ControlButton code="KeyD"><span className="font-mono font-bold">D</span></ControlButton>
      </div>

      {/* Rotation (Right) */}
      <div className="grid grid-cols-3 gap-2 pointer-events-auto">
        <div />
        <ControlButton code="ArrowUp"><ArrowUp size={20} /></ControlButton>
        <div />
        <ControlButton code="ArrowLeft"><ArrowLeft size={20} /></ControlButton>
        <ControlButton code="ArrowDown"><ArrowDown size={20} /></ControlButton>
        <ControlButton code="ArrowRight"><ArrowRight size={20} /></ControlButton>
      </div>
    </div>
  );
}
