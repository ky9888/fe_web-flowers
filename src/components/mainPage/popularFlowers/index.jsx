"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import anh3 from "../../../../public/images/anh3.png";
import anh4 from "../../../../public/images/anh4.jpg";
import anh5 from "../../../../public/images/anh5.jpg";
import anh6 from "../../../../public/images/anh6.jpg";
import anh7 from "../../../../public/images/anh7.jpg";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PopularFlowers() {
  const router = useRouter();
  const ArrProject = [
    {
      name: "Bó Hoa Chúc Mừng HCM004",
      image: anh4,
      price: "650.000 ₫",
    },
    {
      name: "Bó Hoa Hồng Capuccino HSN025",
      image: anh5,
      price: "800.000 ₫",
    },
    {
      name: "Bó Hoa Hồng Đỏ 99 Bông HSN019",
      image: anh6,
      price: "2.200.000 ₫",
    },
    {
      name: "Bó Hoa Hồng Xanh Nhập Khẩu Ecuador HSN020",
      image: anh7,
      price: "1.500.000 ₫",
    },
  ];
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className=" mt-5 space-y-2">
        <p className="text-center text-[25px] max-custom:text-[20px] text-green-900 font-medium ">
          MẪU HOA PHỔ BIẾN
        </p>
        <div className="flex justify-center ">
          <Image src={anh3} alt="anh3" />
        </div>
        <p className="text-center font-medium text-slate-900 ">
          Tặng một bó hoa để thay cho lời nói yêu thương gửi đến những người
          thân yêu!
        </p>
        <div className="grid max-lg:grid-cols-3 max-custom:grid-cols-2 max-lg:mx-10 grid-cols-4 gap-2  mx-20 text-[14px] font-medium text-slate-800">
          {ArrProject.map((item) => (
            <div key={item.name} className="mt-6 mb-2">
              <div className="cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.name}
                  height={200}
                  width={340}
                  className="rounded-lg object-cover hover:opacity-80 transition duration-500"
                  onClick={() => {
                    const decodedString = item.name;
                    const finalString = decodedString.replace(/\s/g, "-");
                    router.push(`/san-pham/${finalString}`);
                  }}
                />
                <p
                  onClick={() => {
                    const decodedString = item.name;
                    const finalString = decodedString.replace(/\s/g, "-");
                    router.push(`/san-pham/${finalString}`);
                  }}
                  className="text-center mt-2 hover:text-green-700"
                >
                  {item.name}
                </p>
              </div>
              <p className="text-center mt-5 text-green-900">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center text-white ">
          <Link
            href={"/san-pham"}
            className="text-[16px] cursor-pointer mt-2 flex justify-center items-center pt-[1px] pb-[1px] h-full text-center font-medium bg-green-800 hover:bg-green-900 rounded-lg border-2 border-white"
          >
            <div className="flex items-center group relative  space-x-2 w-full pt-1 pb-2  px-7 transition-all duration-300 ease-in-out hover:-translate-x-2 hover:translate-y-0">
              <p>Đặt Hoa Online Hôm Nay</p>
              <p className="absolute right-0 hidden group-hover:block ">
                <MdOutlineKeyboardArrowRight />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
