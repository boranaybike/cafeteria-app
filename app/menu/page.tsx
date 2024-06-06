"use client";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { MenuType } from "@/types/MenuType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<MenuType>();

const columns: ColumnDef<MenuType, any>[] = [
  columnHelper.accessor("day", {
    header: "Day",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("meal", {
    header: "Menu",
  }),
];

const MenuList: NextPage = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/menu");
      const menuList = await response.json();
      setMenuData(menuList.data);
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
