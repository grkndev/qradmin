import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function ContentButton({
  icon,
  title,
  color,
  href,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("flex justify-start items-center gap-3 p-4 rounded-lg w-full", className)}
    >
      {icon}
      <span className={cn("font-semibold text-base", color)}>{title}</span>
    </Link>
  );
}
