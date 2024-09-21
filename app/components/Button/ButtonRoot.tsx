import { forwardRef } from "react";
import { cx } from "~/utils/helpers";

interface ButtonRootProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline" | "danger";
  onClick?: (() => void) | ((event: { preventDefault: () => void }) => void);
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

/**
 * ButtonRoot component is a styled button that supports multiple variants.
 *
 * @component
 * @param {ButtonRootProps} props - The properties for the ButtonRoot component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {"primary" | "ghost" | "outline" | "danger"} [props.variant="primary"] - The variant of the button which determines its styling.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - The function to be called when the button is clicked.
 * @param {string} [props.className] - Additional class names to apply to the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>['type']} [props.type] - The type attribute for the button element.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to be forwarded to the button element.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  (
    { children, variant = "primary", onClick, className, type },
    ref
  ): JSX.Element => {
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
