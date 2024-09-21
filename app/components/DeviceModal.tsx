import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CloseIcon } from "~/assets/icons/close";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { action, isModalOpenAtom, selectedDeviceAtom } from "~/routes/_index";
import { DropdownIcon } from "~/assets/icons/dropdown";
import { useActionData, Form } from "@remix-run/react";
import { Button } from "./Button";

export const DeviceModal: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const isOpen = useAtomValue(isModalOpenAtom);
  const openModal = useSetAtom(isModalOpenAtom);
  const [selectedDevice, setSelectedDevice] = useAtom(selectedDeviceAtom);

  const errors =
    actionData && "errors" in actionData ? actionData.errors : undefined;

  const onClose = useCallback(() => {
    openModal(false);
    setSelectedDevice(undefined);
  }, [openModal, setSelectedDevice]);

  const handleClose = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onClose();
  };

  const isEdit = !!selectedDevice;

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
                  {isEdit ? "Edit Device" : "Add Device"}
                </DialogTitle>
                <Form
                  className="flex flex-col gap-3"
                  method={isEdit ? "put" : "post"}
                >
                  <div>
                    <label
                      htmlFor="system_name"
                      className="block text-sm font-normal text-gray-700"
                    >
                      System name *
                    </label>
                    <div className="mt-1 w-full border border-gray-300 rounded-md p-2 px-3">
                      <input
                        type="text"
                        name="system_name"
                        id="system_name"
                        className="block w-full outline-none"
                        placeholder="System name"
                        defaultValue={isEdit ? selectedDevice?.system_name : ""}
                      />
                    </div>
                    {errors?.system_name && (
                      <p className="text-sm text-red-500">
                        {errors.system_name}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="type"
                      className="block text-sm font-normal text-gray-700"
                    >
                      Device type *
                    </label>
                    <div className="relative">
                      <select
                        className="border border-gray-300 rounded-md p-2 pr-8 bg-white cursor-pointer outline-none appearance-none w-full"
                        name="type"
                        id="type"
                        defaultValue={isEdit ? selectedDevice?.type : ""}
                      >
                        <option value="">Device type</option>
                        <option value="WINDOWS">Windows</option>
                        <option value="MAC">Mac</option>
                        <option value="LINUX">Linux</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <DropdownIcon className="fill-[#6E6D7A]" />
                      </div>
                    </div>
                    {errors?.type && (
                      <p className="text-sm text-red-500">{errors.type}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="hdd_capacity"
                      className="block text-sm font-normal text-gray-700"
                    >
                      HDD capacity (GB) *
                    </label>
                    <div className="mt-1 w-full border border-gray-300 rounded-md p-2 px-3">
                      <input
                        type="text"
                        name="hdd_capacity"
                        id="hdd_capacity"
                        className="block w-full outline-none"
                        placeholder="HDD capacity"
                        defaultValue={
                          isEdit ? selectedDevice?.hdd_capacity : ""
                        }
                      />
                    </div>
                    {errors?.hdd_capacity && (
                      <p className="text-sm text-red-500">
                        {errors.hdd_capacity}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-5">
                    <Button.Root variant="outline" onClick={handleClose}>
                      <Button.Label>Cancel</Button.Label>
                    </Button.Root>
                    <Button.Root type="submit">
                      <Button.Label>{isEdit ? "Save" : "Submit"}</Button.Label>
                    </Button.Root>
                  </div>
                </Form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
