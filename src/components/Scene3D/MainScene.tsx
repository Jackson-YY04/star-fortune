import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing';
import * as THREE from 'three';
import StarParticles from './StarParticles';
import CentralOrb from './CentralOrb';
import AltarPlatform from './AltarPlatform';

const ALTARS = [
  { label: '星座', color: '#93c5fd', icon: '♈', route: '/zodiac' },
  { label: '塔罗牌', color: '#f9a8d4', icon: '🃏', route: '/tarot' },
  { label: '四柱推命', color: '#86efac', icon: '📅', route: '/bazi' },
  { label: '手相', color: '#fdba74', icon: '✋', route: '/palm' },
  { label: '数秘术', color: '#c4b5fd', icon: '🔢', route: '/numerology' },
];

export default function MainScene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-screen bg-[#0A0A1A]">
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <color attach="background" args={['#0A0A1A']} />

        <ambientLight intensity={0.1} color="#6366f1" />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#D4A843" />

        <StarParticles />
        <CentralOrb />

        {/* 环形排列五个祭坛 */}
        {ALTARS.map((altar, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const radius = 4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <AltarPlatform
              key={i}
              position={[x, -0.2, z]}
              rotation={-angle + Math.PI / 2}
              color={altar.color}
              label={altar.label}
              icon={altar.icon}
              route={altar.route}
              isHovered={hoveredIndex === i}
              onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
            />
          );
        })}

        {/* 地面平台 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
          <cylinderGeometry args={[6, 6, 0.4, 32]} />
          <meshStandardMaterial
            color="#0F0F1B"
            metalness={0.5}
            roughness={0.5}
            emissive="#222244"
            emissiveIntensity={0.2}
          />
        </mesh>

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.8}
          enableDamping
          dampingFactor={0.05}
        />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette offset={0.5} darkness={0.5} />
        </EffectComposer>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 pointer-events-none z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-400 to-purple-500 bg-clip-text text-transparent tracking-wide">
            星命回廊
          </h1>
          <p className="mt-2 text-amber-200/70 text-lg font-serif">
            旋转星盘，选择你的命运问卜
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 pointer-events-none z-10">
        <div className="max-w-4xl mx-auto flex justify-end">
          <p className="text-stone-400/60 text-sm font-serif">
            拖拽旋转 • 滚轮缩放 • 点击台座进入
          </p>
        </div>
      </div>
    </div>
  );
}