import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonRootProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline" | "danger";
  onClick?: (() => void) | ((event: { preventDefault: () => void; }) => void);
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, variant = "primary", onClick, className, type }, ref) => {
    const buttonClass = cx(
      "p-3 rounded-[4px] flex gap-2 items-center",
      className,
      variant === "primary" && "bg-[#337AB7] text-white hover:bg-[#2e6da4]",
      variant === "ghost" && "bg-transparent text-[#211F33] hover:bg-[#E8E8EA]",
      variant === "outline" &&
        "bg-transparent border border-[#48446940] text-[#337AB7] hover:border-[#337AB7]",
      variant === "danger" && "bg-[#D53948] text-white hover:bg-[#b32f43]"
    );

    return (
      <button className={buttonClass} onClick={onClick} ref={ref} type={type}>
        {children}
      </button>
    );
  }
);

ButtonRoot.displayName = "ButtonRoot";

export default ButtonRoot;
