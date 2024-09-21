import { DropdownIcon } from "~/assets/icons/dropdown";
import { SortOption, useDevicesStore } from "~/stores/devices";

/**
 * A dropdown menu for sorting devices by various criteria.
 *
 * @returns {JSX.Element} A select element with options for sorting devices by
 *   HDD capacity (ascending and descending), name (ascending and descending),
 *   and none.
 */
export const SortFilter: React.FC = (): JSX.Element => {
  const sortOption = useDevicesStore((state) => state.sortOption);
  const setSortOption = useDevicesStore((state) => state.setSortOption);

  const sortOptions = [
    {
      label: "Sort by: None",
      value: "",
    },
    {
      label: "Sort by: HDD capacity (ascending)",
      value: SortOption.HDD_CAPACITY_ASC,
    },
    {
      label: "Sort by: HDD capacity (descending)",
      value: SortOption.HDD_CAPACITY_DESC,
    },
    {
      label: "Sort by: Name (ascending)",
      value: SortOption.SYSTEM_NAME_ASC,
    },
    {
      label: "Sort by: Name (descending)",
      value: SortOption.SYSTEM_NAME_DESC,
    },
    {/* The API doesn't provide a price key in the Device type */}
  ];

  /**
   * Handles change events for the sort order dropdown. Sets the
   * {@link DevicesStore.sortOption} to the selected value.
   */
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };
  return (
    <div className="relative w-full md:w-auto">
      <select
        className="border border-gray-300 rounded-md p-3 pr-8 bg-white cursor-pointer outline-none appearance-none w-full md:w-auto"
        defaultValue="hdd_capacity_desc"
        onChange={handleSortChange}
        value={sortOption || ""}
      >
        {sortOptions.map((option) => (
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
