import React from "react";
import Head from "./head";
import Content from "./Content/content";
import Footer from "./footer";
import { ModeToggle } from "../theme/ThemeToggle";

export default function SideBar() {
  return (
    <div className="bg-[#F1F1F1] dark:bg-[#0E0E0E]  flex flex-col items-center justify-between h-screen px-6 py-4">
      <Head />
      <Content />
      <Footer />
      <ModeToggle />
    </div>
  );
}
