import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const ComponentProducts = dynamic(() => import("@/components/products"), {});

export default async function Product() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/products/getAllProducts`);
  if (!res.ok) {
    notFound(); 
  }
  const datas = await res.json();
  const data = datas.data;

  return (
    <>
      <ComponentProducts data={data} />
    </>
  );
}
