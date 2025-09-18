import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Coin({ position }: { position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.5;
  });
  return (
    <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.08, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function Card({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += delta * 0.1;
  });
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} rotation={rotation} castShadow>
        <boxGeometry args={[1.2, 0.02, 0.8]} />
        <meshStandardMaterial color="#1e90ff" metalness={0.6} roughness={0.4} />
      </mesh>
    </Float>
  );
}

function Bars({ position }: { position: [number, number, number] }) {
  const heights = useMemo(() => [0.4, 0.8, 1.1, 0.7, 1.3], []);
  return (
    <group position={position}>
      {heights.map((h, i) => (
        <Float key={i} speed={0.4} rotationIntensity={0.15} floatIntensity={0.4}>
          <mesh position={[i * 0.25, h / 2, 0]} castShadow>
            <boxGeometry args={[0.18, h, 0.18]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#00b894" : "#0984e3"} metalness={0.4} roughness={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Pie({ position }: { position: [number, number, number] }) {
  const segments = [
    { color: "#00b894", start: 0, length: Math.PI * 0.6 },
    { color: "#0984e3", start: Math.PI * 0.6, length: Math.PI * 0.25 },
    { color: "#D4AF37", start: Math.PI * 0.85, length: Math.PI * 0.15 },
  ];
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      {segments.map((s, i) => (
        <Float key={i} speed={0.45} rotationIntensity={0.1} floatIntensity={0.35}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.5, 32, 1, s.start, s.length]} />
            <meshStandardMaterial color={s.color} metalness={0.5} roughness={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ParallaxGroup({ children }: { children: any }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ mouse }) => {
    if (!group.current) return;
    group.current.position.x = mouse.x * 0.5;
    group.current.position.y = mouse.y * 0.3;
  });
  return <group ref={group}>{children}</group>;
}

export default function FinancialBackground({ mode = "fixed" as "fixed" | "container" }) {
  const wrapperClass = mode === "fixed" ? "pointer-events-none fixed inset-0 -z-10" : "pointer-events-none absolute inset-0 -z-10";
  return (
    <div className={wrapperClass}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }} shadows>
        {/* Soft gradient lights */}
        <color attach="background" args={["#0b1220"]} />
        <ambientLight intensity={0.35} />
        <spotLight position={[6, 8, 6]} angle={0.3} penumbra={0.6} intensity={1.0} color="#5ec2ff" castShadow />
        <spotLight position={[-6, -4, 4]} angle={0.4} penumbra={0.6} intensity={0.9} color="#20e3b2" />
        <spotLight position={[0, 4, -6]} angle={0.4} penumbra={0.6} intensity={0.8} color="#ffd166" />

        <ParallaxGroup>
          {/* Arrange floating finance primitives */}
          <Coin position={[-2.5, 0.4, -1]} />
          <Coin position={[2.2, -0.2, 0.5]} />
          <Card position={[0.6, 1.1, -0.8]} rotation={[0.2, 0.4, 0.1]} />
          <Card position={[-1.4, -0.8, 0.4]} rotation={[0.1, -0.3, -0.1]} />
          <Bars position={[-0.2, -0.6, -0.2]} />
          <Pie position={[1.8, 0.2, 0]} />
        </ParallaxGroup>

        {/* Subtle stars/particles for depth */}
        <Particles count={160} radius={7} />

        {/* Remove controls in production; they are pointer-events-none anyway */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

function Particles({ count = 80, radius = 5 }: { count?: number; radius?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count, radius]);

  const material = useMemo(() => new THREE.PointsMaterial({ color: "#4b6cb7", size: 0.02, sizeAttenuation: true, transparent: true, opacity: 0.6 }), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}


