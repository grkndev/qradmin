"use client";
import React from "react";
import { Avatar } from "../ui/avatar";
import { ChevronUp, LogOut, Plus } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Footer() {
  const [isOpened, setOpen] = React.useState(false);
  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="h-16 gap-x-4 flex items-center justify-between w-full px-4 py-2 border-t border-darkcafe-gray rounded"
        asChild
      >
        <button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-bold text-sm">RABEL CAFE</h1>
            <p className="text-[12px]">admin@rabel.grkn.dev</p>
          </div>
          <ChevronUp
            size={16}
            className={`dark:text-white text-dark transform transition-all ${
              isOpened ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="shadow-none gap-2 flex flex-col items-center justify-between w-full px-4 py-2 bg-cafe-gray dark:bg-darkCafe-gray rounded">
        <DropdownMenuLabel>Hesaplarım</DropdownMenuLabel>
        <DropdownUser />
        <div className="h-[1px] w-full dark:bg-darkCafe-dark/50 bg-cafe-dark/50 rounded-full" />
        <AddNew />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownUser() {
  return (
    <DropdownMenuItem className="w-full gap-x-2 px-5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-bold text-sm">RABEL CAFE</h1>
        <p className="text-[12px]">admin@rabel.grkn.dev</p>
      </div>
    </DropdownMenuItem>
  );
}
function Logout() {
  return (
    <DropdownMenuItem className="w-full gap-x-3  rounded px-5">
      <div className="w-10 h-10 bg-[#EA9F9F] rounded-full justify-center items-center flex">
        <LogOut size={18} color="#000" />
      </div>
      <div>
        <h1 className="font-semibold text-sm">Çıkış Yap</h1>
      </div>
    </DropdownMenuItem>
  );
}
function AddNew() {
  return (
    <DropdownMenuItem className="w-full gap-x-3  rounded px-5">
      <div className="w-10 h-10 bg-cafe-300 rounded-full justify-center items-center flex">
        <Plus size={18} color="#000" />
      </div>
      <div>
        <h1 className="font-semibold text-sm">Yeni Hesap Ekle</h1>
      </div>
    </DropdownMenuItem>
  );
}
