import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, world!</h1>
      <Image src="/logo.svg" alt="Logo" width="100" height="100" />
    </div>
  );
}
