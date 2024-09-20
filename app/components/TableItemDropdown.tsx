import React, { forwardRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAtom, useSetAtom } from "jotai";
import { ActionIcon } from "~/assets/icons/action";
import { isModalOpenAtom, selectedDeviceAtom } from "~/routes/_index";
import { Device } from "~/services/devices";
import { Button } from "./Button";
import { useFetcher } from "@remix-run/react";

interface TableItemDropdownProps {
  device: Device;
}

interface MenuButtonComponentProps {
  onClick: () => void;
}

const MenuButtonComponent = forwardRef<
  HTMLButtonElement,
  MenuButtonComponentProps
>(({ onClick }, ref) => (
  <Button.Root variant="ghost" onClick={onClick} ref={ref}>
    <Button.Icon icon={<ActionIcon />} variant="ghost" />
  </Button.Root>
));

MenuButtonComponent.displayName = "MenuButton";

export const TableItemDropdown: React.FC<TableItemDropdownProps> = ({
  device,
}) => {
  const fetcher = useFetcher();
  const openEditModal = useSetAtom(isModalOpenAtom);
  const [selectedDevice, setSelectedDevice] = useAtom(selectedDeviceAtom);

  const toggleDropdown = (device: Device) => {
    setSelectedDevice(selectedDevice?.id === device.id ? undefined : device);
  };

  const deleteDevice = (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    fetcher.submit(formData, { method: "DELETE" });
  };

  const handleClickEdit = () => {
    openEditModal(true);
  };

  const handleClickDelete = () => {
    if (device.id) {
      deleteDevice(device.id);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          as={MenuButtonComponent}
          onClick={() => toggleDropdown(device)}
        ></MenuButton>
      </div>

      <MenuItems
        transition
        anchor="bottom end"
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              onClick={handleClickEdit}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleClickDelete}
              className="block w-full text-left px-4 py-2 text-sm text-[#D53948] data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};
