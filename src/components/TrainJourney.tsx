
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import "../styles/train-journey.css";


const stations = [
  {
    year: "2017 — 2024",
    title: "The Foundation",
    role: "BSc Computer Science",
    place: "Tai Solarin University of Education",
    description:
      "Where the journey began: developing a foundation in computer science, analytical thinking and the principles behind the software and systems we use every day.",
    highlight: "A foundation in technology, logic and problem-solving.",
  },
  {
    year: "APRIL — JUNE 2025",
    title: "Understanding the Digital World",
    role: "Digital Marketer",
    place: "Zimcrest Technologies",
    description:
      "Worked across digital campaigns, content, market research and analytics, developing a broader understanding of how technology, communication and audience behaviour connect.",
    highlight: "Digital campaigns · Content · Analytics",
  },
  {
    year: "SEPTEMBER — DECEMBER 2025",
    title: "Turning Technical Knowledge into Solutions",
    role: "Full-Stack Developer",
    place: "Slum and Rural Health Initiative Network",
    description:
      "Worked on web applications, responsive interfaces, application logic and data-driven tools designed around real organisational needs and stakeholder requirements.",
    highlight: "Web applications · Interfaces · Application logic",
  },
  {
    year: "2025 — PRESENT",
    title: "Building Beyond Myself",
    role: "Founder & Full-Stack Developer",
    place: "Senzy Enterprises",
    description:
      "Founded Senzy to turn ideas into digital products and experiences. Leading product direction, interface development and technical exploration, including the ongoing development of Senzy Core.",
    highlight: "React · Node.js · APIs · Digital product development",
  },
  {
    year: "JANUARY — JUNE 2026",
    title: "Technology Meets Operations",
    role: "Administrative Officer",
    place: "Slum and Rural Health Initiative Network",
    description:
      "Supported organisational operations, documentation, procurement and financial administration, while contributing to onboarding more than 30 people over three months.",
    highlight: "30+ people onboarded · Operations · Administration",
  },
  {
    year: "AUGUST 2026",
    title: "Solving Problems That Matter",
    role: "Contract Web Developer",
    place: "Iwemi · Remote",
    description:
      "Addressed a nopCommerce first-load issue that required a page refresh and reviewed registered-user, administrator and order-booking workflows.",
    highlight: "Debugging · Application workflows · Problem-solving",
  },
  {
    year: "PROJECT ENGAGEMENT",
    title: "Supporting Work Beyond the Screen",
    role: "Administrative Project Support",
    place: "ActFast Project · SRHIN",
    description:
      "Contributed to project coordination through documentation, event logistics and activity support, strengthening the organisational side of delivering meaningful work.",
    highlight: "Project coordination · Documentation · Logistics",
  },
];


const stationPositions = stations.map(
  (_, index) => -9 + index * 3
);

function Metal({ color = "#b9b9b5", roughness = 0.3, metalness = 0.85 }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
    />
  );
}

function Wheel({ position, rotation = 0 }: {
  position: [number, number, number];
  rotation?: number;
}) {
  const wheel = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheel.current) wheel.current.rotation.z -= delta * 2.4;
  });

  return (
    <group ref={wheel} position={position} rotation={[0, 0, rotation]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.19, 40]} />
        <Metal color="#171918" roughness={0.38} />
      </mesh>

      <mesh position={[0, 0.105, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.025, 32]} />
        <Metal color="#c4c4be" roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.125, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
        <Metal color="#555751" roughness={0.24} />
      </mesh>
    </group>
  );
}

function Bogie({ x }: { x: number }) {
  return (
    <group position={[x, -0.44, 0]}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.45, 0.2, 1.22]} />
        <Metal color="#292b29" roughness={0.45} />
      </mesh>

      {[-0.48, 0.48].map((offset) => (
        <Wheel
          key={offset}
          position={[offset, -0.12, 0.64]}
        />
      ))}

      {[-0.48, 0.48].map((offset) => (
        <Wheel
          key={`back-${offset}`}
          position={[offset, -0.12, -0.64]}
        />
      ))}
    </group>
  );
}

