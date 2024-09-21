import React, { forwardRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ActionIcon } from "~/assets/icons/action";
import { Device } from "~/services/devices";
import { Button } from "./Button";
import { ModalType, useDevicesStore } from "~/stores/devices";

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
  const openDeleteModal = useDevicesStore((state) => state.openModal);
  const selectDevice = useDevicesStore((state) => state.setSelectedDevice);

  const toggleDropdown = () => {
    selectDevice(device);
  };

  const handleClickEdit = () => {
    openEditModal(ModalType.EDIT);
  };

  const handleClickDelete = () => {
    if (device.id) {
      openDeleteModal(ModalType.DELETE);
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
            <Button.Root
              variant="ghost"
              onClick={handleClickEdit}
              className="w-full font-normal"
            >
              <Button.Label>Edit</Button.Label>
            </Button.Root>
          </MenuItem>
          <MenuItem>
            <Button.Root
              variant="ghost"
              onClick={handleClickDelete}
              className="w-full text-[#D53948] font-normal"
            >
              <Button.Label>Delete</Button.Label>
            </Button.Root>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};
