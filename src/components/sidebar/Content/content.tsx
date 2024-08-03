"use client";
import React from "react";
import ContentButton from "./Button/button";
import Label from "./Label/label";
import Icon from "@/components/Icon";
import contents from "./contents";
import { usePathname } from "next/navigation";

export default function Content() {
  return (
    <div className="w-full flex flex-col gap-9">
      <Contents />
    </div>
  );
}
function Contents() {
  const pathName = usePathname();
  return (
    <div>
      {contents.map((content: any) => (
        <div className="flex flex-col gap-1 my-4">
          <Label title={content.category} />
          {content.items.map((item: any) => (
            <ContentButton
              className={`${pathName === item.href ? "bg-cafe-200" : ""}`}
              icon={<Icon name={item.icon} size={24} color="#000" />}
              title={item.title}
              color="text-black"
              href={item.href}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
