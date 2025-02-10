"use client"
import anh12 from "../../../../public/images/anh12.jpg";
import anh13 from "../../../../public/images/anh13.jpg";
import anh14 from "../../../../public/images/anh14.jpg";
import anh15 from "../../../../public/images/anh15.jpg";
import { motion } from "framer-motion";

import Image from "next/image";
export default function Block() {
  const ArrProject = [
    {
      title: "Chào Mừng Tháng 10 – Tháng của Phụ Nữ Việt Nam 20/10",
      image: anh12,
      describe:
        "Chào Mừng Tháng 10 – Tháng của Phụ Nữ Việt Nam 20/10 Đặt hàng ngay ...",
    },
    {
      title: "Ý Nghĩa Của Hoa Tulip Tím – Màu Sắc Của Sự Thịnh Vượng",
      image: anh14,
      describe:
        "Màu tím được xem là màu sắc đẹp nhất của hoa Tulip. Đây cũng được ...",
    },
    {
      title: "Hướng Dẫn Cách Bó Hoa Sinh Nhật Đẹp Từ Hoa Hồng",
      image: anh13,
      describe:
        "Hướng dẫn cách bó bó hoa sinh nhật đẹp từ hoa hồng và các loại ...",
    },
  ];
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      id="blog"
      className="mt-[80px]"
    >
      <div className=" mt-5 space-y-2">
        <p className="text-center text-[35px] text-green-900  tracking-[3px]">
          Blog
        </p>
        <div className="flex justify-center my-2">
          <p className="h-[1px]  w-[4%] bg-black"></p>
        </div>

        <div className="grid grid-cols-3 max-lg:block  max-lg:mx-10  gap-7  mx-20  font-medium text-slate-800">
          {ArrProject.map((item) => (
            <div key={item.title} className="mt-6 max-lg:mt-10 mb-2">
              <div className="cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  quality={100}
                  className="rounded-lg h-[250px] max-custom:h-[300px] max-lg:h-[400px] w-full object-cover object-center"
                />
                <p className="text-center px-3  text-[17px]  mt-2 hover:text-green-700">
                  {item.title}
                </p>
                <div className="flex justify-center my-2">
                  <p className="h-[2px]  w-[10%] bg-black"></p>
                </div>
              </div>
              <p className="text-center text-[14px] px-4  text-green-900">
                {item.describe}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex max-lg:block mx-20 space-x-10 max-lg:space-x-0 max-lg:mx-5  items-center mt-[100px] ">
        <div className=" w-1/2 max-lg:w-full max-lg:items-center">
          <Image src={anh15} alt="anh15" className="rounded-xl " />
        </div>
        <div className="w-1/2 max-lg:w-full font-medium list-outside max-lg:pr-5">
          <p className="text-[30px]">Tiệm Hoa Nàng Thơm</p>
          <p className="text-[22px] my-4">Gói Yêu Thương Trao Cảm Xúc</p>
          <p className="text-slate-900">
            Mỗi bông hoa là một câu chuyện, mỗi đóa hồng là một lời thì thầm.
            Tại Tiệm hoa Nàng Thơm, chúng tôi không chỉ bán hoa, mà còn trao gửi
            những cảm xúc chân thành nhất.
          </p>
          <ul className="list-disc text-slate-900 pl-6 space-y-3 ">
            <li className="">
              <span className="font-bold text-black">Gói trọn yêu thương</span>:
              Với mỗi bó hoa, chúng tôi gửi gắm tâm tình của bạn đến người thân
              yêu. Dù là lời chúc mừng, lời xin lỗi hay đơn giản chỉ là một lời
              cảm ơn, hoa của Nàng Thơm đều mang theo thông điệp ý nghĩa.
            </li>
            <li>
              <span className="font-bold text-black">
                Tạo nên những khoảnh khắc đáng nhớ
              </span>
              : Sinh nhật, kỷ niệm, cầu hôn… Mỗi dịp đặc biệt đều trở nên ý
              nghĩa hơn khi có sự hiện diện của những bông hoa tươi tắn.
            </li>
            <li>
              <span className="font-bold text-black">Hoa tươi mỗi ngày</span>:
              Chúng tôi cam kết mang đến cho bạn những bông hoa tươi tốt nhất,
              đảm bảo chất lượng và độ bền.
            </li>
          </ul>
          <p className="text-slate-900 mt-4">
            Hãy để Nàng Thơm giúp bạn bày tỏ tình cảm một cách trọn vẹn nhất!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
