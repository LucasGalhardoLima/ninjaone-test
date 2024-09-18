import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonLeftIconProps {
  icon: React.ReactElement<SVGElement>;
  variant?: "primary";
}

const ButtonLeftIcon: React.FC<ButtonLeftIconProps> = ({ icon, variant }) => {
  const iconClass = cx(
    "flex items-center",
    variant === "primary" && "fill-white"
  );

  return React.cloneElement(icon, { className: iconClass });
};

export default ButtonLeftIcon;
