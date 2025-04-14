import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspaces",
  // other metadata
};

const WorkspacesPage = () => {
  return (
    <>
      <Breadcrumb pageName="List" parentPage="Workspace" />
      <div className="space-y-10">
        <InvoiceTable />
      </div>
    </>
  );
};

export default WorkspacesPage;
