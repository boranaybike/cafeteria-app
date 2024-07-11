"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showMessage } from "@/utils/messageHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const BookingListPage: NextPage = () => {
  const [bookingData, setBookingData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");

  const columnHelper = createColumnHelper<any>();

  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor(
      (row) => `${row.creator?.first_name} ${row.creator?.last_name}`,
      {
        header: "User Name",
      }
    ),
    columnHelper.accessor("creator.card_number", {
      header: "Card Number",
    }),
    columnHelper.accessor("date", {
      header: "Date",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
    }),
  ];

  const fetchBooking = async () => {
    try {
      const response = await axios.get("/api/booking");
      const data = response.data.data;
      setBookingData(data);
    } catch (error) {
      showMessage("Error fetching booking: ", "error");
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div>
      <PageHeader title="Booking List" />
      <div>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button>Filter</Button>
      </div>
      <DataTable columns={columns} data={bookingData} />
    </div>
  );
};

export default BookingListPage;
