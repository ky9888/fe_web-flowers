"use client";
import { useEffect, useState } from "react";
import ProductsID from "@/components/products/productsID";
import { AiOutlineReload } from "react-icons/ai";
export default function Home({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
   
    const resolveParams = async () => {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    };

    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;

    const revertedString = params.name.replace(/-/g, " ");

    const fetchData = async () => {
    
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/api/products/getDetailProducts/${revertedString}`
        );

        if (!res.ok) {
          throw new Error("Product not found or invalid product ID.");
        }

        const ress = await res.json();
        setData(ress.data);
      
    };

    fetchData();
  }, [params]);

  if (!data) {
    return <div
          className="fixed top-0 bg-white bottom-0
        right-0 left-0 flex justify-center items-center "
        >
          <AiOutlineReload className="h-[10%] w-[10%] animate-spin text-green-700"  />
        </div>;
  }

  return (
    <>
      <ProductsID data={data} />
    </>
  );
}
