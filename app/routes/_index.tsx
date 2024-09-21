import {
  ActionFunctionArgs,
  json,
  TypedResponse,
  type MetaFunction,
} from "@remix-run/node";
import { atom } from "jotai";
import { DataTable } from "~/components/DataTable";
import { DeleteDeviceModal } from "~/components/DeleteDeviceModal";
import { DeviceModal } from "~/components/DeviceModal";
import { DevicesHeader } from "~/components/DevicesHeader";
import { TableFilters } from "~/components/TableFilters";
import {
  createDevice,
  deleteDevice,
  Device,
  getDevices,
  updateDevice,
} from "~/services/devices";
import { parseFormData, validateDeviceForm } from "~/utils/helpers";

export const meta: MetaFunction = () => {
  return [
    { title: "NinjaOne Test" },
    { name: "description", content: "NinjaOne React Dev Showcase" },
  ];
};

export const isModalOpenAtom = atom(false);

export const isDeleteModalOpenAtom = atom(false);

export const selectedDeviceAtom = atom<Device>();

export const loader = async () => {
  const devices = await getDevices();
  return json({ devices });
};

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<
  TypedResponse<
    | { errors: { [key: string]: string } }
    | { status: number; device: Device }
    | { message: string }
  >
> => {
  try {
    const formData = await request.formData();
    const parsedData = parseFormData(request.method, formData);

    if (request.method !== "DELETE") {
      const errors = validateDeviceForm(formData);
      if (errors) {
        return json({ status: 400, errors });
      }
    }

    let device;
    switch (request.method) {
      case "POST":
        device = await createDevice(parsedData as Device);

        break;

      case "PUT":
        device = await updateDevice(parsedData as Device);
        break;

      case "DELETE":
        if (!parsedData?.id) {
          throw new Error("Device ID is required for deletion");
        }

        device = await deleteDevice(parsedData.id);
        break;

      default:
        throw new Error("Invalid request method");
    }

    if (!device) {
      throw new Error("Device not found");
    }

    return json({ status: 200, device });
  } catch (error) {
    return json({ status: 500, message: (error as Error).message });
  }
};

export default function Index() {
  return (
    <div className="flex flex-col p-6">
      <DevicesHeader />
      <TableFilters />
      <DataTable />
      <DeviceModal />
      <DeleteDeviceModal />
    </div>
  );
}
