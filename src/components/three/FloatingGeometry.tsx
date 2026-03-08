import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  speed,
  rotationAxis,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus";
  speed: number;
  rotationAxis: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const timeOffset = Math.random() * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Floating animation
    meshRef.current.position.y =
      initialY + Math.sin(t * speed + timeOffset) * 0.5;

    // Rotation
    meshRef.current.rotation.x += rotationAxis[0] * 0.003;
    meshRef.current.rotation.y += rotationAxis[1] * 0.003;
    meshRef.current.rotation.z += rotationAxis[2] * 0.003;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[0.6, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.15, 8, 16]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshBasicMaterial color="#64ffda" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

const shapes = [
  {
    position: [-8, 3, -5] as [number, number, number],
    geometry: "icosahedron" as const,
    speed: 0.4,
    rotationAxis: [1, 0.5, 0.3] as [number, number, number],
  },
  {
    position: [7, -2, -8] as [number, number, number],
    geometry: "octahedron" as const,
    speed: 0.6,
    rotationAxis: [0.3, 1, 0.2] as [number, number, number],
  },
  {
    position: [-5, -4, -6] as [number, number, number],
    geometry: "torus" as const,
    speed: 0.5,
    rotationAxis: [0.5, 0.3, 1] as [number, number, number],
  },
  {
    position: [9, 5, -10] as [number, number, number],
    geometry: "icosahedron" as const,
    speed: 0.3,
    rotationAxis: [0.2, 0.8, 0.5] as [number, number, number],
  },
  {
    position: [-10, 1, -7] as [number, number, number],
    geometry: "octahedron" as const,
    speed: 0.7,
    rotationAxis: [0.7, 0.2, 0.6] as [number, number, number],
  },
  {
    position: [4, -5, -9] as [number, number, number],
    geometry: "torus" as const,
    speed: 0.45,
    rotationAxis: [0.4, 0.6, 0.3] as [number, number, number],
  },
  {
    position: [-3, 6, -12] as [number, number, number],
    geometry: "icosahedron" as const,
    speed: 0.35,
    rotationAxis: [0.6, 0.4, 0.8] as [number, number, number],
  },
  {
    position: [6, 0, -6] as [number, number, number],
    geometry: "octahedron" as const,
    speed: 0.55,
    rotationAxis: [0.8, 0.3, 0.4] as [number, number, number],
  },
];

export default function FloatingGeometry() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        {shapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </Canvas>
    </div>
  );
}
