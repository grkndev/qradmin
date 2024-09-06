"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
type Category = {
  categoryId: string;
  name: string;
  image: any;
  slug: string;
};

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>();
  const [editCategory, setEditCategory] = useState<Partial<Category>>();
  const getCategories = async () => {
    const { data } = await axios.get(`/api/get/categories`);
    setCategories(data.categories);
  };

  const { toast } = useToast();

  React.useEffect(() => {
    getCategories();
  }, []);

  async function handleDelete() {
    const { data } = await axios.delete(
      `/api/delete/category`,
      {
        data: {
          categoryId: editCategory?.categoryId,
        },
      }
    );
    if (data.success === false) {
      toast({
        title: "Kategori silinemedi",
        description: data.message,
        variant: "destructive",
      });
      return;
    }
    setEditCategory({});
    toast({
      title: "Kategori silindi",
      description: "Kategori",
    });
  }
  async function handleEdit() {
    toast({
      title: "Kategori güncellendi",
      description: "Kategori",
    });
  }

  const [isLoading, setIsLoading] = useState(false);
  const [dialogHasOpen, setDialogOpen] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fileSize = (newCategory?.image as File)?.size;
    //MAX FILE SIZE MUST BE 2MB
    if (fileSize && fileSize > 2 * 1024 * 1024) {
      toast({
        title: "Dosya boyutu çok büyük",
        description: "Dosya boyutu en fazla 2MB olmalıdır.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory?.name || "");
    formData.append("slug", newCategory?.slug || "");
    formData.append("image", newCategory?.image || "");
    setIsLoading(true);

    const res = await fetch(`/api/new/category`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success === false) {
      toast({
        title: "Kategori oluşturulamadı",
        description: data.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setNewCategory({});
    toast({
      title: "Kategori oluşturuldu",
      description: "Yeni kategori başarıyla oluşturuldu",
      tw: "bg-green-500 text-white",
    });
    setIsLoading(false);
    setDialogOpen(false);
  };
  return !categories ? (
    <div className="grid sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((e) => (
        <Skeleton
          key={e.toString()}
          className="w-[150px] h-[150px] rounded-rounded-2xl"
        />
      ))}
    </div>
  ) : (
    <div className="my-4 flex sm:flex-row  flex-col flex-wrap justify-start sm:justify-start  items-start">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
        <Dialog open={dialogHasOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="hover:opacity-80 transition-opacity flex flex-col w-[150px] h-[150px] justify-center items-center border-4 border-dashed border-gray-200 rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <Label className="font-semibold text-md text-center text-wrap">
                Yeni Kategori oluştur
              </Label>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[475px] outline-none">
            <DialogHeader>
              <DialogTitle>Yeni Kategori oluştur</DialogTitle>
              <DialogDescription>
                Mağazanıza yeni kategori eklemek için bilgileri doldurun ve
                kaydedin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryName" className="text-right">
                  Kategori adı<p className="inline text-red-600">*</p>
                </Label>
                <Input
                  id="categoryName"
                  required
                  onChange={(e) => {
                    setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                      slug: e.target.value
                        .toLocaleLowerCase()
                        .replace(/[\s-]+/g, "-")
                        .replace(/[ıöğüçİÖĞÜÇ]/g, function (match: string) {
                          return charMap[match];
                        }),
                    });
                  }}
                  value={newCategory?.name}
                  placeholder="Yeni Kategori"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="urlName" className="text-right">
                  Kategori dizini<p className="inline text-red-600">*</p>
                </Label>
                <Input
                  disabled
                  id="urlName"
                  required
                  value={`category/${newCategory?.slug || ""}`}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryImage" className="text-right">
                  Kategori resmi<p className="inline text-red-600">*</p>
                </Label>
                <Input
                  disabled={isLoading}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setNewCategory({
                      ...newCategory,
                      image: e.target.files[0],
                    });
                  }}
                  id="categoryImage"
                  type="file"
                  required
                  accept="image/png, image/jpeg"
                  className="col-span-3"
                />
                {newCategory?.image && (
                  <Image
                    src={URL.createObjectURL(newCategory.image)}
                    alt="Kategori resmi"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} onClick={handleSubmit} type="submit">
                {isLoading ? <IsLoading /> : <p>Oluştur</p>}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {(categories as Category[]).map((category) => (
          <Dialog key={category.categoryId}>
            <DialogTrigger asChild>
              <div
                onClick={() => {
                  setEditCategory(category);
                }}
                key={category.categoryId}
                className="cursor-pointer overflow-hidden w-[150px] h-[150px] justify-center items-center bg-cover flex  rounded-2xl"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${category.image})`,
                }}
              >
                <h2 className=" text-white  z-10 text-xl font-bold text-center">
                  {category.name}
                </h2>
                <div className="w-[150px] h-[150px]  z-1 absolute bg-gradient-to-t from-cafe-800 rounded-2xl" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[475px] outline-none">
              <DialogHeader>
                <DialogTitle>Kategori Düzenle</DialogTitle>
                <DialogDescription>
                  Mağazanıza {category.name} kategorisini düzenlemek için
                  bilgileri doldurun ve kaydedin.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Kategori adı<p className="inline text-red-600">*</p>
                  </Label>
                  <Input
                    id="categoryName"
                    required
                    onChange={(e) => {
                      setEditCategory({
                        ...editCategory,
                        name: e.target.value,
                        slug: e.target.value
                          .toLocaleLowerCase()
                          .replace(/[\s-]+/g, "-")
                          .replace(/[ıöğüçİÖĞÜÇ]/g, function (match: string) {
                            return charMap[match];
                          }),
                      });
                    }}
                    value={editCategory?.name}
                    placeholder="Yeni Kategori"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="urlName" className="text-right">
                    Kategori dizini<p className="inline text-red-600">*</p>
                  </Label>
                  <Input
                    disabled
                    id="urlName"
                    required
                    value={`category/${editCategory?.slug}`}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Label htmlFor="categoryImage" className="text-right">
                    Kategori resmi<p className="inline text-red-600">*</p>
                  </Label>
                  <Input
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setEditCategory({
                        ...editCategory,
                        image: e.target.files[0],
                      });
                    }}
                    id="categoryImage"
                    type="file"
                    required
                    accept="image/png, image/jpeg"
                    className="col-span-3"
                  />
                  {editCategory?.image && (
                    <Image
                      className=""
                      src={
                        editCategory.image instanceof File
                          ? URL.createObjectURL(editCategory.image)
                          : editCategory.image
                      }
                      alt="Kategori resmi"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading} onClick={handleEdit} type="submit">
                  {isLoading ? <IsLoading /> : <p>Kaydet</p>}
                </Button>

                <AlertDialog key={category.categoryId + "-delete"}>
                  <AlertDialogTrigger>
                    <Button className="w-full mb-2" variant={"destructive"}>
                      Sil
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Kategoriyi silmek istediğinize emin misiniz?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <b>{category.name}</b> isimli Kategori silindiğinde
                        altında bulunan <b>tüm ürünler</b> ile birlikte
                        silinecektir. <b>Bu işlem geri alınamaz.</b>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-black text-white">
                        İptal et
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete()}
                        className="bg-red-500 text-white"
                      >
                        {isLoading ? <IsLoading /> : "Evet, eminim!"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

const charMap: { [key: string]: string } = {
  ı: "i",
  ö: "o",
  ğ: "g",
  ü: "u",
  ç: "c",
  İ: "I",
  Ö: "O",
  Ğ: "G",
  Ü: "U",
  Ç: "C",
};
export function IsLoading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="animate-spin w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}
