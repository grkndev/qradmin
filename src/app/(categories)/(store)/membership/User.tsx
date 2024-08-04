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
    <div className="flex items-center justify-center gap-5">
      <Avatar className="w-52 h-52 rounded-3xl">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>RC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-4 items-center justify-center">
          <h1 className="text-5xl font-bold">{user.displayName}</h1>
          <div className="flex justify-center items-center gap-x-2">
            {user.verified && (
              <HoverCard>
                <HoverCardTrigger>
                  <VerifiedIcon className="w-9 h-9" />
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
                    className="w-7 h-7"
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
          <p className="text-gray-500">{user.url}</p>
          <Icon name="ExternalLink" size={24} color="#6b7280 " />
        </Link>
        <Badge className="w-full text-center items-center justify-center bg-cafe-800 rounded">
          <p className="text-white text-sm">{user.company && `ENTERPRISE`}</p>
        </Badge>
      </div>
    </div>
  );
}
