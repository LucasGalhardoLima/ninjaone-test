import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getDevice } from "~/services/devices";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log(request, params);

  if (params.device) {
    const device = await getDevice(params.device);

    if (!device) {
      throw new Response("Device not found", { status: 404 });
    }

    console.log('device', device);

    return json({ device });
  }

  return json({ device: null });
};
