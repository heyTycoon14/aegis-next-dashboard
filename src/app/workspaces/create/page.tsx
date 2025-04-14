import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Workspace",
  // other metadata
};

const NewWorkspacePage = () => {
  return (
    <>
      <Breadcrumb pageName="New Workspace" />
      <div className="space-y-10">
        <ShowcaseSection title="Workspace Detail" className="space-y-5.5 !p-6.5">
          <InputGroup
            label="Default input"
            placeholder="Default input text"
            type="text"
          />

          <InputGroup
            label="Active input"
            placeholder="Active input text"
            active
            type="text"
          />

          <InputGroup
            label="Disabled input"
            placeholder="Disabled input text"
            type="text"
            disabled
          />
        </ShowcaseSection>
      </div>
    </>
  );
};

export default NewWorkspacePage;
