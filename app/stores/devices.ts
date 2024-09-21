import { create, StateCreator } from "zustand";
import { Device } from "~/services/devices";
import { devtools, persist } from "zustand/middleware";

export enum ModalType {
  NONE = "NONE",
  EDIT = "EDIT",
  DELETE = "DELETE",
  ADD = "ADD",
}

interface DevicesStore {
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const myMiddlewares = (f: StateCreator<DevicesStore>) =>
  devtools(persist(f, { name: "devicesStore" }));

export const useDevicesStore = create<DevicesStore>()(
  myMiddlewares((set) => ({
    selectedDevice: null,
    setSelectedDevice: (device: Device | null) =>
      set({ selectedDevice: device }),
    modalType: ModalType.NONE,
    openModal: (type: ModalType) => set({ modalType: type }),
    closeModal: () => set({ modalType: ModalType.NONE, selectedDevice: null }),
  }))
);
