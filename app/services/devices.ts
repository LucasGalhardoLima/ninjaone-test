const BASE_URL = "http://localhost:3000";

export interface Device {
  readonly id?: string;
  readonly system_name: string;
  readonly hdd_capacity: number;
  readonly type: string;
}


/**
 * Fetches all devices from the server.
 *
 * @returns {Promise<Device[]>} A promise that resolves with an array of Device objects.
 * @throws {Error} If the request fails.
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

/**
 * Fetches a device from the server by its id.
 *
 * @param {string} id - The id of the device to fetch.
 * @returns {Promise<Device>} A promise that resolves with the fetched device.
 * @throws {Error} If the request fails.
 */
// Implemented, tested, but decided not to use it
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

/**
 * Creates a new device on the server.
 *
 * @param {Device} device - The device data to be created.
 * @returns {Promise<Device>} A promise that resolves with the created device.
 * @throws {Error} If the device creation fails.
 */
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

/**
 * Updates a device on the server.
 *
 * @param {Device} device - The device data to be updated.
 * @returns {Promise<Device>} A promise that resolves with the updated device.
 * @throws {Error} If the device update fails.
 */
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

/**
 * Deletes a device from the server.
 *
 * @param {string} id - The id of the device to be deleted.
 * @returns {Promise<void>} A promise that resolves when the device has been deleted.
 * @throws {Error} If the device deletion fails.
 */
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
