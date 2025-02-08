"use client";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/idSlide.css";

export default function ProductsIDslide({ data }) {
  const router = useRouter();
  const settings = {
    focusOnSelect: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3, 
        },
      },
      {
        breakpoint: 550, 
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 2, 
        },
      },
    ],
  };

  return (
    <div className="relative mx-20 max-lg:mx-1 overflow-hidden  mb-20 ">
  
      <div className="overflow-hidden ">
        <Slider {...settings}>
          {data.map((item) => (
            <div
              key={item.name}
              className="px-2 hover:opacity-80 transition duration-500" // Thêm khoảng cách giữa các sản phẩm
            >
              <div className="cursor-pointer ">
                <Image
                  src={item.image1}
                  alt={item.name}
                  height={200}
                  width={340}
                  className="rounded-lg"
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
        </Slider>
      </div>
    </div>
  );
}
