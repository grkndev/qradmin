import React from "react";
import Head from "./head";
import Content from "./Content/content";
import Footer from "./footer";
import { ModeToggle } from "../theme/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "../Icon";

export default function SideBar() {
  return (
    <div className="flex flex-col">
      <div className="sm:hidden py-6 px-6 flex flex-row items-center justify-between border-b">
        <div className="flex felx-row items-center justify-center">
          <span className="font-bold text-lg">GRKNDEV</span>
          <span className="text-lg">QR MENU</span>
        </div>
        <MobileSideBar />
      </div>
      <div className="hidden bg-[#F1F1F1] dark:bg-[#0E0E0E]   flex-col items-center justify-between h-screen px-6 py-4 sm:flex">
        <Head />
        <Content />
        <Footer />
      </div>
    </div>
  );
}

function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger className="flex">
        <Icon name="AlignJustify" size={24} />
      </SheetTrigger>
      <SheetContent side={"right"} >
        <SheetHeader>
          <SheetTitle>Yönetici Menüsü</SheetTitle>
          <SheetDescription>
            <Content />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
