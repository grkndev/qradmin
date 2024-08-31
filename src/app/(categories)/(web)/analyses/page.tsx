import { AnalyticsChart } from "@/components/Analytics/chart";
import React from "react";

export default function Membership() {
  return (
    <div className="w-[100%] p-8 flex flex-col space-y-4 h-auto">
      <h1 className="font-bold text-xl sm:text-3xl">Web İstatistikleri</h1>
      <div className="w-full items-center justify-center flex lg:flex-row flex-col lg:space-x-5 lg:space-y-0 space-y-5">
        <AnalyticsChart />
        <AnalyticsChart />
      </div>

    </div>
  );
}
