import React from "react";

interface PlusIconProps {
  className?: string;
}

/**
 * A React component for rendering a "plus" icon.
 *
 * @param {{ className?: string }} props
 *   The properties passed to the component.
 * @param {string} [props.className]
 *   The CSS class name to apply to the rendered SVG element.
 *
 * @returns {React.ReactElement}
 *   The rendered SVG element.
 */
export const PlusIcon: React.FC<PlusIconProps> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.5 8C14.5 8.4375 14.1562 8.75 13.75 8.75H8.75V13.75C8.75 14.1875 8.40625 14.5312 8 14.5312C7.5625 14.5312 7.25 14.1875 7.25 13.75V8.75H2.25C1.8125 8.75 1.5 8.4375 1.5 8.03125C1.5 7.59375 1.8125 7.25 2.25 7.25H7.25V2.25C7.25 1.84375 7.5625 1.53125 8 1.53125C8.40625 1.53125 8.75 1.84375 8.75 2.25V7.25H13.75C14.1562 7.25 14.5 7.59375 14.5 8Z" />
  </svg>
);
