import { Form, useActionData } from "@remix-run/react";
import { DropdownIcon } from "~/assets/icons/dropdown";
import { Button } from "../Button";
import { action } from "~/routes/_index";
import { useDevicesStore } from "~/stores/devices";

/**
 * A React component for displaying a form to add or edit a device.
 * The form fields include system name, device type, and HDD capacity.
 * The component uses the `useActionData` and `useDevicesStore` hooks to
 * display any errors and to get the selected device to edit.
 *
 * @returns {JSX.Element} A JSX element containing the form.
 */
export const DeviceModalForm: React.FC = (): JSX.Element => {
  const actionData = useActionData<typeof action>();
  const closeModal = useDevicesStore((state) => state.closeModal);
  const selectedDevice = useDevicesStore((state) => state.selectedDevice);
  const isEdit = !!useDevicesStore((state) => state.selectedDevice);

  const errors =
    actionData && "errors" in actionData ? actionData.errors : undefined;

  /**
   * Handles click events on the close button. Prevents the default form submission
   * and calls the `closeModal` function to close the modal.
   * @param {event} event - The click event.
   */
  const handleClose = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <Form className="flex flex-col gap-3" method={isEdit ? "put" : "post"}>
      {isEdit && <input type="hidden" name="id" value={selectedDevice?.id} />}
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
          <p className="text-sm text-red-500">{errors.system_name}</p>
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
        {errors?.type && <p className="text-sm text-red-500">{errors.type}</p>}
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
            defaultValue={isEdit ? selectedDevice?.hdd_capacity : ""}
          />
        </div>
        {errors?.hdd_capacity && (
          <p className="text-sm text-red-500">{errors.hdd_capacity}</p>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <Button.Root variant="outline" onClick={handleClose}>
          <Button.Label>Cancel</Button.Label>
        </Button.Root>
        <Button.Root type="submit">
          <Button.Label>Submit</Button.Label>
        </Button.Root>
      </div>
    </Form>
  );
};
