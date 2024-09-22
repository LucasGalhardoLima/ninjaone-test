import { Form } from "@remix-run/react";
import { Button } from "../Button";
import { useDevicesStore } from "~/stores/devices";

/**
 * A React component for rendering a form to delete a device.
 *
 * The form will have a single hidden input element with the name "id" and the
 * value set to the id of the currently selected device in the devices store.
 *
 * Two buttons are rendered: a cancel button with the label "Cancel" and a delete
 * button with the label "Delete". The cancel button will close the modal when
 * clicked, while the delete button will delete the device and close the modal
 * when clicked.
 *
 * @returns {JSX.Element} A JSX element containing the form and buttons.
 */
export const DeleteDeviceModalForm: React.FC = (): JSX.Element => {
  const closeModal = useDevicesStore((state) => state.closeModal);
  const selectedDevice = useDevicesStore((state) => state.selectedDevice);

  /**
   * Handles click events on the cancel button. Prevents the default form submission
   * and calls the `closeModal` function to close the modal.
   * @param {event} event - The click event.
   */
  const handleClose = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <Form className="flex flex-col gap-3" method="delete">
      <input type="hidden" name="id" value={selectedDevice?.id} />
      <div className="flex justify-end gap-2 mt-5">
        <Button.Root variant="outline" onClick={handleClose}>
          <Button.Label>Cancel</Button.Label>
        </Button.Root>
        <Button.Root variant="danger" type="submit">
          <Button.Label>Delete</Button.Label>
        </Button.Root>
      </div>
    </Form>
  );
};
