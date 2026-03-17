import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface DropletProps {
  position: [number, number, number];
  onClick: (data: any) => void;
}

function Droplet({ position, onClick }: DropletProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[1, 1, 3]} // Ellipsoid shape
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick({
          mass: "1.2 × 10^15 kg",
          velocity: "0.1c (30,000 km/s)",
          integrity: "Interacción Fuerte (Absoluta)",
          status: "En ruta de intercepción"
        });
      }}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={hovered ? "#ffffff" : "#cccccc"}
        metalness={1}
        roughness={0}
        envMapIntensity={hovered ? 2 : 1}
        emissive={hovered ? "#00ffff" : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}

export function DropletFleet({ onDropletClick }: { onDropletClick: (data: any) => void }) {
  const droplets = [];
  const spacing = 15;
  const rows = 5;
  const cols = 5;
  const depth = 2;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      for (let z = 0; z < depth; z++) {
        droplets.push(
          <Droplet
            key={`${x}-${y}-${z}`}
            position={[
              (x - cols / 2) * spacing,
              (y - rows / 2) * spacing,
              -z * spacing - 100 // Place them far away
            ]}
            onClick={onDropletClick}
          />
        );
      }
    }
  }

  return <group>{droplets}</group>;
}
