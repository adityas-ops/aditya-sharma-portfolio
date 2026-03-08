import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "GSAP", color: "#88CE02" },
  { name: "Redux", color: "#764ABC" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Node.js", color: "#339933" },
  { name: "Three.js", color: "#ffffff" },
];

function SkillOrb({
  name,
  color,
  position,
  index,
}: {
  name: string;
  color: string;
  position: [number, number, number];
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const timeOffset = index * 0.8;

  useFrame(({ clock }) => {
    if (!groupRef.current || !orbRef.current) return;
    const t = clock.getElapsedTime();

    // Orbit animation
    const radius = 2.5 + Math.sin(index * 1.2) * 0.8;
    const speed = 0.15 + index * 0.02;
    const heightVariation = Math.sin(t * 0.3 + timeOffset) * 0.5;

    groupRef.current.position.x = Math.cos(t * speed + timeOffset) * radius;
    groupRef.current.position.z = Math.sin(t * speed + timeOffset) * radius;
    groupRef.current.position.y = position[1] + heightVariation;

    // Self rotation
    orbRef.current.rotation.x += 0.005;
    orbRef.current.rotation.y += 0.008;
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Inner glow sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
        {/* Text label */}
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.14}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/SFMono/SFMono-Regular.woff2"
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.+#"
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    const scale = 1 + Math.sin(t * 1.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshBasicMaterial color="#64ffda" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export default function SkillOrbs() {
  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <CentralOrb />
        {skills.map((skill, i) => (
          <SkillOrb
            key={skill.name}
            name={skill.name}
            color={skill.color}
            position={[0, ((i % 3) - 1) * 0.5, 0]}
            index={i}
          />
        ))}
      </Canvas>
    </div>
  );
}
