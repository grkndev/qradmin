
import CategoriesList from "@/components/Categories/CategoriesList";

export default function Categories() {

  return (
    <div className="m-4">
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="font-bold text-3xl">Kategori Yönetimi</h1>
        <div className="w-[75%] h-[2px] bg-content/25 rounded-full" />
      </div>
      <CategoriesList />
    </div>
  );
}
