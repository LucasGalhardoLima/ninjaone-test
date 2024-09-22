

/**
 * Combines multiple arguments into a single string with space-separated values.
 * 
 * This function takes any number of arguments, flattens them, filters out non-string values,
 * joins the remaining strings with a space, and trims any leading or trailing whitespace.
 * 
 * @param {...unknown[]} args - The arguments to be combined. Can be of any type, but only strings will be included in the result.
 * @returns {string} A single string with space-separated values derived from the input arguments.
 */
export function cx(...args: unknown[]): string {
  return args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim();
}

/**
 * Validates a form data object with the expected fields for a device.
 * 
 * The function takes a FormData object, checks for the presence of the required fields,
 * and returns an object with error messages for each missing field. If there are
 * no errors, the function returns null.
 * 
 * @param {FormData} formData - The form data object to validate.
 * @returns {{ [key: string]: string } | null} An object with error messages for each missing field, or null if there are no errors.
 */
export const validateDeviceForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};

  const requiredFields = ["system_name", "hdd_capacity", "type"] as const;

  requiredFields.forEach((field) => {
    if (!formData.get(field)) {
      errors[field] = `${field.replace("_", " ")} is required`;
    }
  });

  return Object.keys(errors).length ? errors : null;
};

/**
 * Parses a FormData object into a device object suitable for use with the
 * devices API functions.
 *
 * If the HTTP method is DELETE, the function returns an object with a single
 * "id" property. Otherwise, the function returns an object with system_name,
 * hdd_capacity, and type properties, or throws an error if the form data is
 * invalid.
 *
 * @param {string} method - The HTTP method to be used for the request.
 * @param {FormData} formData - The form data object to be parsed.
 * @returns {{ id: string } | { id?: string, system_name?: string, hdd_capacity?: number, type?: string }}
 */
export const parseFormData = (method: string, formData: FormData) => {
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
    system_name: system_name ? String(system_name) : undefined,
    hdd_capacity: hdd_capacity ? parseFloat(hdd_capacity) : undefined,
    type: type ? String(type) : undefined,
  };
};
