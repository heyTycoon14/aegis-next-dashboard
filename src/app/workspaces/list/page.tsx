import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import WorkspacesComponent from "@/components/Workspace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspaces",
  // other metadata
};

const WorkspacesPage = () => {
  return (
    <>
      <Breadcrumb pageName="List" parentPage="Workspace" />
      <WorkspacesComponent />
    </>
  );
};

export default WorkspacesPage;
