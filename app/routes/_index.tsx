import { json, type MetaFunction } from "@remix-run/node";
import { DataTable } from "~/components/DataTable";
import { DevicesHeader } from "~/components/DevicesHeader";
import { TableFilters } from "~/components/TableFilters";
import { getDevices } from "~/services/devices";

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

export default function Index() {
  return (
    <div className="flex flex-col p-6">
      <DevicesHeader />
      <TableFilters />
      <DataTable />
    </div>
  );
}
