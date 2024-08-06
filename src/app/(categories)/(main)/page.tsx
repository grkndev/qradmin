import Icon from "@/components/Icon";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full items-start justify-evenly flex flex-col p-2 px-8 ">
      <h1 className="text-5xl font-bold">
        Hoşgeldin, <span className="text-cafe-600">admin</span>!
      </h1>
      <div className="flex space-x-3">
        <Card />
        <Card />
        <Card />
      </div>

      <div className="flex flex-col">
        <h2 className="font-bold text-4xl mb-4">Web Analizi</h2>
        <div className="relative w-[850px] h-96 flex justify-center items-center bg-cafe-400 dark:bg-darkCafe-400">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/chart.png)",
            }}
          ></div>
          <div className="relative backdrop-blur-xl bg-white/30 dark:bg-black/30 flex space-x-3 w-full h-full justify-center items-center">
            <h1 className="font-bold text-2xl text-cafe-800 dark:text-darkCafe-800">
              Bu özelliğe erişmek için Premium olmalısınız
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="flex flex-col gap-1  bg-gradient-to-tr from-cafe-200 to-cafe-500 p-6 py-8 rounded-xl">
      <p className="text-cafe-900 font-semibold text-xl">Ziyaretçi</p>
      <div className="text-cafe-900 flex items-center justify-center gap-2">
        <p className="text-4xl font-bold">1,503</p>
        <Icon name="ArrowUpRight" size={36} color="#194e27 " />
      </div>
    </div>
  );
}
