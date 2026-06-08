import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

interface AltarPlatformProps {
  position: [number, number, number];
  rotation: number;
  color: string;
  label: string;
  icon: string;
  route: string;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

export default function AltarPlatform({
  position,
  rotation,
  color,
  label,
  icon,
  route,
  isHovered,
  onHover
}: AltarPlatformProps) {
  const groupRef = useRef<THREE.Group>(null);
  const navigate = useNavigate();
  const targetScale = isHovered ? 1.2 : 1;

  useFrame((_, delta) => {
    if (groupRef.current) {
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 5);
      groupRef.current.scale.setScalar(newScale);
      groupRef.current.position.y = position[1] + (isHovered ? 0.3 : 0);
    }
  });

  const handleClick = () => {
    navigate(route);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotation, 0]}
      onClick={handleClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* 底座 */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* 柱身 */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.5, 1.2, 6]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.6}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={isHovered ? 0.4 : 0.1}
        />
      </mesh>

      {/* 顶部发光环 */}
      <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.06, 16, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1.5 : 0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 顶部宝石 */}
      <mesh position={[0, 1.05, 0]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 2 : 0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 浮动粒子 */}
      {isHovered && (
        <>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 0.8;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * r,
                  0.5 + Math.sin(i * 3) * 0.3,
                  Math.sin(angle) * r
                ]}
              >
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={1}
                />
              </mesh>
            );
          })}
        </>
      )}

      {/* 标签 */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {icon} {label}
      </Text>
    </group>
  );
}