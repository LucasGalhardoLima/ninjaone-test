import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonRootProps {
  children: React.ReactNode;
  variant?: "primary";
}

const ButtonRoot: React.FC<ButtonRootProps> = ({ children, variant }) => {
  const buttonClass = cx(
    "p-3 rounded-[4px] flex gap-2 items-center",
    variant === "primary" && "bg-[#337AB7] text-white hover:bg-[#2e6da4]"
  );

  return <button className={buttonClass}>{children}</button>;
};

export default ButtonRoot;
