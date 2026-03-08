import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// A cool rotating code-inspired 3D geometric model
function CodeMatrix() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Subtle mouse-follow
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.3,
        0.03,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.15,
        0.03,
      );
    }

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.x = t * 0.08;
    }

    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.2;
      midRef.current.rotation.z = t * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.3;
      innerRef.current.rotation.x = -t * 0.15;
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        {/* Outer dodecahedron wireframe */}
        <mesh ref={outerRef}>
          <dodecahedronGeometry args={[2.2, 0]} />
          <meshBasicMaterial
            color="#64ffda"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Middle icosahedron wireframe */}
        <mesh ref={midRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            color="#64ffda"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>

        {/* Inner core group */}
        <group ref={innerRef}>
          {/* Core octahedron */}
          <mesh>
            <octahedronGeometry args={[0.8, 0]} />
            <meshBasicMaterial
              color="#64ffda"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Inner glow sphere */}
          <mesh>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshBasicMaterial color="#64ffda" transparent opacity={0.08} />
          </mesh>
        </group>

        {/* Orbital rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.9, 0.008, 8, 64]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.0, 0.008, 8, 64]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 5, -Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[1.7, 0.008, 8, 64]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.15} />
        </mesh>

        {/* Corner accent dots */}
        {[
          [1.5, 1.5, 0],
          [-1.5, 1.5, 0],
          [1.5, -1.5, 0],
          [-1.5, -1.5, 0],
          [0, 1.5, 1.5],
          [0, -1.5, 1.5],
          [0, 1.5, -1.5],
          [0, -1.5, -1.5],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#64ffda" transparent opacity={0.6} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function HeroModel() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <CodeMatrix />
      </Canvas>
    </div>
  );
}
