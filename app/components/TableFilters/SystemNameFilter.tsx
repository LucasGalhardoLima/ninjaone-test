import { SearchIcon } from "~/assets/icons/search";
import { useDevicesStore } from "~/stores/devices";

/**
 * A search input for filtering devices by system name.
 *
 * This component uses the `useDevicesStore` hook to get and set the
 * `filterSystemName` state in the `DevicesStore` zustand store.
 *
 * @returns {JSX.Element} A search input with a search icon and a
 *   placeholder label of "Search". The input value is updated in real-time
 *   by the user, and the `DevicesStore.filterSystemName` is updated
 *   whenever the input value is changed. If the input is empty, the
 *   `DevicesStore.filterSystemName` is set to null.
 */
export const SystemNameFilter: React.FC = (): JSX.Element => {
  const filterSystemName = useDevicesStore((state) => state.filterSystemName);
  const setFilterSystemName = useDevicesStore(
    (state) => state.setFilterSystemName
  );

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
  return (
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
  );
};
