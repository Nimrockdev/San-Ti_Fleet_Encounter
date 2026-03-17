import { Environment, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Player } from "./Player";
import { DropletFleet } from "./DropletFleet";

export function Scene({ onDropletClick }: { onDropletClick: (data: any) => void }) {
  return (
    <Canvas shadows camera={{ position: [0, 5, 20], fov: 60 }}>
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[100, 100, 50]} intensity={1} castShadow />
      
      {/* Deep space environment */}
      <Stars radius={300} depth={50} count={10000} factor={6} saturation={0} fade speed={1} />
      <Environment preset="night" background blur={0.8} />

      {/* Cosmic dust particles (simple representation) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={5000}
            array={new Float32Array(5000 * 3).map(() => (Math.random() - 0.5) * 500)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.5} color="#88ccff" transparent opacity={0.4} sizeAttenuation />
      </points>

      {/* Player Ship */}
      <Player />

      {/* San-Ti Fleet */}
      <DropletFleet onDropletClick={onDropletClick} />
    </Canvas>
  );
}
