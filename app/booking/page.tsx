"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { Booking } from "@/models/Booking";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";

const columnHelper = createColumnHelper<Booking>();

const defaultData: Booking[] = [
  {
    foodName: "chicken burger, fries, coke",
    day: "Monday",
    bookingDate: new Date(),
  },
  {
    foodName: "chicken burger, fries, coke",
    day: "Tuesday",
    bookingDate: new Date(),
  },
  {
    foodName: "chicken burger, fries, coke",
    day: "Wednesday",
    bookingDate: new Date(),
  },
  {
    foodName: "chicken burger, fries, coke",
    day: "Thursday",
    bookingDate: new Date(),
  },
];

const columns: ColumnDef<Booking, any>[] = [
  columnHelper.accessor("day", {
    header: "Day",
  }),
  columnHelper.accessor("bookingDate", {
    header: "Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("foodName", {
    header: "Name",
  }),
];

const BookingList: NextPage = () => {
  return (
    <>
      <PageHeader title="My Booking List" />
      <DataTable columns={columns} data={defaultData} />
    </>
  );
};
export default BookingList;
