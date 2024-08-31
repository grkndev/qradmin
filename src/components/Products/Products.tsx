import React from "react";
import { Product, columns } from "./Columns";
import { DataTable } from "./DataTable";

export default function DemoTable() {
  const [data, setData] = React.useState<Product[]>([]);
  React.useEffect(() => {
    fetch(`http://localhost:3000/api/get/products`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
