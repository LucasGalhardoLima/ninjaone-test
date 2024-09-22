import React, { useMemo } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CloseIcon } from "~/assets/icons/close";
import { DropdownIcon } from "~/assets/icons/dropdown";
import { FilterOption, useDevicesStore } from "~/stores/devices";
import { SelectedDeviceBadge } from "./SelectedDeviceBadge";

interface DeviceOption {
  value: string;
  label: string;
}

const deviceOptions: DeviceOption[] = [
  { value: FilterOption.ALL, label: "All" },
  { value: FilterOption.WINDOWS, label: "Windows" },
  { value: FilterOption.MAC, label: "Mac" },
  { value: FilterOption.LINUX, label: "Linux" },
];

/**
 * A React component for displaying a dropdown menu for filtering devices by
 * device type.
 *
 * The component uses the `useDevicesStore` hook to get and set the
 * `DevicesStore.filterType` state.
 *
 * @returns {JSX.Element} A JSX element containing the dropdown menu.
 */
export const DeviceTypeFilter: React.FC = (): JSX.Element => {
  const filterType = useDevicesStore((state) => state.filterType);
  const setFilterType = useDevicesStore((state) => state.setFilterType);

  /**
   * Handles change events for the device type filter. If the user selects the
   * "All" option, then all other options are selected. Otherwise, the current
   * selection is used.
   * @param {FilterOption[]} selected - The currently selected device types.
   */
  const handleFilterTypeChange = (selected: FilterOption[]) => {
    if (selected.includes(FilterOption.ALL)) {
      setFilterType(
        deviceOptions
          .filter((option) => option.value !== FilterOption.ALL)
          .map((option) => option.value as FilterOption)
      );
    } else {
      setFilterType(selected);
    }
  };

  /**
   * Clears the current filter selection by setting the {@link DevicesStore.filterType} to an empty array.
   * @returns {void} Nothing is returned.
   */
  const clearSelection = (): void => {
    setFilterType([]);
  };

  /**
   * Removes a filter type from the current filter selection.
   * If the filter type is not currently selected, this function does nothing.
   * @param {FilterOption} type - The filter type to remove from the selection.
   * @param {React.MouseEvent} event - The mouse event.
   */
  const removeFilter = (type: FilterOption, event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterType((filterType ?? []).filter((t) => t !== type));
  };

  const filteredOptions = useMemo(() => {
    if (filterType?.length === deviceOptions.length - 1) {
      return [
        <ListboxOption key="no-device-option" value="no-device-option" disabled>
          <div className="p-2 cursor-not-allowed text-gray-400">
            No device option available
          </div>
        </ListboxOption>,
      ];
    }
    return [
      <ListboxOption key={FilterOption.ALL} value={FilterOption.ALL}>
        <div className="p-2 cursor-pointer hover:bg-[#337AB7] hover:text-white">
          All
        </div>
      </ListboxOption>,
      ...deviceOptions
        .filter(
          (option) =>
            !filterType?.includes(option.value as FilterOption) &&
            option.value !== FilterOption.ALL
        )
        .map((option) => (
          <ListboxOption
            className="hover:bg-slate-400"
            key={option.value}
            value={option.value}
          >
            <div className="p-2 cursor-pointer hover:bg-[#337AB7] hover:text-white">
              {option.label}
            </div>
          </ListboxOption>
        )),
    ];
  }, [filterType]);

  return (
    <div className="relative w-full md:w-auto">
      <Listbox value={filterType} onChange={handleFilterTypeChange} multiple>
        <div className="relative">
          <ListboxButton className="border border-gray-300 rounded-md p-3 pr-12 bg-white cursor-pointer outline-none w-full md:w-auto">
            {filterType?.length ? (
              <>
                <span className="mr-2">Devices:</span>
                {filterType.map((type) => (
                  <SelectedDeviceBadge
                    key={type}
                    type={type}
                    removeFilter={removeFilter}
                  />
                ))}
              </>
            ) : (
              "Device type: All"
            )}
            {(filterType?.length && (
              <button
                className="absolute inset-y-0 right-4 flex items-center pr-3"
                aria-label="Clear selection"
                onClick={clearSelection}
              >
                <CloseIcon className="fill-[#6E6D7A]" />
              </button>
            )) ||
              null}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <DropdownIcon className="fill-[#6E6D7A]" />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            anchor="bottom"
            className="w-[var(--button-width)] bg-white border border-gray-300 rounded-md shadow-lg z-10 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          >
            {filteredOptions}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};
