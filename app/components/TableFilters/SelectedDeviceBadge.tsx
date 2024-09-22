import React from "react";
import { FilterOption } from "~/stores/devices";

interface SelectedDeviceBadgeProps {
    type: string;
    removeFilter: (type: FilterOption, event: React.MouseEvent) => void;
  }

/**
 * A small badge that displays the selected device type and allows the user to
 * remove the filter by clicking on the badge.
 *
 * @param {{ type: string, removeFilter: (type: FilterOption) => void }} props
 * @prop {string} type - The selected device type.
 * @prop {(type: FilterOption) => void} removeFilter - A callback to remove the
 *   filter when the badge is clicked.
 *
 * @returns {JSX.Element} The rendered SelectedDeviceBadge component.
 *
 * @example
 * <SelectedDeviceBadge type="windows" removeFilter={removeFilter} />
 *
 * @remarks
 * The badge is a small pill that displays the selected device type and an "x"
 * icon to remove the filter. The badge is rendered with a gray background and
 * white text. The "x" icon is rendered in gray and turns darker when hovered.
 * The badge is rounded and has a small border radius. The badge is rendered with
 * a small margin on the right side.
 */

export const SelectedDeviceBadge: React.FC<SelectedDeviceBadgeProps> = ({
  type,
  removeFilter,
}) => (
  <span className="capitalize inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2">
    {type.toLocaleLowerCase()}
    <button
      type="button"
      className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
      onClick={(event) => removeFilter(type as FilterOption, event)}
    >
      <span className="sr-only">Remove</span>
      <svg
        viewBox="0 0 14 14"
        className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75"
      >
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span className="absolute -inset-1" />
    </button>
  </span>
);
