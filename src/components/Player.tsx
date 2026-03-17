import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SPEED = 50;
const ROTATION_SPEED = 1.5;

export function Player() {
  const playerRef = useRef<THREE.Group>(null);
  const engineFlameRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keys.current[e.code] = true;
    const handleKeyUp = (e: KeyboardEvent) => keys.current[e.code] = false;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    let isMovingForward = false;

    // Movement
    if (keys.current["KeyW"]) {
      player.translateZ(-SPEED * delta);
      isMovingForward = true;
    }
    if (keys.current["KeyS"]) player.translateZ(SPEED * delta);
    if (keys.current["KeyA"]) player.translateX(-SPEED * delta);
    if (keys.current["KeyD"]) player.translateX(SPEED * delta);

    // Rotation
    if (keys.current["ArrowLeft"]) player.rotateY(ROTATION_SPEED * delta);
    if (keys.current["ArrowRight"]) player.rotateY(-ROTATION_SPEED * delta);
    if (keys.current["ArrowUp"]) player.rotateX(ROTATION_SPEED * delta);
    if (keys.current["ArrowDown"]) player.rotateX(-ROTATION_SPEED * delta);

    // Engine Flame Animation
    if (engineFlameRef.current) {
      // Scale up when moving forward, scale down when idle
      const targetScale = isMovingForward ? 1.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.1;
      engineFlameRef.current.scale.y = THREE.MathUtils.lerp(engineFlameRef.current.scale.y, targetScale, 0.2);
      
      // Flickering opacity effect
      const material = engineFlameRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = isMovingForward ? 0.6 + Math.random() * 0.4 : 0.2;
    }

    // Camera follow
    const relativeCameraOffset = new THREE.Vector3(0, 5, 20);
    const cameraOffset = relativeCameraOffset.applyMatrix4(player.matrixWorld);
    
    camera.position.lerp(cameraOffset, 0.1);
    camera.lookAt(player.position);
  });

  return (
    <group ref={playerRef} position={[0, 0, 50]}>
      {/* Main Fuselage */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 4, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0, -3]} castShadow rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.6, 2, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.6, -1]} castShadow>
        <capsuleGeometry args={[0.3, 1.2, 4, 16]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wings */}
      <mesh position={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[5, 0.1, 2]} />
        <meshStandardMaterial color="#999999" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Vertical Stabilizer */}
      <mesh position={[0, 0.8, 1.5]} castShadow rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.1, 1.5, 1.5]} />
        <meshStandardMaterial color="#999999" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Engine Nozzle */}
      <mesh position={[0, 0, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 0.5, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* Engine Flame Group */}
      <group position={[0, 0, 2.4]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Offset mesh by half its height so it scales from the base */}
        <mesh ref={engineFlameRef} position={[0, 1, 0]}>
          <coneGeometry args={[0.4, 2, 16]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.8} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
          {/* Inner Core (child of the flame, scales automatically) */}
          <mesh position={[0, -0.2, 0]} scale={[0.5, 0.8, 0.5]}>
            <coneGeometry args={[0.4, 2, 16]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.9} 
              blending={THREE.AdditiveBlending} 
              depthWrite={false} 
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}
