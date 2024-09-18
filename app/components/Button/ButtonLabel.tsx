import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonLabelProps {
  children: React.ReactNode;
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ children }) => {
  const labelClass = cx("text-sm font-weight-500");

  return <span className={labelClass}>{children}</span>;
};

export default ButtonLabel;
