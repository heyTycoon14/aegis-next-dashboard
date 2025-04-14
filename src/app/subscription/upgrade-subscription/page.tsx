import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CampaignVisitors } from "@/components/Charts/campaign-visitors";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade Subscription",
};

type PropsType = {
  searchParams: {
    selected_time_frame?: string;
  };
};

export default function Page(props: PropsType) {
  const { selected_time_frame } = props.searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Breadcrumb pageName="Upgrade Subscription" parentPage="Subscription" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-5">
          <CampaignVisitors />
        </div>
      </div>
    </>
  );
}
