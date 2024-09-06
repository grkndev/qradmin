import React from "react";
import { Product, columns } from "./Columns";
import { DataTable } from "./DataTable";
import axios from "axios";
import { Category } from "@/app/(categories)/(products)/products/page";

export default function DemoTable() {
  const [data, setData] = React.useState<Product[]>([]);
  React.useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const { data } = await axios.get(`/api/get/products`);
    setData(data.data);
  };

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
