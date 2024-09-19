const BASE_URL = "http://localhost:3000";

export interface Device {
  readonly id: number;
  readonly system_name: string;
  readonly value: number;
  readonly type: string;
}

/**
 *
 *
 * @returns A promise that resolves with the list of devices, or rejects with an Error.
 */
export const getDevices = async (): Promise<Device[]> => {
  const response = await fetch(`${BASE_URL}/devices`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch devices");
  }
  const devices = (await response.json()) as Device[];
  return devices;
};
