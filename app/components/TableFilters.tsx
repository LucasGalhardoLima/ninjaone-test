import React from "react";
import { ReloadIcon } from "~/assets/icons/reload";
import { Button } from "./Button";
import { SearchIcon } from "~/assets/icons/search";
import { DropdownIcon } from "~/assets/icons/dropdown";
import { SortOption, useDevicesStore } from "~/stores/devices";

export const TableFilters: React.FC = () => {
  const setFilterType = useDevicesStore((state) => state.setFilterType);
  const setFilterSystemName = useDevicesStore(
    (state) => state.setFilterSystemName
  );
  const setSortOption = useDevicesStore((state) => state.setSortOption);

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterType(event.target.value || null);
  };

  const handleFilterSystemNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterSystemName(event.target.value || null);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <div className="flex items-center justify-between w-full pt-6">
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-md p-1 px-3">
          <SearchIcon className="fill-[#88859E]" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none px-2 py-1"
            onChange={handleFilterSystemNameChange}
          />
        </div>

        {/* Device Type Dropdown */}
        <div className="relative">
          <select
            className="border border-gray-300 rounded-md p-3 pr-8 bg-white cursor-pointer outline-none appearance-none"
            defaultValue="all"
            onChange={handleFilterTypeChange}
          >
            <option value="all">Device Type: All</option>
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <DropdownIcon className="fill-[#6E6D7A]" />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            className="border border-gray-300 rounded-md p-3 pr-8 bg-white cursor-pointer outline-none appearance-none"
            defaultValue="hdd-desc"
            onChange={handleSortChange}
          >
            <option value="hdd-desc">Sort by: HDD Capacity (Descending)</option>
            <option value="hdd-asc">Sort by: HDD Capacity (Ascending)</option>
            <option value="price-asc">Sort by: Price (Low to High)</option>
            <option value="price-desc">Sort by: Price (High to Low)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <DropdownIcon className="fill-[#6E6D7A]" />
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="cursor-pointer">
        <Button.Root variant="ghost">
          <Button.Icon icon={<ReloadIcon />} variant="ghost" />
        </Button.Root>
      </div>
    </div>
  );
};

export default TableFilters;
