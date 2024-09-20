import { PlusIcon } from "~/assets/icons/plus";
import { Button } from "./Button";
import { useSetAtom } from "jotai";
import { isModalOpenAtom, selectedDeviceAtom } from "~/routes/_index";

export const DevicesHeader: React.FC = () => {
  const openAddDeviceModal = useSetAtom(isModalOpenAtom);
  const setDevice = useSetAtom(selectedDeviceAtom);

  const handleClick = () => {
    openAddDeviceModal(true);
    setDevice(undefined);
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
