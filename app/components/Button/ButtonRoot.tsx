import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonRootProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, variant, onClick, className }, ref) => {
    const buttonClass = cx(
      "p-3 rounded-[4px] flex gap-2 items-center",
      className,
      variant === "primary" && "bg-[#337AB7] text-white hover:bg-[#2e6da4]",
      variant === "ghost" && "bg-transparent text-[#211F33] hover:bg-gray-300"
    );

    return (
      <button className={buttonClass} onClick={onClick} ref={ref}>
        {children}
      </button>
    );
  }
);

ButtonRoot.displayName = "ButtonRoot";

export default ButtonRoot;
