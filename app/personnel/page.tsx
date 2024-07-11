import PageHeader from "@/components/PageHeader";
import PersonnelDataTable from "@/components/PersonnelDataTable";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import Link from "next/link";

const PersonnelPage: NextPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <PageHeader title="Personnel List" />
        </div>
        <div>
          <Link href="/personnel/new">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Add Personnel
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <PersonnelDataTable />
      </div>
    </>
  );
};
export default PersonnelPage;
