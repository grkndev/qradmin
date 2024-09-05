import React from "react";
import { Product, columns } from "./Columns";
import { DataTable } from "./DataTable";
import axios from "axios";

export default function DemoTable() {
  const [data, setData] = React.useState<Product[]>([]);
  React.useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const { data } = await axios.get(`/api/get/products`, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
    setData(data.data);
  };

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
