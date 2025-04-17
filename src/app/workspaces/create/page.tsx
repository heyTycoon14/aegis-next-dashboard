import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NewWorkspaceComponent from "@/components/Workspace/create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Workspace",
};

const CreatWorkspacesPage = () => {
  return (
    <>
      <Breadcrumb pageName="New Workspace" parentPage="Workspace" />
      <NewWorkspaceComponent />
    </>
  );
};

export default CreatWorkspacesPage;
