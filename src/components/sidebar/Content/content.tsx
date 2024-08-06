"use client";
import React, { useId } from "react";
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
  const ids = useId();
  return (
    <div>
      {contents.map((content: any) => (
        <div key={ids} className="flex flex-col gap-2 my-4">
          <Label title={content.category} />
          {content.items.map((item: any) => (
            <ContentButton
              key={item.href}
              className={`${
                pathName === item.href ? "bg-cafe-200 dark:bg-cafe-950" : ""
              }`}
              icon={
                <Icon
                  name={item.icon}
                  size={24}
                  className="text-black dark:text-zinc-200"
                />
              }
              title={item.title}
              color="text-black dark:text-zinc-200"
              href={item.href}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
