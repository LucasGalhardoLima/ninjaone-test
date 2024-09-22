import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Device } from "~/services/devices";

export enum ModalType {
  NONE = "NONE",
  EDIT = "EDIT",
  DELETE = "DELETE",
  ADD = "ADD",
}

export enum FilterOption {
  ALL = "all",
  WINDOWS = "WINDOWS",
  MAC = "MAC",
  LINUX = "LINUX",
}

export enum SortOption {
  HDD_CAPACITY_ASC = "hdd_capacity_asc",
  HDD_CAPACITY_DESC = "hdd_capacity_desc",
  SYSTEM_NAME_ASC = "system_name_asc",
  SYSTEM_NAME_DESC = "system_name_desc",
}

export interface DevicesStore {
  devices: Device[];
  filteredDevices: Device[];
  setDevices: (devices: Device[]) => void;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  filterType: FilterOption[] | null;
  setFilterType: (types: FilterOption[]) => void;
  filterSystemName: string | null;
  setFilterSystemName: (name: string | null) => void;
  sortOption: SortOption | null;
  setSortOption: (option: SortOption | null) => void;
  applyFiltersAndSort: () => void;
  clearAllFilters: () => void;
}

/**
 * A middleware function that adds devtools support to the devices store.
 * @param {StateCreator<DevicesStore>} f - The state creator function.
 * @returns {StateCreator<DevicesStore>} - The state creator function with devtools support added.
 * @private
 */
const myMiddlewares = (f: StateCreator<DevicesStore>) =>
  devtools(f, { name: "devicesStore" });

/**
 * Store for managing devices with filtering and sorting capabilities.
 *
 * @typedef {Device} Device - Represents a device.
 * @typedef {DevicesStore} DevicesStore - Represents the store for managing devices.
 * @typedef {FilterOption} FilterOption - Represents the filter options.
 * @typedef {SortOption} SortOption - Represents the sort options.
 * @typedef {ModalType} ModalType - Represents the modal types.
 *
 * @function useDevicesStore
 * @description Creates a store for managing devices with filtering and sorting capabilities.
 *
 * @function setDevices
 * @description Sets the devices and applies filters and sorting.
 * @param {Device[]} devices - The devices to set.
 *
 * @function setSelectedDevice
 * @description Sets the selected device.
 * @param {Device | null} device - The device to select.
 *
 * @function openModal
 * @description Opens a modal of the specified type.
 * @param {ModalType} type - The type of modal to open.
 *
 * @function closeModal
 * @description Closes the modal and clears the selected device.
 *
 * @function setFilterType
 * @description Sets the filter type and applies filters and sorting.
 * @param {FilterOption | null} type - The filter type to set.
 *
 * @function setFilterSystemName
 * @description Sets the filter system name and applies filters and sorting.
 * @param {string | null} name - The system name to filter by.
 *
 * @function setSortOption
 * @description Sets the sort option and applies filters and sorting.
 * @param {SortOption | null} option - The sort option to set.
 *
 * @function applyFiltersAndSort
 * @description Applies the filters and sorting to the devices.
 *
 * @function clearAllFilters
 * @description Clears all filters and applies the default sorting.
 */
export const useDevicesStore = create<DevicesStore>()(
  myMiddlewares((set, get) => ({
    devices: [],
    filteredDevices: [],
    /**
     * Sets the devices and applies filters and sorting.
     * @param {Device[]} devices - The devices to set.
     */
    setDevices: (devices: Device[]) => {
      set({ devices });
      get().applyFiltersAndSort();
    },
    selectedDevice: null,
    /**
     * Sets the selected device.
     * @param {Device | null} device - The device to select.
     */
    setSelectedDevice: (device: Device | null) =>
      set({ selectedDevice: device }),
    modalType: ModalType.NONE,
    /**
     * Opens a modal of the specified type.
     * @param {ModalType} type - The type of modal to open.
     */
    openModal: (type: ModalType) => set({ modalType: type }),
    /**
     * Closes the modal and clears the selected device.
     */
    closeModal: () => set({ modalType: ModalType.NONE, selectedDevice: null }),
    filterType: [],
    /**
     * Sets the filter type and applies filters and sorting.
     * @param {FilterOption | null} type - The filter type to set.
     */
    setFilterType: (types: FilterOption[]) => {
      set({ filterType: types });
      get().applyFiltersAndSort();
    },
    filterSystemName: null,
    /**
     * Sets the filter system name and applies filters and sorting.
     * @param {string | null} name - The filter system name to set.
     */
    setFilterSystemName: (name: string | null) => {
      set({ filterSystemName: name });
      get().applyFiltersAndSort();
    },
    sortOption: null,
    setSortOption: (option: SortOption | null) => {
      set({ sortOption: option });
      /**
       * Sets the sort option and applies filters and sorting.
       * @param {SortOption | null} option - The sort option to set.
       */
      get().applyFiltersAndSort();
    },
    /**
     * Applies the current filters and sorting options to the devices and
     * sets the `filteredDevices` state.
     *
     * This function is called whenever the filters or sorting options
     * change.
     */
    applyFiltersAndSort: () => {
      const { devices, filterType, filterSystemName, sortOption } = get();

      let filteredDevices = [...devices];

      if (filterType?.length) {
        filteredDevices = filteredDevices.filter((device) =>
          filterType.includes(FilterOption.ALL)
            ? device.type !== FilterOption.ALL
            : filterType.includes(device.type as FilterOption)
        );
      }

      if (filterSystemName) {
        filteredDevices = filteredDevices.filter((device) =>
          device.system_name
            .toLowerCase()
            .includes(filterSystemName.toLowerCase())
        );
      }

      if (sortOption) {
        filteredDevices = filteredDevices.sort((a, b) => {
          switch (sortOption) {
            case SortOption.HDD_CAPACITY_ASC:
              return a.hdd_capacity - b.hdd_capacity;
            case SortOption.HDD_CAPACITY_DESC:
              return b.hdd_capacity - a.hdd_capacity;
            case SortOption.SYSTEM_NAME_ASC:
              return a.system_name.localeCompare(b.system_name);
            case SortOption.SYSTEM_NAME_DESC:
              return b.system_name.localeCompare(a.system_name);
            default:
              return 0;
          }
        });
      }

      set({ filteredDevices });
    },
    /**
     * Clears all filters and sorting options and applies the default sorting.
     */
    clearAllFilters: () => {
      set({ filterType: [], filterSystemName: null, sortOption: null });
      get().applyFiltersAndSort();
    },
  }))
);
