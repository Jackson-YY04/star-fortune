import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CentralOrb() {
  const orbRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.4;
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={orbRef} position={[0, -1.2, 0]}>
      {/* 细光环 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#D4A843"
          emissive="#D4A843"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* 倾斜光环 */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.9, 0.015, 16, 60]} />
        <meshStandardMaterial
          color="#7B2FBE"
          emissive="#7B2FBE"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 微小的发光核心 */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#f0d060"
          emissive="#f0d060"
          emissiveIntensity={1.5}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      {/* 光晕 */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}