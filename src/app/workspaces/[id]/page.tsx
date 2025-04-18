import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";
import { DomainListSkeleton } from "./_components/domains/skeleton";
import { Domains } from "./_components/domains";
import { WorkspaceInfo } from "./_components/workspace-info";
import { WorkspaceInfoSkeleton } from "./_components/workspace-info/skeleton";

export const metadata: Metadata = {
  title: "Workspace details",
};

const Page = () => {
  return (
    <>
      <Breadcrumb pageName="Detail" parentPage="Workspace" />

      <div className="space-y-10">
        <Suspense fallback={<WorkspaceInfoSkeleton />}>
          <WorkspaceInfo />
        </Suspense>

        <Suspense fallback={<DomainListSkeleton />}>
          <Domains />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
