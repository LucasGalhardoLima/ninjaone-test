import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonIconProps {
  icon: React.ReactElement<SVGElement>;
  variant?: "primary" | "ghost";
}

/**
 * A utility component for rendering an SVG icon within a Button component.
 *
 * @param {{ icon: React.ReactElement<SVGElement>; variant?: "primary" | "ghost" }}
 *   props
 * @param {React.ReactElement<SVGElement>} props.icon
 *   The SVG icon to render. This should be a function component that returns
 *   an `<svg>` element.
 * @param {"primary" | "ghost"} [props.variant="primary"]
 *   The color variant of the icon. If `"primary"`, the icon will be rendered
 *   with a white fill color. If `"ghost"`, the icon will be rendered with a
 *   dark gray fill color.
 *
 * @returns {React.ReactElement}
 *   The rendered icon element, with the specified variant applied.
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  variant,
}: {
  icon: React.ReactElement<SVGElement>;
  variant?: "primary" | "ghost";
}): React.ReactElement => {
  
  const iconClass = cx(
    "flex items-center",
    variant === "primary" && "fill-white",
    variant === "ghost" && "fill-[#211F33]"
  );

  return React.cloneElement(icon, { className: iconClass });
};

export default ButtonIcon;
