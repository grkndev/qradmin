"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Head() {
  const { theme } = useTheme();
 
  return (
    <div className="flex flex-row justify-center items-center">
      <div>
        <Image
          className="w-20 h-20"
          height={500}
          width={500}
          src={`/rabel${theme === "dark" ? '2' : '3'}.fw.png`}
          alt="Logo"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">GRKN SOFT</h1>
        <p className="font-semibold">QR MENU SCRIPTS</p>
      </div>
    </div>
  );
}
