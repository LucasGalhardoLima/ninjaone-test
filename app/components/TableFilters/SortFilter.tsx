import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { DropdownIcon } from "~/assets/icons/dropdown";
import { SortOption, useDevicesStore } from "~/stores/devices";

/**
 * The options for the sort order dropdown.
 *
 */
const sortOptions = [
  {
    label: "None",
    value: "",
  },
  {
    label: "HDD capacity (ascending)",
    value: SortOption.HDD_CAPACITY_ASC,
  },
  {
    label: "HDD capacity (descending)",
    value: SortOption.HDD_CAPACITY_DESC,
  },
  {
    label: "Name (ascending)",
    value: SortOption.SYSTEM_NAME_ASC,
  },
  {
    label: "Name (descending)",
    value: SortOption.SYSTEM_NAME_DESC,
  },
];

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

  /**
   * Handles change events for the sort order dropdown. Sets the
   * {@link DevicesStore.sortOption} to the selected value.
   */
  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };
  return (
    <div className="relative w-full md:w-auto">
      <Listbox value={sortOption || ""} onChange={handleSortChange}>
        <div className="relative">
          <ListboxButton className="border border-gray-300 rounded-md p-3 pr-8 bg-white cursor-pointer outline-none appearance-none w-full md:w-auto">
            {`Sort by: ${
              sortOptions.find((option) => option.value === sortOption)?.label
            }` || "Sort by: None"}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <DropdownIcon className="fill-[#6E6D7A]" />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            anchor="bottom"
            className="w-[var(--button-width)] bg-white border border-gray-300 rounded-md shadow-lg z-10 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          >
            {sortOptions.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="cursor-pointer p-2 hover:bg-[#337AB7] hover:text-white"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};
