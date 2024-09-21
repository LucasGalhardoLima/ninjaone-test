import windows from "~/assets/images/windows.svg";
import linux from "~/assets/images/linux.svg";
import mac from "~/assets/images/mac.svg";
import { TableItemDropdown } from "./TableItemDropdown";
import { useDevicesStore } from "~/stores/devices";

const Icons = {
  WINDOWS: windows,
  LINUX: linux,
  MAC: mac,
};

export const DataTable: React.FC = () => {
  const devices = useDevicesStore((state) => state.filteredDevices);
  const staticDevices = useDevicesStore((state) => state.devices);

  console.log(devices, staticDevices);

  return (
    <>
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
                <TableItemDropdown key={device.id} device={device} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
