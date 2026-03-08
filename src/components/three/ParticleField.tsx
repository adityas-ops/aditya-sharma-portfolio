import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 30;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      // Teal-ish colors with variation
      const tealIntensity = 0.3 + Math.random() * 0.7;
      col[i3] = 0.39 * tealIntensity * 0.3;
      col[i3 + 1] = 1.0 * tealIntensity * 0.6;
      col[i3 + 2] = 0.85 * tealIntensity * 0.5;
    }
    return [pos, col];
  }, []);

  const handlePointerMove = useCallback((e: MouseEvent) => {
    mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useMemo(() => {
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    // Gentle overall rotation only - no per-particle updates for performance
    mesh.current.rotation.y += delta * 0.015;
    mesh.current.rotation.x += delta * 0.008;

    // Subtle position shift based on mouse
    mesh.current.position.x = mousePos.current.x * 0.3;
    mesh.current.position.y = mousePos.current.y * 0.3;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Particles />
      </Canvas>
    </div>
  );
}
