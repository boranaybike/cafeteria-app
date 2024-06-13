"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import SelectAmount from "@/components/Select/SelectAmonut";
import SelectDate from "@/components/Select/SelectDate";
import SelectMenu from "@/components/Select/SelectMenu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReservationType } from "@/types/ReservationType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface tokenPayload extends JwtPayload {
  user_id: string;
  card_number: string;
}

const BookingPage: NextPage = () => {
  const [booking, setBooking] = useState({
    date: "",
    amount: "1",
    menu: "",
  });

  const [user, setUser] = useState<tokenPayload | null>(null);
  const [reservationData, setReservationData] = useState<ReservationType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("user") || "";
      if (token) {
        const decodedUser = jwtDecode<tokenPayload>(token);
        setUser(decodedUser);
      }
    };
    fetchUser();
  }, []);

  const fetchBooking = async () => {
    const response = await fetch("/api/booking");
    const reservationList = await response.json();
    if (user && user.card_number) {
      const userReservations = reservationList.data.filter(
        (reservation: any) => reservation.creator === user.user_id
      );
      setReservationData(userReservations);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBooking();
    }
  }, [user]);

  const handleMenuChange = (menuId: string) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      menu: menuId,
    }));
  };

  const handleAmountChange = (amount: string) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      amount: amount,
    }));
  };

  const handleDateChange = (date: string) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      date: date,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingReservation = reservationData.find(
      (reservation) => reservation.date === booking.date
    );

    if (existingReservation) {
      console.log("You already have a reservation for this date.");
      return;
    }
    try {
      await axios.post("/api/booking/new", {
        ...booking,
        user_id: user?.user_id,
      });
      console.log("Reservation created successfully!");
      setBooking({
        date: "",
        amount: "1",
        menu: "",
      });
      fetchBooking();
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await axios.delete(`/api/booking/${reservationId}`);
      console.log("Reservation cancelled successfully!");
      fetchBooking();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const columnHelper = createColumnHelper<ReservationType>();

  const columns: ColumnDef<ReservationType, any>[] = [
    columnHelper.accessor("menu.meal", {
      header: "Menu",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <Button onClick={() => handleCancelReservation(row.original._id)}>
          Cancel Reservation
        </Button>
      ),
    }),
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader title="My Reservations" />
      <div className="flex col gap-12">
        <div className="flex gap-12">
          <form onSubmit={handleFormSubmit}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Make a new Reservation</CardTitle>
                <CardDescription>Lorem ipsum Reservation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <SelectDate
                      onDateSelect={handleDateChange}
                      selectedDate={booking.date}
                    />
                  </div>
                  <SelectAmount
                    onAmountSelect={handleAmountChange}
                    selectedAmount={booking.amount}
                  />
                  <div className="flex flex-col space-y-1.5">
                    <SelectMenu
                      onMenuChange={handleMenuChange}
                      selectedMenu={booking.menu}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-6">
                <Button variant="outline">Cancel Reservation</Button>
                <Button type="submit">Make Reservation</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        <div className="flex gap-12">
          {reservationData && (
            <DataTable columns={columns} data={reservationData} />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
