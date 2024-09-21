import { DropdownIcon } from "~/assets/icons/dropdown";
import { FilterOption, useDevicesStore } from "~/stores/devices";

interface DeviceOption {
  value: string;
  label: string;
}

/**
 * A dropdown menu for filtering devices by type.
 *
 * @returns {JSX.Element} A select element with options for all device types.
 */
export const DeviceTypeFilter: React.FC = (): JSX.Element => {
  const filterType = useDevicesStore((state) => state.filterType);
  const setFilterType = useDevicesStore((state) => state.setFilterType);

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

  return (
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
  );
};
