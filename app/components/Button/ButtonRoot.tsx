import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonRootProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
}

const ButtonRoot: React.FC<ButtonRootProps> = ({
  children,
  variant,
  onClick,
  className,
}) => {
  const buttonClass = cx(
    "p-3 rounded-[4px] flex gap-2 items-center",
    className,
    variant === "primary" && "bg-[#337AB7] text-white hover:bg-[#2e6da4]",
    variant === "ghost" && "bg-transparent text-[#211F33] hover:bg-gray-300"
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonRoot;
