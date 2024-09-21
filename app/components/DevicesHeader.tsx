import { PlusIcon } from "~/assets/icons/plus";
import { Button } from "./Button";
import { ModalType, useDevicesStore } from "~/stores/devices";

/**
 * A React component for displaying the header of the devices page.
 *
 * @returns {JSX.Element} A JSX element containing the page header.
 */

export const DevicesHeader: React.FC = (): JSX.Element => {
  const openAddDeviceModal = useDevicesStore((state) => state.openModal);

  /**
   * Handles the click event for the "Add Device" button. Opens the
   * {@link DeviceModal} with the type set to {@link ModalType.ADD}.
   */
  const handleClick = () => {
    openAddDeviceModal(ModalType.ADD);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-medium text-xl">Devices</h1>
      <Button.Root variant="primary" onClick={handleClick}>
        <Button.Icon icon={<PlusIcon />} variant="primary" />
        <Button.Label>Add Device</Button.Label>
      </Button.Root>
    </div>
  );
};
