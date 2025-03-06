import React, { forwardRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Controls = forwardRef<any>((_, ref) => (
  <OrbitControls
    ref={ref}
    // maxPolarAngle={Math.PI / 2} // Limit top movement
    enableZoom={false} // Disable zoom
    enablePan={false} // Disable panning
  />
));

export default Controls;