function TrainWindow({ position, size = [0.42, 0.48, 0.035] }: {
  position: [number, number, number];
  size?: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#252a29"
        metalness={0.6}
        roughness={0.16}
      />
    </mesh>
  );
}

function PassengerCarriage({ position }: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Main carriage shell */}
      <mesh castShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[3.3, 1.38, 1.35]} />
        <Metal color="#c1c2bd" roughness={0.27} />
      </mesh>

      {/* Dark lower body */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[3.25, 0.22, 1.38]} />
        <Metal color="#333633" roughness={0.36} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.88, 0]}>
        <boxGeometry args={[3.15, 0.13, 1.32]} />
        <Metal color="#777a75" roughness={0.27} />
      </mesh>

      {/* Passenger windows */}
      {[-1.1, -0.55, 0, 0.55, 1.1].map((x) => (
        <TrainWindow
          key={x}
          position={[x, 0.27, 0.687]}
          size={[0.39, 0.58, 0.025]}
        />
      ))}

      {/* Doors */}
      {[-1.45, 1.45].map((x) => (
        <mesh key={x} position={[x, 0.1, 0.694]}>
          <boxGeometry args={[0.28, 1.05, 0.035]} />
          <Metal color="#72746f" roughness={0.3} />
        </mesh>
      ))}

      <Bogie x={-1.05} />
      <Bogie x={1.05} />

      {/* Carriage connection */}
      <mesh position={[-1.75, -0.18, 0]}>
        <boxGeometry args={[0.4, 0.12, 0.16]} />
        <Metal color="#777a74" />
      </mesh>
    </group>
  );
}

function Locomotive() {
  return (
    <group>
      {/* Main engine body */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[3.45, 1.28, 1.48]} />
        <Metal color="#b9bbb6" roughness={0.24} />
      </mesh>

      {/* Front aerodynamic nose */}
      <mesh
        castShadow
        position={[1.8, 0.12, 0]}
        rotation={[0, 0, -0.12]}
      >
        <sphereGeometry args={[0.83, 32, 24]} />
        <Metal color="#d3d3ce" roughness={0.2} />
      </mesh>

      {/* Front lower bumper */}
      <mesh position={[1.85, -0.35, 0]}>
        <boxGeometry args={[0.75, 0.22, 1.45]} />
        <Metal color="#3b3e39" roughness={0.35} />
      </mesh>

      {/* Driver cabin */}
      <mesh castShadow position={[-0.75, 1.02, 0]}>
        <boxGeometry args={[1.48, 0.83, 1.43]} />
        <Metal color="#aeb0aa" roughness={0.22} />
      </mesh>

      {/* Sloped windscreen */}
      <mesh position={[0.02, 1.04, 0.73]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.95, 0.52, 0.035]} />
        <meshStandardMaterial
          color="#222a2a"
          metalness={0.65}
          roughness={0.12}
        />
      </mesh>

      {/* Side cabin window */}
      <TrainWindow
        position={[-0.9, 1.04, 0.735]}
        size={[0.65, 0.46, 0.035]}
      />

      {/* Side engine details */}
      {[-0.8, -0.25, 0.3].map((x) => (
        <mesh key={x} position={[x, 0.05, 0.755]}>
          <boxGeometry args={[0.32, 0.3, 0.025]} />
          <Metal color="#656861" roughness={0.34} />
        </mesh>
      ))}

      {/* Engine roof equipment */}
      <mesh position={[-0.35, 1.48, 0]}>
        <boxGeometry args={[1.7, 0.12, 1.05]} />
        <Metal color="#666963" />
      </mesh>

      {/* Front headlights */}
      {[-0.42, 0.42].map((z) => (
        <mesh key={z} position={[2.38, 0.16, z]}>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshStandardMaterial
            color="#fff5d8"
            emissive="#e9d7a8"
            emissiveIntensity={1.5}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Front grille */}
      {Array.from({ length: 7 }, (_, index) => (
        <mesh
          key={index}
          position={[
            2.42,
            -0.08 - index * 0.045,
            -0.24 + index * 0.08,
          ]}
        >
          <boxGeometry args={[0.025, 0.018, 0.045]} />
          <Metal color="#555750" />
        </mesh>
      ))}

      {/* Undercarriage */}
      <mesh position={[0, -0.52, 0]}>
        <boxGeometry args={[3.6, 0.25, 1.5]} />
        <Metal color="#252825" roughness={0.48} />
      </mesh>

      <Bogie x={-1.05} />
      <Bogie x={1.05} />

      {/* Connecting rods */}
      {[-0.55, 0.55].map((z) => (
        <mesh
          key={z}
          position={[0, -0.56, z]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[1.05, 0.055, 0.06]} />
          <Metal color="#a5a69f" roughness={0.23} />
        </mesh>
      ))}
    </group>
  );
}

function Train({ progress }: { progress: React.RefObject<number> }) {
  const train = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!train.current) return;

    const targetX = -5.5 + progress.current * 11;

    train.current.position.x = THREE.MathUtils.damp(
      train.current.position.x,
      targetX,
      3,
      1 / 60
    );
  });

  return (
    <group ref={train} position={[-8, 0.68, 0]}>
      <Locomotive />

      {/* The train pulls two passenger carriages */}
      <PassengerCarriage position={[-4.15, 0, 0]} />
      <PassengerCarriage position={[-7.65, 0, 0]} />

      {/* Couplings */}
      {[-2.05, -5.65].map((x) => (
        <mesh key={x} position={[x, -0.1, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.16]} />
          <Metal color="#6d7069" />
        </mesh>
      ))}
    </group>
  );
}

