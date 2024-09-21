import React from "react";
import { cx } from "~/utils/helpers";

interface ButtonLabelProps {
  children: React.ReactNode;
}

/**
 * A React component for rendering the label of a button.
 *
 * @prop {React.ReactNode} children - The children of the button, typically a
 *   string or a SVG icon.
 *
 * @returns {JSX.Element} A `span` element with the label class.
 */
const ButtonLabel: React.FC<ButtonLabelProps> = ({ children }): JSX.Element => {
  const labelClass = cx("text-sm font-medium");

  return <span className={labelClass}>{children}</span>;
};

export default ButtonLabel;
