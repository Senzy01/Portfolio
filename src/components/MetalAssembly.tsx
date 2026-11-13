
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PIECE_COUNT = 90;

function createEmblemShape() {
  const shape = new THREE.Shape();

  shape.moveTo(0.58, 0.82);
  shape.bezierCurveTo(0.2, 1.12, -0.55, 1.08, -0.66, 0.55);
  shape.bezierCurveTo(-0.78, 0.02, 0.44, 0.1, 0.62, -0.28);
  shape.bezierCurveTo(0.88, -0.82, 0.12, -1.12, -0.58, -0.78);
  shape.lineTo(-0.38, -0.45);
  shape.bezierCurveTo(0.02, -0.68, 0.48, -0.62, 0.35, -0.3);
  shape.bezierCurveTo(0.22, 0.02, -0.85, -0.02, -0.88, 0.48);
  shape.bezierCurveTo(-0.93, 1.18, 0.22, 1.42, 0.85, 1.05);
  shape.closePath();

  return shape;
}

function AssemblyScene() {
  const assembly = useRef<THREE.Group>(null);
  const fragments = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pieces = useMemo(() => {
    return Array.from({ length: PIECE_COUNT }, (_, index) => {
      const angle = (index / PIECE_COUNT) * Math.PI * 2;
      const radius = 2.15 + Math.random() * 1.1;

      return {
        start: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 2.2
        ),
        angle,
        radius: 1.72 + Math.random() * 0.12,
        size: 0.045 + Math.random() * 0.09,
        speed: 0.12 + Math.random() * 0.28,
        rotation: Math.random() * Math.PI,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  const emblemGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(createEmblemShape(), {
        depth: 0.22,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.045,
        curveSegments: 24,
      }),
    []
  );

  const emblemMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c8c8c5",
        metalness: 0.96,
        roughness: 0.2,
      }),
    []
  );

  const fragmentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a9aaa8",
        metalness: 0.94,
        roughness: 0.24,
      }),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (assembly.current) {
      assembly.current.rotation.y +=
        (state.pointer.x * 0.16 - assembly.current.rotation.y) * 0.025;

      assembly.current.rotation.x +=
        (-state.pointer.y * 0.1 - assembly.current.rotation.x) * 0.025;

      assembly.current.position.y = Math.sin(time * 0.45) * 0.08;
    }

    if (!fragments.current) return;

    // Pieces orbit, converge, lock into position, then begin another cycle.
    const cycle = (time % 12) / 12;
    const assembleProgress = THREE.MathUtils.smoothstep(cycle, 0.42, 0.76);
    const scatterProgress = THREE.MathUtils.smoothstep(cycle, 0.91, 1);

    pieces.forEach((piece, index) => {
      const orbitAngle = piece.angle + time * piece.speed;
      const orbitPosition = new THREE.Vector3(
        Math.cos(orbitAngle) * (piece.radius + Math.sin(time + piece.offset) * 0.12),
        Math.sin(orbitAngle) * (piece.radius + Math.cos(time + piece.offset) * 0.12),
        piece.start.z + Math.sin(time * 0.7 + piece.offset) * 0.35
      );

      const assembledPosition = new THREE.Vector3(
        Math.cos(piece.angle) * piece.radius,
        Math.sin(piece.angle) * piece.radius,
        Math.sin(piece.angle * 3) * 0.12
      );

      const position = piece.start.clone().lerp(orbitPosition, 0.7);
      position.lerp(assembledPosition, assembleProgress);
      position.lerp(piece.start, scatterProgress);

      dummy.position.copy(position);
      dummy.rotation.set(
        time * piece.speed + piece.offset,
        time * 0.25 + piece.rotation,
        time * piece.speed * 0.7
      );
      dummy.scale.set(
        piece.size * 1.8,
        piece.size * 0.65,
        piece.size * 0.7
      );
      dummy.updateMatrix();

      fragments.current!.setMatrixAt(index, dummy.matrix);
    });

    fragments.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 6]} intensity={3.2} />
      <pointLight position={[-4, -2, 3]} intensity={1.8} color="#ffffff" />
      <pointLight position={[3, 1, -4]} intensity={1.2} color="#d8d5ce" />

      <group ref={assembly} position={[0.8, 0, 0]}>
        {/* The circular SENZY mark */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.65, 0.055, 20, 120]} />
          <meshStandardMaterial
            color="#d0d0cc"
            metalness={1}
            roughness={0.17}
          />
        </mesh>

        {/* The dimensional S */}
        <mesh
          geometry={emblemGeometry}
          material={emblemMaterial}
          position={[0, 0, -0.12]}
        />

        {/* Floating mechanical fragments */}
        <instancedMesh
          ref={fragments}
          args={[new THREE.BoxGeometry(1, 1, 1), fragmentMaterial, PIECE_COUNT]}
        />
      </group>
    </>
  );
}

export default function MetalAssembly() {
  return (
    <div className="metal-assembly" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <AssemblyScene />
      </Canvas>
    </div>
  );
}
