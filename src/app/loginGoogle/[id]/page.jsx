"use client";
import { AiOutlineReload } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from "@/components/hook/useCart";
import { useEffect } from "react";
import React from "react";

export default function Home({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { id } = params;
  const { setGetUserId } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL_API}/api/auth/login-success/${id}`
        );
        const user = response.data.user;
        setGetUserId(user); 
        localStorage.setItem("accessToken", response.data.accessToken);
         router.push("/"); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, []);

  return (
    <div
      className="fixed top-0 bg-white bottom-0
    right-0 left-0 flex justify-center items-center "
    >
      <AiOutlineReload className="h-[10%] w-[10%] animate-spin text-green-700"  />
    </div>
  ); 
}
