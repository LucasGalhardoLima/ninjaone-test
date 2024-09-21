export function cx(...args: unknown[]) {
  return args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ")
    .trim();
}

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
