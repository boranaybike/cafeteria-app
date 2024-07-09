"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { format, isFuture } from "date-fns";
import { useUser } from "@/context/UserContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus, Plus } from "lucide-react";
import { MenuType } from "@/types/MenuType";
import { BookingType } from "@/types/BookingType";

interface Reservation {
  isChecked: boolean;
  amount: number;
}

const BookingPage: NextPage = () => {
  const { user } = useUser();
  const [selectedReservations, setSelectedReservations] = useState<
    Record<string, Reservation>
  >({});
  const [existingReservations, setExistingReservations] = useState<
    Record<string, Reservation>
  >({});
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const fetchMenuAndBookings = async () => {
      try {
        const menuResponse = await axios.get("/api/menu");
        const menu: MenuType[] = menuResponse.data.data;
        const activeMenuList = menu.filter((menu: any) =>
          isFuture(new Date(menu.date))
        );

        const bookingResponse = await axios.get("/api/booking");
        const reservationList = bookingResponse.data.data;

        if (user && user.user_id) {
          const userReservations = reservationList.filter(
            (reservation: BookingType) =>
              reservation.creator?._id === user.user_id
          );

          const combinedMenuList = activeMenuList.map((menu: any) => {
            const existingReservation = userReservations.find(
              (reservation: any) => reservation.menu?._id === menu._id
            );
            return {
              ...menu,
              isChecked: !!existingReservation,
              amount: existingReservation ? existingReservation.amount : 1,
            };
          });

          setMenuList(combinedMenuList);
          const existingRes: Record<string, Reservation> = {};
          combinedMenuList.forEach((menu: any) => {
            if (menu.isChecked) {
              existingRes[menu._id] = {
                isChecked: menu.isChecked,
                amount: menu.amount,
              };
            }
          });
          setExistingReservations(existingRes);
          setSelectedReservations(existingRes);
        }
      } catch (error) {
        console.error("Error fetching menu and reservations: ", error);
      }
    };

    if (user) {
      fetchMenuAndBookings();
    }
  }, [user]);

  const handleChange = (menuId: string, field: string, value: any) => {
    setSelectedReservations((prevSelected: any) => ({
      ...prevSelected,
      [menuId]: {
        ...prevSelected[menuId],
        [field]: value,
      },
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReservations = Object.entries(selectedReservations)
      .filter(
        ([menuId, value]) =>
          value.isChecked && !(menuId in existingReservations)
      )
      .map(([menuId, value]) => ({
        amount: value.amount,
        menu: menuId,
        creator: user?.user_id,
      }));

    if (newReservations.length === 0) {
      console.log("No new reservations to create.");
      return;
    }

    try {
      const response = await axios.post("/api/booking/new", {
        reservations: newReservations,
      });
      console.log("Reservations created successfully!", response.data.data);
    } catch (error: any) {
      console.error("Error creating reservation: ", error.response.data);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await axios.delete(`/api/booking/${reservationId}`);
      console.log("Reservation cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling reservation: ", error);
    }
  };

  const columnHelper = createColumnHelper<any>();

  const columns: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="p-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="p-2">
          <Checkbox
            checked={selectedReservations[row.original._id]?.isChecked}
            onCheckedChange={(value) =>
              handleChange(row.original._id, "isChecked", !!value)
            }
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    columnHelper.accessor("date", {
      header: () => <div className="p-2">Day & Date</div>,
      cell: ({ row }) => (
        <div className="p-2">
          <div>{row.original.day}</div>
          <div>{format(new Date(row.original.date), "yyyy-MM-dd")}</div>
        </div>
      ),
    }),
    columnHelper.accessor("meal", {
      header: "Menu",
    }),
    columnHelper.accessor("amount", {
      header: () => <div className="p-2">Amount</div>,
      cell: ({ row }) => (
        <div className="flex items-center text-center flex-row gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              handleChange(
                row.original._id,
                "amount",
                (selectedReservations[row.original._id]?.amount || 1) - 1
              )
            }
          >
            <Minus />
          </Button>
          <h1>{selectedReservations[row.original._id]?.amount || 1}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              handleChange(
                row.original._id,
                "amount",
                (selectedReservations[row.original._id]?.amount || 1) + 1
              )
            }
          >
            <Plus />
          </Button>
        </div>
      ),
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

  return (
    <>
      <PageHeader title="My Reservations" />
      <div>
        <Card className="w-full mb-4">
          <CardHeader>
            <CardTitle>Make a new Reservation</CardTitle>
          </CardHeader>
          {menuList.length > 0 && (
            <form onSubmit={handleFormSubmit}>
              <CardContent>
                <DataTable columns={columns} data={menuList} />
              </CardContent>
              <CardFooter className="flex justify-end gap-6">
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Make Reservation
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </>
  );
};

export default BookingPage;
