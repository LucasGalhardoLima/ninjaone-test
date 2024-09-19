import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CloseIcon } from "~/assets/icons/close";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isModalOpenAtom, selectedDeviceAtom } from "~/routes/_index";

export const DeviceModal: React.FC = () => {
  const isOpen = useAtomValue(isModalOpenAtom);
  const [device, setDevice] = useAtom(selectedDeviceAtom);
  const closeModal = useSetAtom(isModalOpenAtom);

  const onClose = () => {
    closeModal(false);
  };

  const isEdit = !!device;

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
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-medium leading-6 text-[#211F33]"
                >
                  {isEdit ? "Edit Device" : "Add Device"}
                </DialogTitle>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
