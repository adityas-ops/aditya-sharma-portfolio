import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const wireRef = useRef<THREE.Mesh>(null);
  const dotsRef = useRef<THREE.Points>(null);

  const dotPositions = useMemo(() => {
    const positions = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.8;

      positions.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.1;
      wireRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.y = t * 0.1;
      dotsRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <group>
      {/* Wireframe sphere */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.8, 24, 18]} />
        <meshBasicMaterial
          color="#64ffda"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Connection dots */}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dotPositions.length / 3}
            array={dotPositions}
            itemSize={3}
            args={[dotPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#64ffda"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.1} />
      </mesh>

      {/* Latitude rings */}
      {[0.6, 1.2, 1.6].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, 0]}>
          <torusGeometry args={[radius, 0.005, 8, 64]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

export default function ContactGlobe() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "400px",
        opacity: 0.4,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Globe />
      </Canvas>
    </div>
  );
}
