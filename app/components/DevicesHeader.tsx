import { PlusIcon } from "~/assets/icons/plus";
import { Button } from "./Button";
import { useDevicesStore } from "~/stores/devices";
import { Device } from "~/services/devices";

export const DevicesHeader: React.FC = () => {
  const openAddDeviceModal = useDevicesStore((state) => state.openModal);
  const setDevice = useDevicesStore((state) => state.setSelectedDevice) as (
    device: Device | null
  ) => void;

  const handleClick = () => {
    openAddDeviceModal();
    setDevice(null);
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
