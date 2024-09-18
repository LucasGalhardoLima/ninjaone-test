import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonIconProps {
  icon: React.ReactElement<SVGElement>;
  variant?: "primary" | "ghost";
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, variant }) => {
  const iconClass = cx(
    "flex items-center",
    variant === "primary" && "fill-white",
    variant === "ghost" && "fill-[#211F33]"
  );

  return React.cloneElement(icon, { className: iconClass });
};

export default ButtonIcon;
