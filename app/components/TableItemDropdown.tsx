import React, { forwardRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ActionIcon } from "~/assets/icons/action";
import { Device } from "~/services/devices";
import { Button } from "./Button";
import { useDevicesStore } from "~/stores/devices";

interface TableItemDropdownProps {
  device: Device;
}

interface MenuButtonComponentProps {
  onClick: (() => void) | ((event: { preventDefault: () => void }) => void);
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
  const openEditModal = useDevicesStore((state) => state.openModal);
  const openDeleteModal = useDevicesStore((state) => state.openDeleteModal);
  const selectDevice = useDevicesStore((state) => state.setSelectedDevice);

  const toggleDropdown = () => {
    selectDevice(device);
  };

  const handleClickEdit = () => {
    openEditModal();
  };

  const handleClickDelete = () => {
    if (device.id) {
      openDeleteModal();
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          as={MenuButtonComponent}
          onClick={toggleDropdown}
        ></MenuButton>
      </div>

      <MenuItems
        transition
        anchor="bottom end"
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
