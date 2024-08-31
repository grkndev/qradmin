import CategoriesList from "@/components/Categories/CategoriesList";
import React from "react";

export default async function Categories() {
  const res = await fetch(`http://localhost:3000/api/get/categories`, {
    cache: "no-store",
  });
  const { categories } = await res.json();
  return (
    <div className="m-4">
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="font-bold text-3xl">Kategori Yönetimi</h1>
        <div className="w-[75%] h-[2px] bg-content/25 rounded-full" />
      </div>
      <CategoriesList categories={categories} />
    </div>
  );
}
