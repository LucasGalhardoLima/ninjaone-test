import React from "react";
import { ReloadIcon } from "~/assets/icons/reload";
import { Button } from "../Button";
import { useDevicesStore } from "~/stores/devices";
import { SortFilter } from "./SortFilter";
import { DeviceTypeFilter } from "./DeviceTypeFilter";
import { SystemNameFilter } from "./SystemNameFilter";

export const TableFilters: React.FC = () => {
  const clearFilters = useDevicesStore((state) => state.clearAllFilters);

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
        <SystemNameFilter />

        <DeviceTypeFilter />

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