function Railway() {
  const sleepers = useMemo(
    () => Array.from({ length: 64 }, (_, index) => -16 + index * 0.5),
    []
  );

  return (
    <group>
      {/* Railway sleepers */}
      {sleepers.map((x) => (
        <mesh key={x} position={[x, -0.16, 0]}>
          <boxGeometry args={[0.16, 0.16, 3.1]} />
          <Metal color="#393b36" roughness={0.85} />
        </mesh>
      ))}

      {/* Steel rails */}
      {[-0.85, 0.85].map((z) => (
        <mesh key={z} position={[0, -0.04, z]}>
          <boxGeometry args={[34, 0.13, 0.12]} />
          <Metal color="#c3c4be" roughness={0.2} />
        </mesh>
      ))}

      {/* Rail fasteners */}
      {sleepers.map((x) =>
        [-0.85, 0.85].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.035, z]}>
            <boxGeometry args={[0.12, 0.035, 0.23]} />
            <Metal color="#777970" />
          </mesh>
        ))
      )}

      {/* Station platform */}
      <mesh position={[0, -0.28, 2.3]}>
        <boxGeometry args={[34, 0.38, 2.1]} />
        <meshStandardMaterial color="#343630" roughness={0.9} />
      </mesh>

      {/* Platform edge */}
      <mesh position={[0, -0.075, 1.28]}>
        <boxGeometry args={[34, 0.035, 0.12]} />
        <meshStandardMaterial color="#c3bca7" roughness={0.65} />
      </mesh>

      {/* Platform lights */}
      {[-13, -6, 1, 8, 14].map((x) => (
        <group key={x} position={[x, 0, 3.1]}>
          <mesh position={[0, 1.9, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 3.8, 12]} />
            <Metal color="#73746d" />
          </mesh>
          <mesh position={[0, 3.8, 0]}>
            <boxGeometry args={[0.45, 0.08, 0.3]} />
            <meshStandardMaterial
              color="#fff0c9"
              emissive="#e5d6ae"
              emissiveIntensity={1.1}
            />
          </mesh>
          <pointLight
            position={[0, 3.4, 0]}
            color="#e8dfca"
            intensity={1.2}
            distance={5}
          />
        </group>
      ))}
    </group>
  );
}

