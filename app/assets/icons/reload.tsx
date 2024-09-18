import React from "react";

interface ReloadIconProps {
  className?: string;
}

export const ReloadIcon: React.FC<ReloadIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.5 1C14.2188 1 14 1.25 14 1.5V5.5625C13 3.125 10.625 1.5 8 1.5C4.8125 1.5 2.09375 3.78125 1.5625 6.9375C1.53125 7.21875 1.71875 7.46875 2 7.5C2 7.5 2.03125 7.5 2.0625 7.5C2.3125 7.5 2.53125 7.34375 2.5625 7.09375C3 4.4375 5.28125 2.5 8 2.5C10.25 2.5 12.2812 3.90625 13.0938 6H9.5C9.21875 6 9 6.25 9 6.5C9 6.78125 9.21875 7 9.5 7H14.5C14.75 7 15 6.78125 15 6.5V1.5C15 1.25 14.75 1 14.5 1ZM13.9688 8.53125C13.6875 8.46875 13.4375 8.65625 13.375 8.9375C12.9688 11.5938 10.6875 13.5 7.96875 13.5C5.6875 13.5 3.65625 12.125 2.84375 10H6.5C6.75 10 7 9.78125 7 9.5C7 9.25 6.75 9 6.5 9H1.5C1.21875 9 1 9.25 1 9.5V14.5C1 14.7812 1.21875 15 1.5 15C1.75 15 2 14.7812 2 14.5V10.4688C2.96875 12.9062 5.34375 14.5 8 14.5C11.1562 14.5 13.875 12.25 14.4062 9.09375C14.4375 8.8125 14.25 8.5625 13.9688 8.53125Z" />
    </svg>
  );
};
