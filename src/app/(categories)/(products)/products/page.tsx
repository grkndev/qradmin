"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { IsLoading } from "@/components/Categories/CategoriesList";
import DemoTable from "@/components/Products/Products";
import { PopoverClose } from "@radix-ui/react-popover";
import { set } from "mongoose";

export default function ProductsSettings() {
  const [categories, setCategories] = useState<Category[]>([]);
  React.useEffect(() => {
    fetch(`http://localhost:3000/api/get/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  return (
    <div className="p-8 w-full h-full">
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="font-bold text-3xl">Ürün Yönetimi</h1>
        <div className="w-full h-[2px] bg-zinc-200 rounded-full" />
      </div>
      <div className="w-full my-4">
        <Dialog>
          <DialogTrigger className="" asChild>
            <Button className="">Yeni ürün ekle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni ürün ekle</DialogTitle>
              {/* DialogDescription must be 'div'  */}
              <DialogDescription asChild>
                <NewProductAdd categories={categories} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full">
        <DemoTable />
      </div>
    </div>
  );
}
export type Product = {
  name: string;
  price: string;
  image: File;
  desc: string;
  parent: string;
};

export type Category = { name: string; slug: string };
function NewProductAdd({ categories }: { categories: any }) {
  const { toast } = useToast();
  const [product, setProduct] = useState<Partial<Product>>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const [filtredCategory, setFiltredCategory] =
    useState<Category[]>(categories);

  async function newProduct() {
    if (
      !product ||
      !product.name ||
      !product.price ||
      !product.desc ||
      !product.image
    ) {
      toast({
        title: "Ürün eklenemedi",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.desc);
    formData.append("image", product.image);
    formData.append("parent", selectedCategory.slug);

    setIsLoading(true);
    const res = await fetch(`http://localhost:3000/api/new/product`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setIsLoading(false);
    if (!data.success) {
      toast({
        title: "Ürün eklenemedi",
        description: data.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Ürün başarıyla eklendi",
      description: "Yeni ürün kaydedildi.",
    });
    setProduct({});
    setOpen(false);
    setSelectedCategory(categories[0]);
  }
  const [open, setOpen] = useState(false);
  return (
    <div className=" w-full ">
      <div className="flex flex-col sm:flex-row gap-2 gap-x-16">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-y-1">
            <span>Ürün adı</span>
            <Input
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Ürün adı"
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <span>
              Ürün Açıklaması{" "}
              <span className="text-[10px] text-zinc-500">
                ({product?.desc?.length || 0} / 120)
              </span>
            </span>
            <Textarea
              maxLength={120}
              value={product?.desc}
              onChange={(e) => setProduct({ ...product, desc: e.target.value })}
              placeholder="Ürün Açıklaması"
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <p>Ürün Fiyatı</p>
            <div className="flex items-center w-full">
              <Input
                type="number"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                placeholder="Ürün Fiyatı"
                className="w-full text-right"
              />
              <span className="ml-1">TL</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <span>Ürün Kategorisi</span>
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
                      categories?.filter((x: any) =>
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
        </div>
        <div className=" flex flex-col ">
          <p className="text-sm mb-2">Ürün Görseli</p>
          <div className="flex flex-col w-full h-1/3 justify-between items-center gap-x-3">
            {product?.image && (
              <Image
                alt="Ürün resmi"
                width={100}
                height={100}
                src={URL.createObjectURL(product.image)}
                className="h-16 aspect-square bg-zinc-200 p-2 bg-cover bg-no-repeat rounded-md"
              />
            )}
            <label
              htmlFor="dropzone-file"
              className="bg-[#c4c4c4] w-full p-2 rounded-md text-black mt-2"
            >
              <input
                id="dropzone-file"
                disabled={isLoading}
                accept="image/png, image/jpeg"
                type="file"
                onChange={(e) => {
                  if (!e.target.files || !e.target.files[0]) return;

                  setProduct({ ...product, image: e.target.files[0] });
                }}
                className="hidden"
              />
              <span>Resim Seç</span>
            </label>
          </div>
        </div>
      </div>
      <div>
        <Button
          className="w-full mt-4 disabled:opacity-50"
          disabled={isLoading}
          onClick={() => {
            newProduct();
          }}
        >
          {isLoading ? <IsLoading /> : <span>Oluştur</span>}
        </Button>
      </div>
    </div>
  );
}
