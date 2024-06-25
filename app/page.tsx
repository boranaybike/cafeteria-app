import LoginDialog from "@/components/LoginDialog";
import MenuDataTable from "@/components/MenuDataTable";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader title="Menu List" />
      <MenuDataTable />
      <LoginDialog />
    </>
  );
}
