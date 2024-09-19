import { PlusIcon } from "~/assets/icons/plus";
import { Button } from "./Button";
import { useSetAtom } from "jotai";
import { isModalOpenAtom } from "~/routes/_index";

export const DevicesHeader: React.FC = () => {
  const openAddDeviceModal = useSetAtom(isModalOpenAtom);

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-weight-500 text-xl">Devices</h1>
      <Button.Root variant="primary" onClick={() => openAddDeviceModal(true)}>
        <Button.Icon icon={<PlusIcon />} variant="primary" />
        <Button.Label>Add Device</Button.Label>
      </Button.Root>
    </div>
  );
};
