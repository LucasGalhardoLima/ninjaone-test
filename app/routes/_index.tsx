import { json, type MetaFunction } from "@remix-run/node";
import { atom } from "jotai";
import { DataTable } from "~/components/DataTable";
import { DeviceModal } from "~/components/DeviceModal";
import { DevicesHeader } from "~/components/DevicesHeader";
import { TableFilters } from "~/components/TableFilters";
import { Device, getDevices } from "~/services/devices";

export const meta: MetaFunction = () => {
  return [
    { title: "NinjaOne Test" },
    { name: "description", content: "NinjaOne React Dev Showcase" },
  ];
};

export async function loader() {
  const devices = await getDevices();

  return json({ devices });
}

export const isModalOpenAtom = atom(false);

export const selectedDeviceAtom = atom<Device>();

export default function Index() {
  return (
    <div className="flex flex-col p-6">
      <DevicesHeader />
      <TableFilters />
      <DataTable />
      <DeviceModal />
    </div>
  );
}
