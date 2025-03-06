import React from "react";

const Lights: React.FC = () => (
  <>
    <ambientLight intensity={1.5} /> {/* Soft ambient lighting */}
    <directionalLight position={[2, 5, 5]} intensity={1.5} castShadow />
    {/* Strong directional lighting */}
  </>
);

export default Lights;
