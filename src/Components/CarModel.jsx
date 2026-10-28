
import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const CarModel = () => {
  const { scene } = useGLTF("/Model/lexus.glb");

  const carRef = useRef();
  const progress = useRef(0);
  const [isHolding, setIsHolding] = useState(false);

  useFrame((state, delta) => {
    if (!carRef.current || isHolding) return;

    // PHASE 1: Drive into the scene
    if (progress.current < 1) {
      progress.current = Math.min(
        progress.current + delta * 0.3,
        1
      );

      // Smooth ease-out
      const t = 1 - Math.pow(1 - progress.current, 3);

      carRef.current.position.z = -8 + t * 8;
      carRef.current.rotation.y = -0.25 + t * 0.25;
    } 
    
    // PHASE 2: Rotate after arriving
    else {
      carRef.current.rotation.y += delta * 0.9;
    }

    // Gentle floating animation
    if (progress.current >= 1) {
      carRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group
      ref={carRef}
      position={[0, 0, -8]}
    >
      <Center>
        <primitive
          object={scene}
          scale={0.4}
          onPointerDown={(e) => {
            e.stopPropagation();
            setIsHolding(true);
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            setIsHolding(false);
          }}
          onPointerLeave={() => {
            // Don't resume just because the pointer leaves
          }}
          onPointerCancel={() => setIsHolding(false)}
        />
      </Center>
    </group>
  );
};

export default CarModel;
