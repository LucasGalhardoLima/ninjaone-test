import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Device } from "~/services/devices";

export enum ModalType {
  NONE = "NONE",
  EDIT = "EDIT",
  DELETE = "DELETE",
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
  filterType: FilterOption | null;
  setFilterType: (type: FilterOption | null) => void;
  filterSystemName: string | null;
  setFilterSystemName: (name: string | null) => void;
  sortOption: SortOption | null;
  setSortOption: (option: SortOption | null) => void;
  applyFiltersAndSort: () => void;
  clearAllFilters: () => void;
}

const myMiddlewares = (f: StateCreator<DevicesStore>) =>
  devtools(f, { name: "devicesStore" });

export const useDevicesStore = create<DevicesStore>()(
  myMiddlewares((set, get) => ({
    devices: [],
    filteredDevices: [],
    setDevices: (devices: Device[]) => {
      set({ devices });
      get().applyFiltersAndSort();
    },
    selectedDevice: null,
    setSelectedDevice: (device: Device | null) =>
      set({ selectedDevice: device }),
    modalType: ModalType.NONE,
    openModal: (type: ModalType) => set({ modalType: type }),
    closeModal: () => set({ modalType: ModalType.NONE, selectedDevice: null }),
    filterType: null,
    setFilterType: (type: FilterOption | null) => {
      set({ filterType: type });
      get().applyFiltersAndSort();
    },
    filterSystemName: null,
    setFilterSystemName: (name: string | null) => {
      set({ filterSystemName: name });
      get().applyFiltersAndSort();
    },
    sortOption: null,
    setSortOption: (option: SortOption | null) => {
      set({ sortOption: option });
      get().applyFiltersAndSort();
    },
    applyFiltersAndSort: () => {
      const { devices, filterType, filterSystemName, sortOption } = get();

      let filteredDevices = [...devices];

      if (filterType) {
        filteredDevices = filteredDevices.filter((device) =>
          filterType === "all"
            ? device.type !== "all"
            : device.type === filterType
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
    clearAllFilters: () => {
      set({ filterType: null, filterSystemName: null, sortOption: null });
      get().applyFiltersAndSort();
    },
  }))
);
