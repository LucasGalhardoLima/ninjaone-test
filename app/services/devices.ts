const BASE_URL = "http://localhost:3000";

export interface Device {
  readonly id?: string;
  readonly system_name: string;
  readonly hdd_capacity: number;
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

export const getDevice = async (id: string): Promise<Device> => {
  const response = await fetch(`${BASE_URL}/devices/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch device");
  }

  const device = (await response.json()) as Device;

  return device;
};

export const createDevice = async (device: Device): Promise<Device> => {
  const response = await fetch(`${BASE_URL}/devices`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });

  if (!response.ok) {
    throw new Error("Failed to create device");
  }

  const createdDevice = (await response.json()) as Device;

  return createdDevice;
};

export const updateDevice = async (device: Device): Promise<Device> => {
  const response = await fetch(`${BASE_URL}/devices/${device.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });

  if (!response.ok) {
    throw new Error("Failed to update device");
  }

  const updatedDevice = (await response.json()) as Device;

  return updatedDevice;
};

export const deleteDevice = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/devices/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete device");
  }

  return await response.json();
};
