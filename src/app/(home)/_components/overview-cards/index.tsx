"use client";
import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { useSession } from "next-auth/react";

export function OverviewCardsGroup() {
  const { data: session } = useSession();
  const subscription_insights = session?.userData?.subscription_insights;
  const domains = {
    value: subscription_insights?.domains?.usage || 0,
    available: subscription_insights?.domains?.available || 0,
  };

  const redirects = {
    value: subscription_insights?.redirects?.usage || 0,
    available: subscription_insights?.redirects?.available || 0,
  };

  const sales = {
    value: subscription_insights?.sales?.usage || 0,
    available: subscription_insights?.sales?.available || 0,
  };

  const webhooks = {
    value: subscription_insights?.webhooks?.usage || 0,
    available: subscription_insights?.webhooks?.available || 0,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Domains"
        data={{
          ...domains,
          value: compactFormat(domains.value),
        }}
        Icon={icons.Users}
      />

      <OverviewCard
        label="Total Redirects"
        data={{
          ...redirects,
          value: "$" + compactFormat(redirects.value),
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Sales"
        data={{
          ...sales,
          value: compactFormat(sales.value),
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total Webhooks"
        data={{
          ...webhooks,
          value: compactFormat(webhooks.value),
        }}
        Icon={icons.Product}
      />
    </div>
  );
}
