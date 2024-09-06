"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon, Edit } from "lucide-react";
import React from "react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Category } from "@/app/(categories)/(products)/products/page";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IsLoading } from "../Categories/CategoriesList";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "./Columns";
import Icon from "../Icon";
import axios from "axios";

export default function Proccess({ product }: { product: Product }) {
  const { toast } = useToast();
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [filtredCategory, setFiltredCategory] = useState<Category[]>();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  React.useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const { data } = await axios.get(`/api/get/categories`);
    setCategories(data.categories);
  };

  function handleDelete() {
    toast({
      title: "Başarılı",
      description: "Ürün başarıyla silindi",
    });
  }
  async function handleEdit() {
    toast({
      title: "Başarılı",
      description: "Ürün güncellendi",
    });
  }

  const EditDialog = () => {
    return (
      <Dialog key={product.productId}>
        <DialogTrigger asChild>
          <Button
            className="w-full"
            onClick={() => {
              setEditedProduct(product);
              setSelectedCategory({
                slug: product.parent,
                name: product.categoryName,
              });
            }}
          >
            <Icon name="Pencil" className="size-4" />
            <span className="ml-1">Düzenle</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px] outline-none">
          <DialogHeader>
            <DialogTitle>Ürünü Düzenle</DialogTitle>
            <DialogDescription>
              Mağazanıza {product.name} ürününü düzenlemek için bilgileri
              doldurun ve kaydedin.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Ürün adı<p className="inline text-red-600">*</p>
              </Label>
              <Input
                id="productName"
                required
                onChange={(e) => {
                  setEditedProduct({
                    ...editedProduct,
                    name: e.target.value,
                  });
                }}
                value={editedProduct?.name}
                placeholder="Yeni Ürün"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productPrice" className="text-right">
                Ürün Fiyatı<p className="inline text-red-600">*</p>
              </Label>
              <Input
                id="productPrice"
                required
                type="number"
                onChange={(e) => {
                  setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                  });
                }}
                value={editedProduct?.price}
                placeholder="Ürün fiyatı"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productPrice" className="text-right">
                Ürün Açıklaması<p className="inline text-red-600">*</p>
              </Label>
              <Textarea
                id="productPrice"
                required
                onChange={(e) => {
                  setEditedProduct({
                    ...editedProduct,
                    desc: e.target.value,
                  });
                }}
                value={editedProduct?.desc}
                placeholder="Ürün açıklaması"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="urlName" className="text-right">
                Ürün Kategorisi<p className="inline text-red-600">*</p>
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedCategory ? selectedCategory.name : "Kategori seç"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <Input
                    placeholder="Search category"
                    className="mb-2"
                    onChange={(e) => {
                      setFiltredCategory(
                        categories?.filter((x) =>
                          x.name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        ) || []
                      );
                    }}
                  />
                  {filtredCategory?.map((category) => (
                    <Label
                      className="hover:bg-zinc-200 w-full flex p-2 rounded"
                      key={category.slug}
                      // value={framework.value}
                      onClick={() => {
                        setSelectedCategory(category);
                        setOpen(false);
                      }}
                    >
                      {category.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCategory?.slug === category.slug
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </Label>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label htmlFor="categoryImage" className="text-right">
                Ürün resmi<p className="inline text-red-600">*</p>
              </Label>
              <Input
                onChange={(e) => {
                  if (!e.target.files) return;
                  setEditedProduct({
                    ...editedProduct,
                    image: e.target.files[0],
                  });
                }}
                id="categoryImage"
                type="file"
                required
                accept="image/png, image/jpeg"
                className="col-span-3"
              />
              {editedProduct?.image && (
                <Image
                  className=""
                  src={
                    editedProduct.image instanceof File
                      ? URL.createObjectURL(editedProduct.image)
                      : editedProduct.image
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  const DeleteDialog = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="w-full">
            <Icon name="Trash2" className="size-4" />
            <span className="ml-1">Sil</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Silmek istediğinize emin misiniz?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu silme işlemi geri döndürülemez. Ürün kalıcı olarak
              silinecektir. İşleme devam etmek istiyormusunuz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal et</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500">
              Evet, eminim!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <Popover>
      <PopoverTrigger className="bg-zinc-200 p-2 rounded">
        <Icon name="Ellipsis" className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-2 items-center justify-center w-fit">
        <EditDialog />
        <DeleteDialog />
      </PopoverContent>
    </Popover>
  );
  return (
    <div className="flex gap-x-2">
      {/* edit */}
      <EditDialog />

      {/* delete */}
      <DeleteDialog />
    </div>
  );
}
