import React from "react";
import { cx } from "~/utils/helpers";


interface ButtonLeftIconProps {
  icon: React.ReactNode;
  variant?: 'primary';
}

const ButtonLeftIcon: React.FC<ButtonLeftIconProps> = ({ icon, variant }) => {
  const iconClass = cx(
    "flex items-center",
    variant === 'primary' && "text-white"
  );

  return <span className={iconClass}>{icon}</span>;
};

export default ButtonLeftIcon;