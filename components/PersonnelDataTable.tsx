"use client";
import DataTable from "@/components/DataTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { showMessage } from "@/utils/messageHandler";
import { UserType } from "@/types/UserType";
import { Button } from "./ui/button";

const PersonnelList: React.FC = () => {
  const [personnelData, setPersonnelData] = useState([]);

  const fetchPersonnel = async () => {
    try {
      const response = await axios.get("/api/personnel");
      const personnelList = response.data.data;
      setPersonnelData(personnelList);
    } catch (error) {
      console.error("An error occurred while fetching personnel data: ", error);
      showMessage("Error fetching personnel: ", "error");
    }
  };
  const columnHelper = createColumnHelper<UserType>();

  const columns: ColumnDef<UserType, any>[] = [
    columnHelper.accessor("card_number", {
      header: () => <div className="p-2">Card Number</div>,
      cell: ({ row }) => (
        <div className="p-2">
          <div>{row.original.card_number}</div>
        </div>
      ),
    }),

    columnHelper.accessor("first_name", {
      header: () => <div className="p-2">Name & Surname</div>,
      cell: ({ row }) => (
        <div className="p-2">
          <div>
            {row.original.first_name} {row.original.last_name}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("role", {
      header: () => <div className="p-2">Role</div>,
      cell: ({ row }) => (
        <div className="p-2">
          <div>{row.original.role}</div>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => handleRemovePersonnel(row.original._id)}
        >
          Delete Personnel
        </Button>
      ),
    }),
  ];

  const handleRemovePersonnel = async (personnelId: string) => {
    try {
      await axios.delete(`/api/personnel/${personnelId}`);
      showMessage("Personnel deleted successfully!", "success");
      fetchPersonnel();
    } catch (error) {
      showMessage("Error deleting personnel: ", "error");
      console.error("Error deleting personnel: ", error);
    }
  };

  useEffect(() => {
    fetchPersonnel();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={personnelData} />
    </>
  );
};
export default PersonnelList;
