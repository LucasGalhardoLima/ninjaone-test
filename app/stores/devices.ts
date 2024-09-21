import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Device } from "~/services/devices";

export enum ModalType {
  NONE = "NONE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export enum SortOption {
  HDD_CAPACITY_ASC = "hdd_capacity_asc",
  HDD_CAPACITY_DESC = "hdd_capacity_desc",
  PRICE_LOW_TO_HIGH = "price_low_to_high",
  PRICE_HIGH_TO_LOW = "price_high_to_low",
}

interface DevicesStore {
  devices: Device[];
  filteredDevices: Device[];
  setDevices: (devices: Device[]) => void;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  filterType: string | null;
  setFilterType: (type: string | null) => void;
  filterSystemName: string | null;
  setFilterSystemName: (name: string | null) => void;
  sortOption: SortOption | null;
  setSortOption: (option: SortOption | null) => void;
  applyFiltersAndSort: () => void;
}

const myMiddlewares = (f: StateCreator<DevicesStore>) =>
  devtools(persist(f, { name: "devicesStore" }));

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
    setFilterType: (type: string | null) => {
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
      let filteredDevices = devices;

      if (filterType) {
        filteredDevices = filteredDevices.filter(
          (device) => device.type === filterType
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
            case SortOption.PRICE_LOW_TO_HIGH:
              return a.price - b.price;
            case SortOption.PRICE_HIGH_TO_LOW:
              return b.price - a.price;
            default:
              return 0;
          }
        });
      }

      // If no filters or sorts are applied, return the original devices list
      if (!filterType && !filterSystemName && !sortOption) {
        filteredDevices = devices;
      }

      set({ filteredDevices });
    },
  }))
);
