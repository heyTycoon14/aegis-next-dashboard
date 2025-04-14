import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Domains",
  // other metadata
};

const DomainsPage = () => {
  return (
    <>
      <Breadcrumb pageName="List" parentPage="Domain" />
      <div className="space-y-10">
        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense>
      </div>
    </>
  );
};

export default DomainsPage;
