import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonLabelProps {
  children: React.ReactNode;
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ children }) => {
  const labelClass = cx("text-sm font-medium");

  return <span className={labelClass}>{children}</span>;
};

export default ButtonLabel;
