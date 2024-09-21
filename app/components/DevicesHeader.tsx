import { PlusIcon } from "~/assets/icons/plus";
import { Button } from "./Button";
import { ModalType, useDevicesStore } from "~/stores/devices";

export const DevicesHeader: React.FC = () => {
  const openAddDeviceModal = useDevicesStore((state) => state.openModal);

  const handleClick = () => {
    openAddDeviceModal(ModalType.ADD);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-weight-500 text-xl">Devices</h1>
      <Button.Root variant="primary" onClick={handleClick}>
        <Button.Icon icon={<PlusIcon />} variant="primary" />
        <Button.Label>Add Device</Button.Label>
      </Button.Root>
    </div>
  );
};
