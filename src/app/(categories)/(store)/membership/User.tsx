import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
export default function User() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Avatar className="w-52 h-52 rounded-3xl">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>RC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-4 items-center justify-center">
          <h1 className="text-5xl font-bold">RABEL CAFE</h1>
          <div className="flex justify-center items-center gap-x-2">
            <HoverCard>
              <HoverCardTrigger>
                <Icon name="BadgeCheck" size={36} color="#000" />
              </HoverCardTrigger>
              <HoverCardContent>
                Bu hesap, sistemde <span className="font-bold">@GRKNSOFT</span>{" "}
                ile ilişkili hesap olduğu için onaylı.
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger className="bg-cafe-400 rounded">
                <Image
                  className="w-10 h-10"
                  alt="Logo"
                  src="/rabel3.fw.png"
                  width={50}
                  height={50}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                Bu kuruluş, <span className="font-bold">GRKNSOFT</span> ile
                ilişkili.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <Link
          href={"https://demoqr.grkn.dev"}
          target="_blank"
          className="flex items-center justify-center gap-x-2"
        >
          <p className="text-gray-500">demoqr.grkn.dev</p>
          <Icon name="ExternalLink" size={24} color="#6b7280 " />
        </Link>
        <Badge className="w-full text-center items-center justify-center bg-cafe-800 rounded">
          <p className="text-white text-sm">ENTERPRISE</p>
        </Badge>
      </div>
    </div>
  );
}