function StationMarkers() {
  return (
    <>
      {stations.map((station, index) => (
        <group
          key={station.title}
          position={[stationPositions[index], 0, -2.2]}
        >
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.15, 24]} />
            <meshStandardMaterial
              color="#d2c7aa"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          <Html
            position={[0, 1.55, 0]}
            center
            distanceFactor={10}
            occlude={false}
          >
            <div className="train-scene-label">
              <span>{station.year}</span>
              <strong>{station.title}</strong>
              <small>{station.role}</small>
              <small>{station.place}</small>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

function TrainScene({ progress }: {
  progress: React.RefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 5.1, 18], fov: 43 }}
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={["#10100e", 15, 32]} />

      <ambientLight intensity={1.05} />
      <hemisphereLight args={["#eee9dc", "#292923", 1.1]} />

      <directionalLight
        position={[4, 9, 7]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight
        position={[-5, 4, 0]}
        color="#e7dfca"
        intensity={2}
        distance={18}
      />

      <Railway />
      <Train progress={progress} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.51, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 12]} />
        <meshStandardMaterial color="#11110f" roughness={0.95} />
      </mesh>
    </Canvas>
  );
}


export default function TrainJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);

  const [mobile, setMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");

    const update = () => setMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (mobile) return;

    let frame = 0;

    


const updateProgress = () => {
  if (!sectionRef.current) return;

  const section = sectionRef.current;
  const sectionTop = section.getBoundingClientRect().top;
  const scrollDistance = section.offsetHeight - window.innerHeight;

  if (scrollDistance <= 0) return;

  const nextProgress = Math.min(
    1,
    Math.max(0, -sectionTop / scrollDistance)
  );

  progress.current = nextProgress;

  const nextIndex = Math.min(
    stations.length - 1,
    Math.floor(nextProgress * stations.length)
  );

  setActiveIndex(nextIndex);
  setProgressPercent(nextProgress * 100);
};




    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [mobile]);

  const station = stations[activeIndex];

  return (
    <section
  className={`train-journey ${mobile ? "is-mobile" : "is-desktop"}`}
  id="journey"
  ref={sectionRef}
  style={
    mobile
      ? undefined
      : {
          height: `${100 + (stations.length - 1) * 55}svh`,
        }
  }
>
      <div className="train-sticky-stage">
        {!mobile && (
          <div className="train-canvas">
            <TrainScene progress={progress} />
          </div>
        )}

        <div className="train-heading">
          <span className="eyebrow">THE JOURNEY SO FAR</span>

          <h2>
            EVERY STOP
            <br />
            <span>SHAPED THE BUILDER.</span>
          </h2>

          <p>
            Every experience added a new perspective.
            Every challenge developed another capability.
            This is the journey behind the work.
          </p>
        </div>

        {!mobile && (
          <>
            <div className="train-active-stop" key={activeIndex}>
              <div className="train-stop-topline">
                <span>CHAPTER {String(activeIndex + 1).padStart(2, "0")}</span>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(stations.length).padStart(2, "0")}</span>
              </div>

              <span className="train-stop-year">{station.year}</span>

              <h3>{station.title}</h3>

              <strong>{station.role}</strong>

              <span className="train-stop-place">{station.place}</span>

              <p>{station.description}</p>

              <div className="train-stop-highlight">
                {station.highlight}
              </div>
            </div>

            <div className="train-progress">
              <span>ORIGIN</span>

              <div>
                <i style={{ width: `${progressPercent}%` }} />
              </div>

              <span>DESTINATION</span>
            </div>

            <div className="train-scroll-hint">
              SCROLL TO MOVE THROUGH MY STORY <span>↓</span>
            </div>
          </>
        )}
      </div>

      {mobile && (
        <div className="train-mobile-timeline">
          {stations.map((item, index) => (
            <article className="train-mobile-station" key={item.title}>
              <span className="train-mobile-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <span className="eyebrow">{item.year}</span>
                <h3>{item.title}</h3>
                <strong>{item.role}</strong>
                <p className="train-mobile-place">{item.place}</p>
                <p>{item.description}</p>

                <div className="train-stop-highlight">
                  {item.highlight}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

