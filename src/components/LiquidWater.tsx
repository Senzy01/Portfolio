
import { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaterSurface() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          varying vec2 vUv;

          void main() {
            vec3 p = position;
            float t = uTime;

            float a = p.x * 0.72 + t * 0.45;
            float b = p.y * 1.05 - t * 0.38;
            float c = (p.x + p.y) * 1.45 + t * 0.32;

            float wave =
              sin(a) * 0.20 +
              cos(b) * 0.12 +
              sin(c) * 0.055;

            float dx =
              0.20 * 0.72 * cos(a) +
              0.055 * 1.45 * cos(c);

            float dy =
              -0.12 * 1.05 * sin(b) +
              0.055 * 1.45 * cos(c);

            p.z += wave;

            vec3 objectNormal = normalize(vec3(-dx, -dy, 1.0));
            vNormal = normalize(normalMatrix * objectNormal);
            vUv = uv;

            vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
            vViewPosition = -viewPosition.xyz;

            gl_Position = projectionMatrix * viewPosition;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          varying vec2 vUv;

          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDirection = normalize(vViewPosition);
            vec3 lightDirection = normalize(vec3(-0.45, 0.75, 1.0));

            float diffuse = max(dot(normal, lightDirection), 0.0);

            vec3 halfDirection = normalize(lightDirection + viewDirection);
            float specular = pow(
              max(dot(normal, halfDirection), 0.0),
              85.0
            );

            float fresnel = pow(
              1.0 - max(dot(normal, viewDirection), 0.0),
              3.0
            );

            float ripple =
              sin(vUv.x * 42.0 + uTime * 0.35) *
              sin(vUv.y * 32.0 - uTime * 0.25);

            vec3 deepWater = vec3(0.012, 0.035, 0.065);
            vec3 chrome = vec3(0.42, 0.67, 0.83);
            vec3 electricBlue = vec3(0.08, 0.30, 0.52);

            vec3 color = mix(
              deepWater,
              electricBlue,
              0.22 + diffuse * 0.20 + fresnel * 0.25
            );

            color += chrome * specular * 1.15;
            color += vec3(0.12, 0.22, 0.30) * max(ripple, 0.0) * 0.08;

            gl_FragColor = vec4(color, 0.86);
          }
        `,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[22, 13, 180, 120]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function LiquidWater() {
  return (
    <div className="liquid-water">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <WaterSurface />
      </Canvas>
    </div>
  );
}
