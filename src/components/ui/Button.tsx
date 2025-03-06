import React from "react";
import "./button.css";
interface UIButtonProps {
  onClick: () => void;
  label: string;
}

const UIButton: React.FC<UIButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="btn">
      {label}
    </button>
  );
};

export default UIButton;
