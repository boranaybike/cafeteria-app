"use client";
import LoginDialog from "@/components/LoginDialog";
import MenuDataTable from "@/components/MenuDataTable";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <div className="flex justify-end">
        <LoginDialog />
      </div>
      {user && user.role == "admin" && (
        <div className="flex justify-end">
          <Link href="/menu/new">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Add New Menu
            </Button>
          </Link>
        </div>
      )}
      <PageHeader title="Menu List" />
      <MenuDataTable />
    </>
  );
}
