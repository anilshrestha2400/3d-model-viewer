import React from "react";
import "./navbar.css";
import UIButton from "../ui/Button";

interface NavbarProps {
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <div className="navbar">
      <h2>3D Model Viewer</h2>
      <UIButton onClick={onReset} label="Reset View" />
    </div>
  );
};

export default Navbar;
