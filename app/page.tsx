"use client";
import DataTable from "@/components/DataTable";
import LoginDialog from "@/components/LoginDialog";
import PageHeader from "@/components/PageHeader";
import { MenuType } from "@/types/MenuType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useRouter } from "next/navigation";
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
    cell: (info) => info.getValue(),
  }),
];

const fetchMenu = async () => {
  try {
    const response = await axios.get("/api/menu");
    const menuList = response.data;
    return menuList.data;
  } catch (error) {
    console.log("error fetch menu:", error);
    return [];
  }
};

export default function Home() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const menuData = await fetchMenu();
      setMenuData(menuData);
    };
    fetchData();
  }, []);
  const router = useRouter();

  const handleSuccessLogin = () => {
    router.push("/menu");
  };

  return (
    <>
      <PageHeader title="Meal List" />
      <DataTable columns={columns} data={menuData} />
      <LoginDialog onSuccessLogin={handleSuccessLogin} />
    </>
  );
}
