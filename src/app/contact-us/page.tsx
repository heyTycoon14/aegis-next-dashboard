import { MessageOutlineIcon } from "@/assets/icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb pageName="Contact Us" parentPage="Home" />

      <div className="space-y-10">
        <ShowcaseSection
          title="Contact to Aegis Team"
          className="space-y-6 !p-6.5"
        >
          <TextAreaGroup
            label="Default textarea"
            placeholder="Default textarea"
          />

          <Button
            label="Submit"
            variant="primary"
            size="small"
            icon={<MessageOutlineIcon />}
          />
        </ShowcaseSection>
      </div>
    </>
  );
};

export default ContactPage;
