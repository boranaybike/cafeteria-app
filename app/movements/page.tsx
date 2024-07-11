"use client";
import { NextPage } from "next";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import { MovementType } from "@/types/MovementType";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import MealCard from "@/components/MealCard";

const columnHelper = createColumnHelper<MovementType>();

const columns: ColumnDef<MovementType, any>[] = [
  columnHelper.accessor("date", {
    header: "Date",
  }),
  columnHelper.accessor("spending", {
    header: "Spending",
  }),
  columnHelper.accessor("payment", {
    header: "Payment",
  }),
  columnHelper.accessor("balance", {
    header: "Balance",
  }),
];

const MovementsPage: NextPage = () => {
  const [movementData, setMovementData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/movements");
      const movementList = await response.json();
      setMovementData(movementList.data);
    };

    fetchMenu();
  }, []);
  return (
    <>
      <PageHeader title="Movements List" />
      <MealCard />
      <DataTable columns={columns} data={movementData} />
    </>
  );
};

export default MovementsPage;
