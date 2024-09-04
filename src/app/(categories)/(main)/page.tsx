import { AnalyticsChart } from "@/components/Analytics/chart";
import Icon from "@/components/Icon";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full items-start justify-start gap-5 flex flex-col p-8 ">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
        Hoşgeldin, <span className="text-cafe-600">admin</span>!
      </h1>
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap gap-3 w-full">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div>
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="flex flex-col gap-1  bg-cafe-300 p-6 py-8 rounded-xl sm:w-full max-w-40">
      <p className="text-cafe-900 font-semibold text-xl">Ziyaretçi</p>
      <div className="text-cafe-900 flex items-center justify-center gap-2">
        <p className="text-4xl font-bold">1,503</p>
        <Icon name="ArrowUpRight" size={36} color="#194e27 " />
      </div>
    </div>
  );
}
