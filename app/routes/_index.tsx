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

export const meta: MetaFunction = () => {
  return [
    { title: "NinjaOne Test" },
    { name: "description", content: "NinjaOne React Dev Showcase" },
  ];
};

export const isModalOpenAtom = atom(false);

export const isDeleteModalOpenAtom = atom(false);

export const selectedDeviceAtom = atom<Device>();

const validateDeviceForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};

  const requiredFields = ["system_name", "hdd_capacity", "type"] as const;

  requiredFields.forEach((field) => {
    if (!formData.get(field)) {
      errors[field] = `${field.replace("_", " ")} is required`;
    }
  });

  return Object.keys(errors).length ? errors : null;
};

const parseFormData = (method: string, formData: FormData) => {
  const system_name = formData.get("system_name");
  const hdd_capacity = formData.get("hdd_capacity");
  const type = formData.get("type");
  const id = formData.get("id");

  if (method === "DELETE") {
    return { id: String(id) };
  }

  if (
    typeof system_name !== "string" ||
    typeof hdd_capacity !== "string" ||
    typeof type !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  return {
    id: id ? String(id) : undefined,
    system_name,
    hdd_capacity: parseFloat(hdd_capacity),
    type,
  };
};

export const loader = async () => {
  const devices = await getDevices();

  return json({ status: 200, devices });
};

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<
  TypedResponse<
    | { errors: { [key: string]: string } }
    | { status: number; device: Device | undefined }
    | { message: string }
  >
> => {
  try {
    const formData = await request.formData();
    const parsedData = parseFormData(request.method, formData);

    const errors = validateDeviceForm(formData);
    if (errors && request.method !== "DELETE") {
      return json({ status: 400, errors });
    }

    let device;
    if (request.method === "POST") {
      device = await createDevice(parsedData as Device);
    } else if (request.method === "PUT") {
      device = await updateDevice(parsedData as Device);
    } else if (request.method === "DELETE") {
      if (parsedData?.id) {
        device = await deleteDevice(parsedData.id);
      } else {
        throw new Error("Device ID is required for deletion");
      }
    }

    return json({ status: 200, device: device ?? undefined });
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
