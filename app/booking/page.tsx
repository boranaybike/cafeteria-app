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
import { showMessage } from "@/utils/messageHandler";

interface Reservation {
  isChecked: boolean;
  amount: number;
}

const BookingPage: NextPage = () => {
  const { user } = useUser();
  const [selectedReservations, setSelectedReservations] = useState<
    Record<string, Reservation>
  >({});
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    const fetchMenuAndBookings = async () => {
      try {
        const menuResponse = await axios.get("/api/menu");
        const menu: MenuType[] = menuResponse.data.data;
        const bookingResponse = await axios.get("/api/booking");
        const reservationList = bookingResponse.data.data;

        if (user && user.user_id) {
          const userReservations = reservationList.filter(
            (reservation: BookingType) =>
              reservation.creator?._id === user.user_id
          );

          const combinedMenuList = menu.map((menu: MenuType) => {
            const existingReservation = userReservations.find(
              (reservation: BookingType) => reservation.menu?._id === menu._id
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
          setSelectedReservations(existingRes);
        }
      } catch (error) {
        showMessage("Error fetching menu and reservations: ", "error");
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
      .filter(([menuId, value]) => value.isChecked)
      .map(([menuId, value]) => ({
        amount: value.amount ? value.amount : 1,
        menu: menuId,
        creator: user?.user_id,
      }));

    if (newReservations.length === 0) {
      await axios.post("/api/booking/new", {});
      return;
    }

    try {
      await axios.post("/api/booking/new", { reservations: newReservations });
      showMessage("Reservations updated successfully!", "success");
    } catch {
      showMessage("Error creating reservation:", "error");
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
