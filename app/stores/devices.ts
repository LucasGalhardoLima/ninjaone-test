import { create, StateCreator } from "zustand";
import { Device } from "~/services/devices";
import { devtools, persist } from "zustand/middleware";

export interface DevicesStore {
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
}

const myMiddlewares = (f: StateCreator<DevicesStore>) =>
  devtools(persist(f, { name: "devicesStore" }));

export const useDevicesStore = create<DevicesStore>()(
  myMiddlewares((set) => ({
    selectedDevice: null,
    setSelectedDevice: (device: Device | null) =>
      device ? set({ selectedDevice: device }) : set({ selectedDevice: null }),
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    isDeleteModalOpen: false,
    openDeleteModal: () => set({ isDeleteModalOpen: true }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  }))
);
