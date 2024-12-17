import ProductsID from "@/components/products/productsID";

export default async function Home({ params }) {
  const { name } = params;
  const revertedString = name.replace(/-/g, " ");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/api/products/getDetailProducts/${revertedString}`
    );

    if (!res.ok) {
      return <div>Please enter a valid product ID or product not found.</div>;
    }

    const ress = await res.json();
    const data = ress.data;

    return (
      <>
        <ProductsID data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
}
