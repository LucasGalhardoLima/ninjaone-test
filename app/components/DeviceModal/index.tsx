import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CloseIcon } from "~/assets/icons/close";
import { action } from "~/routes/_index";
import { useActionData } from "@remix-run/react";
import { Button } from "../Button";
import { ModalType, useDevicesStore } from "~/stores/devices";
import { DeviceModalForm } from "./DeviceModalForm";



/**
 * DeviceModal component renders a modal dialog for adding or editing a device.
 * It uses the `useDevicesStore` hook to determine the modal state and handle closing actions.
 * The modal is conditionally rendered based on the `isOpen` state.
 * 
 * @component
 * @returns {JSX.Element} The rendered DeviceModal component.
 * 
 * @example
 * <DeviceModal />
 * 
 * @remarks
 * The modal will automatically close if the `actionData` indicates a successful action (status 200).
 * 
 * @hook
 * @name useDevicesStore
 * @description Hook to manage the state of the devices modal.
 * 
 * @callback onClose
 * @description Callback function to handle the closing of the modal.
 * 
 * @internal
 * This component is intended to be used within the application and relies on the `useDevicesStore` hook for state management.
 */
export const DeviceModal: React.FC = (): JSX.Element => {
  const actionData = useActionData<typeof action>();
  const isOpen = useDevicesStore(
    (state) =>
      state.modalType === ModalType.EDIT || state.modalType === ModalType.ADD
  );
  const closeModal = useDevicesStore((state) => state.closeModal);
  const isEdit = !!useDevicesStore((state) => state.selectedDevice);

  /**
   * Callback function to handle the closing of the modal.
   * It invokes the `closeModal` function to perform the close action.
   * 
   * @callback onClose
   * @returns {void}
   */
  const onClose = useCallback(() => {
    closeModal();
  }, [closeModal]);


  /**
   * Effect to automatically close the modal if the `actionData` indicates a successful action (status 200).
   * 
   * @remarks
   * This effect is invoked when the component mounts and when the `actionData` prop changes.
   * It checks if the `actionData` has a `status` property and if its value is 200 (OK).
   * If both conditions are true, it invokes the `onClose` callback to close the modal.
   * 
   * @param {typeof action} actionData - The action data returned by the Remix loader.
   * @param {() => void} onClose - The callback function to close the modal.
   * 
   * @returns {void}
   */
  useEffect(() => {
    if (actionData && "status" in actionData && actionData.status === 200) {
      onClose();
    }
  }, [actionData, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-md bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <Button.Root variant="ghost" onClick={onClose}>
                <Button.Icon icon={<CloseIcon />} variant="ghost" />
              </Button.Root>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-medium leading-7 text-[#211F33] mb-6"
                >
                  {isEdit ? "Edit Device" : "Add Device"}
                </DialogTitle>
                <DeviceModalForm />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
