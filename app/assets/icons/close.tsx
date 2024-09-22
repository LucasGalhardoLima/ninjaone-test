import React from "react";

interface CloseIconProps {
  className?: string;
}

/**
 * CloseIcon component renders an SVG icon for closing something.
 * It uses the `className` property to apply any additional CSS styles.
 *
 * @param {CloseIconProps} props
 * @param {string} [props.className]
 * @returns {JSX.Element} The rendered CloseIcon component.
 *
 * @example
 * <CloseIcon />
 * 
 * @remarks
 * The icon is a white `X` symbol.
 */
export const CloseIcon: React.FC<CloseIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.8438 12.875C12.6562 13.0625 12.3125 13.0625 12.125 12.875L8 8.71875L3.84375 12.875C3.65625 13.0625 3.3125 13.0625 3.125 12.875C2.9375 12.6875 2.9375 12.3438 3.125 12.1562L7.28125 8L3.125 3.875C2.9375 3.6875 2.9375 3.34375 3.125 3.15625C3.3125 2.96875 3.65625 2.96875 3.84375 3.15625L8 7.3125L12.125 3.15625C12.3125 2.96875 12.6562 2.96875 12.8438 3.15625C13.0312 3.34375 13.0312 3.6875 12.8438 3.875L8.6875 8L12.8438 12.1562C13.0312 12.3438 13.0312 12.6875 12.8438 12.875Z" />
    </svg>
  );
};
