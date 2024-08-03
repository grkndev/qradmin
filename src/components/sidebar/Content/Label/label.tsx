import React from "react";

export default function Label({ title }: { title: string }) {
  return (
    <div className="flex justify-center items-center gap-4 p-1">
      <span className="text-cafe-dark font-semibold flex-grow-0 flex-shrink-0">
        {title}
      </span>
      <div className="bg-cafe-dark/50 h-[2px] flex-grow w-full rounded-full" />
    </div>
  );
}
