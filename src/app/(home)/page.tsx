import React from "react";
import Home from "./_components/home";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { selected_time_frame?: string };
}) {
  const { selected_time_frame } = await searchParams;

  return <Home selectedTimeFrame={selected_time_frame} />;
}
