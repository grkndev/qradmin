
import { Product, columns } from "./Columns";
import { DataTable } from "./DataTable";

export default function DemoTable() {
  const data: Product[] = [
    {
      name: "Classic Waffle",
      price: "150",
      image: "https://i.ibb.co/3v70CL9/928de99ecefa.jpg",
      desc: "Waffle, çilek, muz ve çikolata ile",
      createdAt: new Date(),
      productId: "1E6sL8",
      categoryName: "Waffle & Pasta",
      categoryId: "66163975addf71f703dcd9f9",
    },
    {
      name: "Makarna",
      price: "350",
      image: "https://i.ibb.co/wyrV2pr/baf2c833972c.jpg",
      desc: "1",
      createdAt: new Date(),
      productId: "Y2dPx4",
      categoryName: "Waffle & Pasta",
      categoryId: "66163975addf71f703dcd9f9",
    },
    {
      name: "Doğum günü pastası",
      price: "300",
      image: "https://i.ibb.co/FHFzdHp/d2a011fd34f4.jpg",
      desc: "Pasta",
      createdAt: new Date(),
      productId: "9QhTlW",
      categoryName: "Waffle & Pasta",
      categoryId: "66163975addf71f703dcd9f9",
    },
  ];

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
