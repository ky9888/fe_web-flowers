import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const PriceProducts = dynamic(() => import("@/components/priceProducts"), {});

export default async function Product() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/products/getHighestPrice`);

  if (!res.ok) {
    notFound();
  }

  const datas = await res.json();
  const data = datas.data;

  const formattedData = data
    .map((product) => {
      const formattedPrice = parseFloat(
        product.price.trim().replace(/\./g, "")
      );
      return {
        ...product,
        price: formattedPrice,
      };
    })
    .sort((a, b) => b.price - a.price);

  return (
    <>
      <PriceProducts data={formattedData} />
    </>
  );
}
