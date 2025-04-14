import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UsedDevices } from "@/components/Charts/used-devices";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Current Subscription",
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
      <Breadcrumb pageName="Current Subscription" parentPage="Subscription" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <UsedDevices
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />
      </div>
    </>
  );
}
