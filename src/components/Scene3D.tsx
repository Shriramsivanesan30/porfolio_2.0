import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Orbiting point cloud that gives the core a sense of surrounding volume. */
function Halo({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    // Seeded PRNG keeps the cloud identical across re-renders.
    let seed = 0x2f6e2b1;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };

    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on a shell with jitter so it reads as a cloud, not a sphere.
      const r = 3.1 + rand() * 1.9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#9b6bff"
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

/** The core: a distorting inner mass wrapped in a wireframe shell. */
function Core({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;

    // Ease the group toward the pointer for parallax.
    group.current.rotation.y += (x * 0.5 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.32 - group.current.rotation.x) * 0.04;

    if (shell.current && !reduced) {
      shell.current.rotation.y += delta * 0.16;
      shell.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.55, 12]}>
        <MeshDistortMaterial
          color="#2c4bb5"
          emissive="#5b8cff"
          emissiveIntensity={0.42}
          roughness={0.28}
          metalness={0.65}
          distort={reduced ? 0 : 0.36}
          speed={1.4}
        />
      </Icosahedron>

      <Icosahedron ref={shell} args={[2.45, 1]}>
        <meshBasicMaterial color="#5b8cff" wireframe transparent opacity={0.24} />
      </Icosahedron>

      <Halo />
    </group>
  );
}

function Rig(props: ThreeElements["group"]) {
  return <group {...props} />;
}

export function Scene3D({ reduced }: { reduced: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Graceful fallback: a CSS glow stands in for the scene.
    return (
      <div
        aria-hidden="true"
        className="h-full w-full rounded-full opacity-30 blur-[90px]"
        style={{ background: "radial-gradient(circle, #5b8cff 0%, #9b6bff 45%, transparent 72%)" }}
      />
    );
  }

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7.2], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", () => setFailed(true));
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} color="#ffffff" />
      <pointLight position={[-5, -2, -4]} intensity={38} color="#9b6bff" distance={18} />
      <pointLight position={[5, 3, -2]} intensity={26} color="#ff6b4a" distance={16} />

      <Suspense fallback={null}>
        <Rig>
          <Core reduced={reduced} />
        </Rig>
      </Suspense>
    </Canvas>
  );
}
