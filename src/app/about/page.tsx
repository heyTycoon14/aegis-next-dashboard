import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageName="About Aegis" parentPage="Home" />

      <div className="space-y-10">
        <ShowcaseSection
          title="Domain and Contingency Management Platform"
          className="space-y-6 !p-6.5"
        >
          <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:left-5.5 [&_svg]:top-5.5">
            <p className="mb-4 leading-relaxed">
              Welcome to Aegis Admin Dashboard! We are dedicated to providing
              cutting-edge solutions for managing and monitoring your business
              operations efficiently. Our platform is designed to help you make
              data-driven decisions and streamline your workflows.
            </p>
            <p className="mb-4 leading-relaxed">
              Our team is composed of passionate professionals who are committed
              to delivering high-quality software solutions. We believe in
              innovation, collaboration, and customer satisfaction.
            </p>
            <p className="leading-relaxed">
              Thank you for choosing Safegate Admin Dashboard. If you have any
              questions or feedback, feel free to reach out to us. We are here
              to help you succeed!
            </p>
          </div>
        </ShowcaseSection>
      </div>
    </>
  );
};

export default AboutPage;
