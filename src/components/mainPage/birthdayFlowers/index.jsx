"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import anh3 from "../../../../public/images/anh3.png";
import anh8 from "../../../../public/images/anh8.jpg";
import anh9 from "../../../../public/images/anh9.jpg";
import anh10 from "../../../../public/images/anh10.jpg";
import anh11 from "../../../../public/images/anh11.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
export default function BirthdayFlowers() {
  const router = useRouter();
  const ArrProject = [
    {
      name: "Bó Hoa Cẩm Tú Cầu HSN030",
      image: anh8,
      price: "2.500.000 ₫",
    },
    {
      name: "Bó Hoa Cẩm Tú Cầu HSN012",
      image: anh9,
      price: "950.000 ₫",
    },
    {
      name: "Bình Hoa Hồng Cao Cấp 01",
      image: anh10,
      price: "3.900.000 ₫",
    },
    {
      name: "Bó Hoa Cẩm Tú Cầu Xanh Dương HSN027",
      image: anh11,
      price: "1.800.000 ₫",
    },
  ];
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-[100px]"
    >
      <div className=" mt-5 space-y-1">
        <p className="text-center text-[25px] text-green-900 font-medium ">
          HOA SINH NHẬT
        </p>
        <div className="flex justify-center">
          <Image src={anh3} alt="anh3" />
        </div>
        <p className="text-center font-medium text-slate-900 ">
          Muốn gửi tặng món quà sinh nhật thật ý nghĩa? Tiệm hoa sẽ giúp bạn
          truyền tải trọn vẹn yêu thương
        </p>
        <div className="grid grid-cols-4 max-custom:grid-cols-2 gap-2 max-lg:grid-cols-3 max-lg:mx-10  mx-20 text-[14px] font-medium text-slate-800">
          {ArrProject.map((item) => (
            <div key={item.name} className="mt-8 mb-2">
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
        <div className="flex justify-center text-green-900 ">
          <Link
            href={"/danh-muc/hoa-sinh-nhat"}
            className="text-[16px] group  cursor-pointer mt-2 items-center pt-[1px] pb-[1px] h-full text-center font-medium  transition-all duration-300 ease-in-out hover:-translate-x-2 hover:translate-y-0 rounded-lg border-2 border-white"
          >
            <div className="flex items-center group relative space-x-2 w-full pt-1 pb-2 px-7">
              <p>Xem thêm</p>
              <p className="absolute right-0 hidden group-hover:block">
                <MdOutlineKeyboardArrowRight />
              </p>
            </div>
            <div className="flex justify-center ">
              <p className="bg-slate-400 h-[2px] group-hover:bg-green-800 group-hover:ml-5 w-[50%] transition-all duration-300 ease-in-out group-hover:w-[95%]"></p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
