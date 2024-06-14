"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { MenuType } from "@/types/MenuType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

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
  }),
];

const MenuList: NextPage = () => {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/api/menu");
        setMenuData(response.data.data);
      } catch (error) {
        console.error("An error occurred while fetching menu data.", error);
      }
    };

    fetchMenu();
  }, []);
  return (
    <>
      <PageHeader title="Meal List" />
      <DataTable columns={columns} data={menuData} />
    </>
  );
};
export default MenuList;
