import {
  ActionFunctionArgs,
  json,
  TypedResponse,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
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
import { useDevicesStore } from "~/stores/devices";
import { parseFormData, validateDeviceForm } from "~/utils/helpers";

/**
 * Meta function for the root route.
 *
 * Returns an array of meta tags. The `title` tag is used to set the title of the
 * page, and the `description` tag is used to set the description of the page in
 * search engine results.
 *
 * @returns {Array} An array of meta tags.
 */
export const meta: MetaFunction = () => {
  return [
    { title: "NinjaOne Test" },
    { name: "description", content: "NinjaOne React Dev Showcase" },
  ];
};

/**
 * Loader function for the root route.
 *
 * Fetches all devices from the server and returns them as a JSON response.
 *
 * @returns {Promise<TypedResponse<{ devices: Device[] }>>} A promise that resolves
 * with a JSON response containing an array of Device objects.
 */
export const loader = async () => {
  const devices = await getDevices();
  return json({ devices });
};

/**
 * Action function for the root route.
 *
 * Handles POST, PUT, and DELETE requests for device creation, editing, and deletion,
 * respectively.
 *
 * @param {ActionFunctionArgs} args - The Remix action function arguments.
 * @returns {Promise<TypedResponse>} A promise that resolves with a JSON response
 *   containing a device object, an error message, or an error object with a 400 or
 *   500 status code.
 */
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

  /**
   * The root route component.
   *
   * Renders the devices list, table filters, and modals for adding, editing, and
   * deleting devices.
   *
   * The `useLoaderData` hook is used to access the devices data fetched by the
   * loader. The `useDevicesStore` hook is used to access the `setDevices` function,
   * which is used to update the devices state in the store.
   *
   * The `useEffect` hook is used to update the devices state in the store when the
   * component mounts.
   */
export default function Index() {
  const { devices } = useLoaderData<typeof loader>();
  const setDevices = useDevicesStore((state) => state.setDevices);

  useEffect(() => {
    setDevices(devices);
  }, [setDevices, devices]);

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
