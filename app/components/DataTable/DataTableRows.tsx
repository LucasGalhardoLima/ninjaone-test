import React from "react";
import windows from "~/assets/images/windows.svg";
import linux from "~/assets/images/linux.svg";
import mac from "~/assets/images/mac.svg";
import { Device } from "~/services/devices";
import { TableItemDropdown } from "../TableItemDropdown";
import { useDevicesStore } from "~/stores/devices";

const Icons = {
  WINDOWS: windows,
  LINUX: linux,
  MAC: mac,
};

/**
 * A single table row for the DataTable component.
 *
 * @param {{ device: Device }} props
 * @prop {Device} device - The device to be rendered in this row.
 *
 * @returns {JSX.Element} A single table row.
 */
const TableRow: React.FC<{ device: Device }> = ({
  device,
}: {
  device: Device;
}): JSX.Element => {
  return (
    <>
      <tr className="border-b border-gray-300">
        <td className="px-4 py-2 flex flex-col items-start">
          <div className="flex items-center gap-2">
            <img
              src={Icons[device.type as keyof typeof Icons]}
              alt={`${device.type} icon`}
            />
            <p className="text-sm text-[#211F33] font-medium">
              {device.system_name}
            </p>
          </div>
          <span className="text-xs text-[#6E6D7A] capitalize">{`${device.type.toLowerCase()} workstation - ${
            device.hdd_capacity
          } GB`}</span>
        </td>
        <td className="px-4 py-2 w-10">
          <TableItemDropdown device={device} />
        </td>
      </tr>
    </>
  );
};

/**
 * Renders all the rows in the DataTable component.
 *
 * @returns {JSX.Element} An array of TableRow components.
 */

export const DataTableRows: React.FC = (): JSX.Element => {
  const devices = useDevicesStore((state) => state.filteredDevices);
  return (
    <>
      {devices.map((device) => (
        <TableRow key={device.id} device={device} />
      ))}
    </>
  );
};
