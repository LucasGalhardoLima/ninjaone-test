import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { loader } from "~/routes/_index";
import windows from "~/assets/images/windows.svg";
import linux from "~/assets/images/linux.svg";
import mac from "~/assets/images/mac.svg";
import { Button } from "./Button";
import { ActionIcon } from "~/assets/icons/action";

const Icons = {
  WINDOWS: windows,
  LINUX: linux,
  MAC: mac,
};

export const DataTable: React.FC = () => {
  const { devices } = useLoaderData<typeof loader>();
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setSelectedDevice(selectedDevice === id ? null : id);
  };

  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr className="border-b border-gray-300 shadow-sm">
          <th className="px-4 py-2 text-left text-sm font-weight-500">
            Device
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id} className="border-b hover:bg-[#f4f4f5]">
            <td className="px-4 py-2 flex items-center gap-1">
              <img
                src={Icons[device.type as keyof typeof Icons]}
                alt={`${device.type} icon`}
              />
              <span>{device.system_name}</span>
            </td>
            <td className="px-4 py-2 relative w-5">
              <Button.Root
                variant="ghost"
                onClick={() => toggleDropdown(device.id)}
              >
                <Button.Icon icon={<ActionIcon />} variant="ghost" />
              </Button.Root>
              {selectedDevice === device.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                  <ul className="py-1 text-sm text-gray-700">
                    <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left">
                      Edit
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left">
                      Delete
                    </button>
                  </ul>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
