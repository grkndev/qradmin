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
import VerifiedIcon from "@/components/VerifiedIcon";
import { UserType } from "@/types/User.type";
export default function User({ user }: { user: UserType }) {
  return (
    <div className="flex items-center justify-start gap-5 w-full">
      <Avatar className="w-[20vw] sm:w-[15vw] max-w-36 h-auto aspect-square rounded-3xl">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>RC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col sm:gap-y-2 gap-y-1 items-center ">
        <div className="flex gap-1 sm:gap-4 items-center justify-center">
          <h1 className="xl:text-3xl lg:text-2xl md:text-xl font-bold">{user.displayName}</h1>
          <div className="flex justify-center items-center gap-x-2">
            {user.verified && (
              <HoverCard>
                <HoverCardTrigger>
                  <VerifiedIcon className="sm:w-7 sm:h-7 w-4 h-4" />
                </HoverCardTrigger>
                <HoverCardContent>
                  Bu hesap, sistemde{" "}
                  <span className="font-bold">{user.association}</span> ile
                  ilişkili hesap olduğu için onaylı.
                </HoverCardContent>
              </HoverCard>
            )}
            {user.association && (
              <HoverCard>
                <HoverCardTrigger className="bg-cafe-400 rounded">
                  <Image
                    className="sm:w-6 sm:h-6 w-4 h-4"
                    alt="Logo"
                    src="/rabel3.fw.png"
                    width={50}
                    height={50}
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  Bu kuruluş,{" "}
                  <span className="font-bold">{user.association}</span> ile
                  ilişkili.
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
        <Link
          href={`https://${user.url}`}
          target="_blank"
          className="flex items-center justify-center gap-x-2"
        >
          <p className="text-gray-500 text-[10px] sm:text-sm">{user.url}</p>
          <Icon name="ExternalLink" className="sm:size-6 size-3" color="#6b7280 " />
        </Link>
        <Badge className="hover:bg-cafe-800 w-full text-center items-center justify-center bg-cafe-200  rounded">
          <p className="text-cafe-800 sm:text-sm text-[10px]">{user.company && `ENTERPRISE`}</p>
        </Badge>
      </div>
    </div>
  );
}
