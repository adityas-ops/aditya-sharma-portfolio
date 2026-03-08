import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

function ImagePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/assets/aditya-hero.png");

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Subtle mouse-follow rotation
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.15,
      0.05,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -pointer.y * 0.08,
      0.05,
    );

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }

    // Glow pulse
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.03;
      glowRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <group ref={meshRef}>
          {/* Glow behind image */}
          <mesh ref={glowRef} position={[0, 0, -0.05]}>
            <planeGeometry args={[3.2, 3.7]} />
            <meshBasicMaterial
              color="#64ffda"
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Main image */}
          <mesh>
            <planeGeometry args={[3, 3.5]} />
            <meshBasicMaterial
              map={texture}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Border frame */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(3.1, 3.6)]} />
            <lineBasicMaterial color="#64ffda" transparent opacity={0.6} />
          </lineSegments>
        </group>
      </Float>

      {/* Orbiting ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.3, 0.01, 8, 64]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.3} />
      </mesh>

      {/* Accent shapes */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[2.2, 1.8, 0.5]}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial
            color="#64ffda"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[-2, -1.5, 0.3]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial
            color="#64ffda"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-1.8, 2, -0.5]}>
          <torusGeometry args={[0.12, 0.04, 8, 16]} />
          <meshBasicMaterial
            color="#64ffda"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#64ffda" />
        <ImagePlane />
      </Canvas>
    </div>
  );
}
