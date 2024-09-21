import React from "react";
import { ReloadIcon } from "~/assets/icons/reload";
import { Button } from "../Button";
import { SearchIcon } from "~/assets/icons/search";
import { DropdownIcon } from "~/assets/icons/dropdown";
import { FilterOption, useDevicesStore } from "~/stores/devices";
import { SortFilter } from "./SortFilter";

interface DeviceOption {
  value: string;
  label: string;
}

export const TableFilters: React.FC = () => {
  const filterType = useDevicesStore((state) => state.filterType);
  const setFilterType = useDevicesStore((state) => state.setFilterType);
  const filterSystemName = useDevicesStore((state) => state.filterSystemName);
  const setFilterSystemName = useDevicesStore(
    (state) => state.setFilterSystemName
  );
  const clearFilters = useDevicesStore((state) => state.clearAllFilters);

  const deviceOptions: DeviceOption[] = [
    { value: FilterOption.ALL, label: "Device type: All" },
    { value: FilterOption.WINDOWS, label: "Device type: Windows" },
    { value: FilterOption.MAC, label: "Device type: Mac" },
    { value: FilterOption.LINUX, label: "Device type: Linux" },
  ];

  /**
   * Handles change events for the device type filter dropdown. Sets the
   * {@link DevicesStore.filterType} to the selected value, or null if no value is
   * selected.
   */
  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterType((event.target.value as FilterOption) || null);
  };

  /**
   * Handles change events for the system name filter text input. Sets the
   * {@link DevicesStore.filterSystemName} to the input value, or null if the
   * input is empty.
   */
  const handleFilterSystemNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // implement a debounce before calling setFilterSystemName
    setFilterSystemName(event.target.value || null);
  };

  /**
   * Handles click events on the reload button. Clears all filters and sort options
   * by calling {@link DevicesStore.clearAllFilters}.
   */
  const handleReloadClick = () => {
    clearFilters();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full pt-6 gap-4">
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <div className="flex items-center border border-gray-300 rounded-md p-1 px-3 w-full md:w-auto">
          <SearchIcon className="fill-[#88859E]" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none px-2 py-1 w-full md:w-auto"
            onChange={handleFilterSystemNameChange}
            value={filterSystemName || ""}
          />
        </div>

        <div className="relative w-full md:w-auto">
          <select
            className="border border-gray-300 rounded-md p-3 pr-8 bg-white cursor-pointer outline-none appearance-none w-full md:w-auto"
            defaultValue="all"
            onChange={handleFilterTypeChange}
            value={filterType || "all"}
          >
            {deviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <DropdownIcon className="fill-[#6E6D7A]" />
          </div>
        </div>

        <SortFilter />
      </div>

      <div>
        <Button.Root variant="ghost" onClick={handleReloadClick}>
          <Button.Icon icon={<ReloadIcon />} variant="ghost" />
        </Button.Root>
      </div>
    </div>
  );
};
