import { PlusIcon } from "~/assets/icons/plus";
import { Button } from "./Button";

export const DevicesHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-weight-500 text-xl">Devices</h1>
      <Button.Root variant="primary">
        <Button.Icon icon={<PlusIcon />} variant="primary" />
        <Button.Label>Add Device</Button.Label>
      </Button.Root>
    </div>
  );
};
