import type { MetaFunction } from "@remix-run/node";
import { DevicesHeader } from "~/components/DevicesHeader";
import TableFilters from "~/components/TableFilters";

export const meta: MetaFunction = () => {
  return [
    { title: "NinjaOne Test" },
    { name: "description", content: "NinjaOne React Dev Showcase" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col p-6">
      <DevicesHeader />
      <TableFilters />
    </div>
  );
}
