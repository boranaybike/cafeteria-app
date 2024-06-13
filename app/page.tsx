"use client";
import DataTable from "@/components/DataTable";
import LoginDialog from "@/components/LoginDialog";
import PageHeader from "@/components/PageHeader";
import { MenuType } from "@/types/MenuType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
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

export default function Home() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/menu");
      const menuList = await response.json();
      setMenuData(menuList.data);
    };

    fetchMenu();
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
