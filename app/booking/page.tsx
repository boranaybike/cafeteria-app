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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReservationType } from "@/types/ReservationType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { isFuture, isPast } from "date-fns";
import { tokenPayload } from "@/types/TokenPayload";

const BookingPage: NextPage = () => {
  const [booking, setBooking] = useState({
    date: "",
    amount: "1",
    menu: "",
  });
  const [user, setUser] = useState<tokenPayload | null>(null);
  const [reservationData, setReservationData] = useState<ReservationType[]>([]);
  const [activeReservations, setActiveReservations] = useState<
    ReservationType[]
  >([]);
  const [pastReservations, setPastReservations] = useState<ReservationType[]>(
    []
  );

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
    const response = await axios.get("/api/booking");
    const reservationList = response.data;
    if (user && user.user_id) {
      const userReservations = reservationList.data.filter(
        (reservation: any) => reservation.creator === user.user_id
      );
      setReservationData(userReservations);
      const active = userReservations.filter((reservation: ReservationType) =>
        isFuture(new Date(reservation.date))
      );
      const past = userReservations.filter((reservation: ReservationType) =>
        isPast(new Date(reservation.date))
      );
      setActiveReservations(active);
      setPastReservations(past);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBooking();
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      console.error("Error creating reservation: ", error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await axios.delete(`/api/booking/${reservationId}`);
      console.log("Reservation cancelled successfully!");
      fetchBooking();
    } catch (error) {
      console.error("Error cancelling reservation: ", error);
    }
  };

  const columnHelper = createColumnHelper<ReservationType>();

  const columns: ColumnDef<ReservationType, any>[] = [
    columnHelper.accessor("menu.meal", {
      header: "Menu",
    }),
    columnHelper.accessor("date", {
      header: "Date",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => handleCancelReservation(row.original._id)}
        >
          Cancel Reservation
        </Button>
      ),
    }),
  ];

  const pastResColumns: ColumnDef<ReservationType, any>[] = [
    columnHelper.accessor("menu.meal", {
      header: "Menu",
    }),
    columnHelper.accessor("date", {
      header: "Date",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
    }),
  ];

  const reservedDates = reservationData.map((reservation) => reservation.date);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader title="My Reservations" />
      <div className="grid grid-cols-3 gap-16">
        <div>
          <form onSubmit={handleFormSubmit}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Make a new Reservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <SelectDate
                      onDateSelect={(date) => handleChange("date", date)}
                      selectedDate={booking.date}
                      excludedDates={reservedDates}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <SelectAmount
                      onAmountSelect={(amount) =>
                        handleChange("amount", amount)
                      }
                      selectedAmount={booking.amount}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <SelectMenu
                      onMenuChange={(menuId) => handleChange("menu", menuId)}
                      selectedMenu={booking.menu}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-6">
                <Button type="submit">Make Reservation</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        <div className="col-span-2">
          <Card className="w-full mb-4">
            <CardHeader>
              <CardTitle>Active Reservations</CardTitle>
            </CardHeader>
            {activeReservations && (
              <CardContent>
                <DataTable columns={columns} data={activeReservations} />
              </CardContent>
            )}
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Past Reservations</CardTitle>
            </CardHeader>
            {pastReservations && (
              <CardContent>
                <DataTable columns={pastResColumns} data={pastReservations} />
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
