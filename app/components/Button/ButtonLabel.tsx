import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonLabelProps {
  children: React.ReactNode;
  variant?: 'primary';
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ children, variant }) => {
  const labelClass = cx(
    "text-sm font-weight-500",
    variant === 'primary' && "text-white"
  );

  return <span className={labelClass}>{children}</span>;
};

export default ButtonLabel;