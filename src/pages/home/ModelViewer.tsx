import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Model from "../../components/model-viewer/Model";
import Lights from "../../components/model-viewer/Lights";
import Controls from "../../components/model-viewer/Controls";
import Navbar from "../../components/navbar/Navbar";

const ModelViewer: React.FC = () => {
  const controlsRef = useRef<any>(null); // Reference to OrbitControls
  const originalCameraPosRef = useRef<THREE.Vector3 | null>(null); // Store original camera position
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); // Store camera reference

  // Resets the camera and model position
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset(); // Reset OrbitControls
    }
    if (cameraRef.current && originalCameraPosRef.current) {
      cameraRef.current.position.copy(originalCameraPosRef.current); // Reset camera
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <>
      <div className="modeldiv">
        <Navbar onReset={resetView} />
        <Canvas
          shadows
          camera={{ fov: 60 }}
          style={{ background: "#1b1b1b" }}
          onCreated={({ camera }) =>
            (cameraRef.current = camera as THREE.PerspectiveCamera)
          }
        >
          <Suspense fallback={"Loading..."}>
            <Lights />
            <Model originalCameraPosRef={originalCameraPosRef} />
            <Controls ref={controlsRef} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default ModelViewer;
