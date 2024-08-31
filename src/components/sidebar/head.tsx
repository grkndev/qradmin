"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Head() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-row justify-center items-center py-4">
      <span className="font-bold text-2xl">GRKNDEV</span>
      <span className="text-2xl">QR MENU</span>
    </div>
  );
}
