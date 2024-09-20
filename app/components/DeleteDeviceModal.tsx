import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Form, useActionData } from "@remix-run/react";
import { useAtomValue, useSetAtom } from "jotai";
import { CloseIcon } from "~/assets/icons/close";
import {
  action,
  isDeleteModalOpenAtom,
  selectedDeviceAtom,
} from "~/routes/_index";
import { Button } from "./Button";
import { useEffect } from "react";

export const DeleteDeviceModal: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const isOpen = useAtomValue(isDeleteModalOpenAtom);
  const openModal = useSetAtom(isDeleteModalOpenAtom);
  const device = useAtomValue(selectedDeviceAtom);

  const onClose = () => {
    openModal(false);
  };

  const handleClose = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (actionData && "status" in actionData && actionData.status === 200) {
      openModal(false);
    }
  }, [actionData, openModal]);

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
                  <strong>{device?.system_name}</strong>. This action cannot be
                  undone.
                </p>
                <Form className="flex flex-col gap-3" method="delete">
                  <input type="hidden" name="id" value={device?.id} />
                  <div className="flex justify-end gap-2 mt-5">
                    <Button.Root variant="outline" onClick={handleClose}>
                      <Button.Label>Cancel</Button.Label>
                    </Button.Root>
                    <Button.Root variant="danger" type="submit">
                      <Button.Label>Delete</Button.Label>
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
