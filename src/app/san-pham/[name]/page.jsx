import ProductsID from "@/components/products/productsID";
export const revalidate = 60
export const dynamicParams = true
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/api/products/getAllProducts`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products list");
  }

  const ress = await res.json();
  const products = ress.data;

  const mappedProducts = products.slice(0, 5).map((product) => ({
    name: product.name,
  }));
  
   
  return mappedProducts;
}

export async function generateMetadata({ params }) {
  const { name } = params;
  const decoded = decodeURIComponent(name).replace(/-/g, " ");

  const revertedString = name.replace(/-/g, " ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/api/products/getDetailProducts/${revertedString}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product metadata");
  }

  const ress = await res.json();
  const data = ress.data;

  return {
    title:  decoded,
    description: data.description || "Product details",
  };
}

export default async function ProductPage({ params }) {
  const { name } = params;
  const revertedString = name.replace(/-/g, " ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/api/products/getDetailProducts/${revertedString}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  const ress = await res.json();
  const data = ress.data;

  return (
    <>
      <ProductsID data={data} />
    </>
  );
}
