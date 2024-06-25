import PageHeader from "@/components/PageHeader";
import { NextPage } from "next";
import MenuDataTable from "@/components/MenuDataTable";

const MenuPage: NextPage = () => {
  return (
    <>
      <PageHeader title="Menu List" />
      <MenuDataTable />
    </>
  );
};
export default MenuPage;
