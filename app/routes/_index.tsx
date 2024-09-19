import {
  ActionFunctionArgs,
  json,
  TypedResponse,
  type MetaFunction,
} from "@remix-run/node";
import { atom } from "jotai";
import { DataTable } from "~/components/DataTable";
import { DeviceModal } from "~/components/DeviceModal";
import { DevicesHeader } from "~/components/DevicesHeader";
import { TableFilters } from "~/components/TableFilters";
import { createDevice, Device, getDevices } from "~/services/devices";

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

const validateDevice = (formData: FormData) => {
  const systemName = formData.get("system_name");
  const value = formData.get("value");
  const type = formData.get("type");

  const errors = {} as {
    [key: string]: string;
  };

  if (!systemName) {
    errors["system_name"] = "System name is required";
  }

  if (!value) {
    errors["value"] = "Value is required";
  }

  if (!type) {
    errors["type"] = "Type is required";
  }

  return Object.keys(errors).length ? errors : null;
};

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<
  TypedResponse<{ errors: { [key: string]: string } } | { device: Device }>
> => {
  const formData = await request.formData();

  const errors = validateDevice(formData);
  if (errors) {
    return json({ status: 400, errors });
  }

  const device = await createDevice({
    system_name: formData.get("system_name") as string,
    value: parseFloat(formData.get("value") as string),
    type: formData.get("type") as string,
  });

  return json({ status: 200, device });
};

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
