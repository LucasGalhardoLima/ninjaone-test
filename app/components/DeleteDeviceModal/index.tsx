import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useActionData } from "@remix-run/react";
import { CloseIcon } from "~/assets/icons/close";
import { action } from "~/routes/_index";
import { useEffect, useCallback } from "react";
import { ModalType, useDevicesStore } from "~/stores/devices";
import { DeleteDeviceModalForm } from "./DeleteDeviceModalForm";
export const DeleteDeviceModal: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const isOpen = useDevicesStore(
    (state) => state.modalType === ModalType.DELETE
  );
  const closeModal = useDevicesStore((state) => state.closeModal);
  const selectedDevice = useDevicesStore((state) => state.selectedDevice);

  const onClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

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
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <CloseIcon className="fill-[#595766]" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-medium leading-7 text-[#211F33] mb-6"
                >
                  Delete device?
                </DialogTitle>
                <p>
                  You are about to delete the device{" "}
                  <strong>{selectedDevice?.system_name}</strong>. This action
                  cannot be undone.
                </p>
                <DeleteDeviceModalForm  />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
