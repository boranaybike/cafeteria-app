"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { Menu } from "@/models/Menu";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";

const columnHelper = createColumnHelper<Menu>();

const defaultData: Menu[] = [
  {
    foodName: "chicken burger, fries, coke",
    day: "Monday",
    date: new Date(),
    booked: true,
  },
  {
    foodName: "chicken burger, fries, coke",
    day: "Tuesday",
    date: new Date(),
    booked: true,
  },
  {
    foodName: "chicken burger, fries, coke",
    day: "Wednesday",
    date: new Date(),
    booked: false,
  },
  {
    foodName: "chicken burger, fries, coke",
    day: "Thursday",
    date: new Date(),
    booked: true,
  },
];

const columns: ColumnDef<Menu, any>[] = [
  columnHelper.accessor("day", {
    header: "Day",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("foodName", {
    header: "Menu",
  }),
  columnHelper.accessor("booked", {
    header: "Booked",
    cell: (info) => (
      <span
        className={
          info.getValue() === true
            ? "bg-green-500 text-white px-3 py-2 rounded"
            : "bg-red-500 text-white px-3 py-2 rounded"
        }
      >
        {info.getValue()}
      </span>
    ),
  }),
];

const MenuList: NextPage = () => {
  return (
    <>
      <PageHeader title="Menu List" />
      <DataTable columns={columns} data={defaultData} />
    </>
  );
};
export default MenuList;
