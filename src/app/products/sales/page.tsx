import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tracker",
};

const SalesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sales Tracker" parentPage="Products" />

      <div className="space-y-10">
        <InvoiceTable />
      </div>
    </>
  );
};

export default SalesPage;
