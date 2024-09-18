import { PlusIcon } from "~/assets/icons/plus";

export const DevicesHeader: React.FC = () => {
  return (
    <div className="flex justify-between">
      <h1 className="font-weight-500 text-xl">Devices</h1>
      <button className="flex items-center rounded-[4px] p-3 gap-2 bg-[#337AB7] text-white">
        <PlusIcon />
        <span className="text-sm font-weight-500">Add Device</span>
      </button>
    </div>
  );
};
