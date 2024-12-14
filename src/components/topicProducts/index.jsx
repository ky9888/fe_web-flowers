"use client";
import { BiChevronsRight } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopicProducts({ data }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const topic = data[0].topic;

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <div className="bg-gray-200 flex max-lg:block items-center max-lg:space-y-3 justify-between px-[5%] py-2">
        <div className="space-y-2 ">
          <p className="font-medium text-[25px] max-lg:text-center">Sản Phẩm</p>
          <p className="flex items-center text-[12px] space-x-2 justify-center ">
            <span>Trang chủ</span>
            <span className="text-slate-500 pt-1">
              <BiChevronsRight />
            </span>
            <span className=" ">Sản Phẩm</span>
            <span className="text-slate-500 pt-1">
              <BiChevronsRight />
            </span>
            <span className="font-bold">{topic}</span>
           
          </p>
        </div>
        <div className="flex space-x-11 items-center justify-center">
          <p className="text-[18px] max-lg:hidden">Hiển thị {data.length} kết quả</p>
          <select
            defaultValue="1"
            className="outline-none px-1 py-[6px] bg-gray-100 hover:bg-white rounded-full text-[16px]"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "2") {
                router.push("/san-pham/gia-thap");
              } else if (value === "3") {
                router.push("/san-pham/gia-cao");
              }
            }}
          >
            <option value="1">Thứ tự mặc định</option>
            <option value="2">Thứ tự theo giá: thấp đến cao</option>
            <option value="3">Thứ tự theo giá: cao xuống thấp</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-lg:mx-5 max-custom:grid-cols-2 gap-6 mx-20 text-[14px] font-medium text-slate-800">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className={`mt-6 mb-2 card ${loading ? "skeleton" : ""}`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    const decodedString = item.name;
                    const finalString = decodedString.replace(/\s/g, "-");
                    router.push(`/san-pham/${finalString}`);
                  }}
                >
                  <div
                    className={`transition-opacity duration-800 skeleton1 ease-in-out `}
                  >
                    <Image
                      src={item.image1}
                      alt={item.name}
                      height={200}
                      width={340}
                      className="rounded-xl object-cover hover:opacity-80 transition duration-500"
                    />
                  </div>
                  <p className="text-center mt-2 hover:text-green-700 skeleton2">
                    {item.name}
                  </p>
                </div>
                <p className="text-center mt-5 text-green-900 skeleton3">
                  {item.price} ₫
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
