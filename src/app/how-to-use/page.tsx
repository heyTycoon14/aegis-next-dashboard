import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use",
};

const HowToPage = () => {
  return (
    <>
      <Breadcrumb pageName="How to Use" parentPage="Home" />

      <div className="space-y-10">
        <ShowcaseSection
          title="How to Use the Aegis Admin Dashboard"
          className="space-y-6 !p-6.5"
        >
          <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:left-5.5 [&_svg]:top-5.5">
            <p className="mb-4 leading-relaxed">
              Welcome to the Aegis Admin Dashboard! This guide will help you get
              started and make the most out of the platform.
            </p>

            <h2 className="mb-2 text-lg font-semibold">Step 1: Sign Up</h2>
            <p className="mb-4 leading-relaxed">
              Create an account by signing up with your email and password. Make
              sure to verify your email to activate your account.
            </p>

            <h2 className="mb-2 text-lg font-semibold">Step 2: Log In</h2>
            <p className="mb-4 leading-relaxed">
              Use your registered email and password to log in to the dashboard.
              If you forget your password, use the "Forgot Password" option to
              reset it.
            </p>

            <h2 className="mb-2 text-lg font-semibold">
              Step 3: Explore Features
            </h2>
            <p className="mb-4 leading-relaxed">
              Navigate through the dashboard to explore its features, such as
              managing domains, monitoring performance, and viewing analytics.
            </p>

            <h2 className="mb-2 text-lg font-semibold">
              Step 4: Customize Settings
            </h2>
            <p className="mb-4 leading-relaxed">
              Customize your account settings, notifications, and preferences to
              tailor the platform to your needs.
            </p>

            <h2 className="mb-2 text-lg font-semibold">Step 5: Get Support</h2>
            <p className="leading-relaxed">
              If you encounter any issues or have questions, visit the support
              section or contact our team for assistance.
            </p>
          </div>
        </ShowcaseSection>
      </div>
    </>
  );
};

export default HowToPage;
