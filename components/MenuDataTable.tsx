"use client";
import DataTable from "@/components/DataTable";
import { MenuType } from "@/types/MenuType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, isFuture } from "date-fns";

const columnHelper = createColumnHelper<MenuType>();

const columns: ColumnDef<MenuType, any>[] = [
  columnHelper.accessor("day", {
    header: "Day",
  }),
  columnHelper.accessor("meal", {
    header: "Menu",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = format(new Date(row.original.date), "yyyy-MM-dd");
      return <>{formattedDate}</>;
    },
  }),
];

const MenuList: React.FC = () => {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/api/menu");
        console.log("ok!");
        const menu = response.data.data;
        const activeMenuData = menu.filter((menu: MenuType) =>
          isFuture(new Date(menu.date))
        );
        setMenuData(activeMenuData);
      } catch (error) {
        console.error("An error occurred while fetching menu data.", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={menuData} />
    </>
  );
};
export default MenuList;