import { ChartNoAxesCombined, FileClock, House, LayoutPanelLeft, PackageSearch, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import ContentButton from "./Button/button";
import Label from "./Label/label";

export default function Content() {
  return (
    <div className="w-full flex flex-col gap-9">
      <ContentButton
        className="bg-cafe-200 "
        icon={<House size={24} color="#082B12" />}
        title="Anasayfa"
        color="text-cafe-950"
        href="/"
      />
      <div className="flex flex-col gap-1">
        <Label title="Website Yönetimi" />
        <ContentButton
          className=" "
          icon={<Settings size={24} color="#000" />}
          title="Ayarlar"
          color="text-black"
          href="/"
        />
        <ContentButton
          className=" "
          icon={<ChartNoAxesCombined size={24} color="#000" />}
          title="Analizler"
          color="text-black"
          href="/"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label title="Ürün Yönetimi" />
        <ContentButton
          className=" "
          icon={<LayoutPanelLeft size={24} color="#000" />}
          title="Kategoriler"
          color="text-black"
          href="/"
        />
        <ContentButton
          className=" "
          icon={<PackageSearch size={24} color="#000" />}
          title="Ürünler"
          color="text-black"
          href="/"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label title="Mağaza Yönetimi" />
        <ContentButton
          className=" "
          icon={<FileClock size={24} color="#000" />}
          title="Kayıtlar"
          color="text-black"
          href="/"
        />
        <ContentButton
          className=" "
          icon={<UserRound size={24} color="#000" />}
          title="Üyeliğim"
          color="text-black"
          href="/"
        />
      </div>
    </div>
  );
}
