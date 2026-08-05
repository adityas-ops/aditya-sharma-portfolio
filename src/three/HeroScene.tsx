import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IcosahedronProps {
  initialPos: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
}

function FloatingIcosahedron({ initialPos, scale, speed, offset }: IcosahedronProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = initialPos[0] + Math.sin(t * 0.3) * 0.3;
      meshRef.current.position.y = initialPos[1] + Math.cos(t * 0.4) * 0.3;
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={initialPos} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#FF4D00" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

export function HeroScene() {
  const icosahedrons = useMemo(() => {
    // Push shapes to far edges only — keep center clear for text
    const positions: [number, number, number][] = [
      [6.5, 3.0, -3],
      [-6.5, 3.5, -2],
      [7.0, -2.5, -2],
      [-7.0, -3.0, -3],
      [5.5, -4.0, -4],
      [-5.5, 4.0, -4],
    ];

    return positions.map((pos, i) => ({
      id: i,
      initialPos: pos,
      scale: 0.4 + (i % 3) * 0.2,
      speed: 0.3 + (i % 2) * 0.15,
      offset: i * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        orthographic
        camera={{ zoom: 60, position: [0, 0, 5] }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {icosahedrons.map((item) => (
          <FloatingIcosahedron
            key={item.id}
            initialPos={item.initialPos}
            scale={item.scale}
            speed={item.speed}
            offset={item.offset}
          />
        ))}
      </Canvas>
    </div>
  );
}

export default HeroScene;
