import React from "react";

import { DataTableRows } from "./DataTableRows";

/**
 * A data table component for displaying a list of devices.
 *
 * @returns {JSX.Element} A table with a single row and two columns.
 *   The first column displays the device name, and the second column
 *   displays a dropdown menu with options to edit or delete the device.
 */
export const DataTable: React.FC = (): JSX.Element => {
  return (
    <>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="border-b border-gray-300 shadow-sm">
            <th className="px-4 py-2 text-left text-sm font-medium">Device</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <DataTableRows />
        </tbody>
      </table>
    </>
  );
};
