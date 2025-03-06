import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
interface ModelProps {
  originalCameraPosRef: React.MutableRefObject<THREE.Vector3 | null>;
}

const Model: React.FC<ModelProps> = ({ originalCameraPosRef }) => {
  const [loading, setLoading] = useState(true); // Manage loading state
  const { scene } = useGLTF("/cube.glb", true); // Load 3D model, true enables the loader
  const { camera } = useThree();
  const modelRef = useRef<THREE.Group>(null); // Reference to the 3D model
  const isDragging = useRef(false); // Track mouse drag state
  const previousMouseX = useRef(0); // Store previous mouse position

  useEffect(() => {
    if (scene) {
      // Set loading state to false once the model is loaded
      setLoading(false);

      // Calculate the bounding box of the model
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);

      // Set initial camera position
      const initialPos = new THREE.Vector3(0, maxSize / 1.5, maxSize * 3);
      camera.position.copy(initialPos);
      camera.lookAt(0, 0, 0);

      // Store original camera position for resetting view
      if (!originalCameraPosRef.current) {
        originalCameraPosRef.current = initialPos.clone();
      }
    }
  }, [scene, camera, originalCameraPosRef]);

  /** Handles mouse down event */
  const handleMouseDown = (event: MouseEvent) => {
    isDragging.current = true;
    previousMouseX.current = event.clientX;
  };

  /** Handles mouse move event for rotating the model */
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current && modelRef.current) {
      const deltaX = event.clientX - previousMouseX.current;
      modelRef.current.rotation.y += deltaX * 0.01; // Adjust rotation speed as needed
      previousMouseX.current = event.clientX;
    }
  };

  /** Handles mouse up event */
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Attach and clean up mouse event listeners
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>{loading ? "Loading..." : <primitive ref={modelRef} object={scene} />}</>
  );
};

export default Model;
