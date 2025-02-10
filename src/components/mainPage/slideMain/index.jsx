"use client";
import { AiOutlineReload } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import anh1 from "../../../../public/images/anh1.jpg";
import anh2 from "../../../../public/images/anh2.jpg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
export default function SlideMain() {
  const [isLoading, setIsLoading] = useState(true);
  const imageArr = [anh2, anh1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVisibleText, setIsVisibleText] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const imageContainerRef = useRef(null);
  const btnLeft = useRef(null);
  const btnRight = useRef(null);
  const item1Ref = useRef(null);
  const item2Ref = useRef(null);

  useEffect(() => {
    const btnRightt = btnRight.current;
    const btnLeftt = btnLeft.current;
    const imageContainer = imageContainerRef.current;
    const buttonContainer = buttonRef.current;
    const item1Reff = item1Ref.current;
    const item2Reff = item2Ref.current;

    if (currentImageIndex !== 0) {
      setTimeout(() => {
        setIsVisible(true);
      }, 200);
    } else {
      setIsVisible(false);
    }

    if (currentImageIndex === 0) {
      setTimeout(() => {
        setIsVisibleText(true);
      }, 200);
    } else {
      setIsVisibleText(false);
    }

    const handleMouseEnter = () => {
      buttonContainer.style.opacity = "1";
      buttonContainer.style.visibility = "visible";
    };

    const handleMouseLeave = () => {
      buttonContainer.style.opacity = "0";
      buttonContainer.style.visibility = "hidden";
    };
    const handleItem1 = () => {
      setCurrentImageIndex(0);

      item1Reff.style.backgroundColor = "white";
      item1Reff.style.borderColor = "white";
      item2Reff.style.backgroundColor = "";
      item2Reff.style.borderColor = "";
    };
    const handleItem2 = () => {
      setCurrentImageIndex(1);

      item2Reff.style.backgroundColor = "white";
      item2Reff.style.borderColor = "white";
      item1Reff.style.backgroundColor = "";
      item1Reff.style.borderColor = "";
    };

    const clickBtnRight = () => {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % imageArr.length;

        if (newIndex === 0) {
          item1Reff.style.backgroundColor = "white";
          item2Reff.style.backgroundColor = "";
        } else {
          item2Reff.style.backgroundColor = "white";
          item1Reff.style.backgroundColor = "";
          btnRightt.style.visibility = "hidden";
          btnLeftt.style.visibility = "visible";
        }
        return newIndex;
      });
      setTimeout(() => setIsButtonDisabled(false), 500);
    };

    const clickBtnLeft = () => {
      if (isButtonDisabled) return;

      setIsButtonDisabled(true);

      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + imageArr.length) % imageArr.length;

        if (newIndex !== 0) {
          item2Reff.style.backgroundColor = "white";
          item1Reff.style.backgroundColor = "";
        } else {
          item1Reff.style.backgroundColor = "white";
          item2Reff.style.backgroundColor = "";
          btnLeftt.style.visibility = "hidden";
          btnRightt.style.visibility = "visible";
        }
        return newIndex;
      });
      setTimeout(() => setIsButtonDisabled(false), 500);
    };
    const intervalId = setInterval(() => {
      if (!isButtonDisabled) {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % imageArr.length;

          if (newIndex === 0) {
            item1Reff.style.backgroundColor = "white";
            item2Reff.style.backgroundColor = "";
          } else {
            item2Reff.style.backgroundColor = "white";
            item1Reff.style.backgroundColor = "";
            btnRightt.style.visibility = "hidden";
            btnLeftt.style.visibility = "visible";
          }
          if (newIndex !== 0) {
            item2Reff.style.backgroundColor = "white";
            item1Reff.style.backgroundColor = "";
          } else {
            item1Reff.style.backgroundColor = "white";
            item2Reff.style.backgroundColor = "";
            btnLeftt.style.visibility = "hidden";
            btnRightt.style.visibility = "visible";
          }
          return newIndex;
        });
      }
    }, 5000);

    btnRightt?.addEventListener("click", clickBtnRight);
    btnLeftt?.addEventListener("click", clickBtnLeft);
    imageContainer?.addEventListener("mouseenter", handleMouseEnter);
    imageContainer?.addEventListener("mouseleave", handleMouseLeave);
    buttonContainer?.addEventListener("mouseenter", handleMouseEnter);
    buttonContainer?.addEventListener("mouseleave", handleMouseLeave);
    item1Reff?.addEventListener("click", handleItem1);
    item2Reff?.addEventListener("click", handleItem2);

    return () => {
      clearInterval(intervalId);
      btnRightt?.removeEventListener("click", clickBtnRight);
      btnLeftt?.removeEventListener("click", clickBtnLeft);
      imageContainer?.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer?.removeEventListener("mouseleave", handleMouseLeave);
      buttonContainer?.removeEventListener("mouseenter", handleMouseEnter);
      buttonContainer?.removeEventListener("mouseleave", handleMouseLeave);
      item1Reff?.removeEventListener("click", handleItem1);
      item2Reff?.removeEventListener("click", handleItem2);
    };
  }, [isButtonDisabled, currentImageIndex]);

  return (
    <div>
      <div
        className={`fixed top-0 bg-white bottom-0
          right-0 left-0 flex justify-center items-center ${isLoading?"block":"hidden"}`}
      >
        <AiOutlineReload className="h-[10%] w-[10%] animate-spin text-green-700" />
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        onUpdate={(latest) => {
          if (latest.opacity >= 0.3) setIsLoading(false);
        }}
        className="h-[550px] max-custom:h-[170px]  max-lg:h-[310px] relative overflow-hidden "
      >
        <div className="flex w-[200%]  h-full transition-all duration-1000 ease-in-out">
          <div
            style={{ transform: `translateX(-${currentImageIndex * 50}%)` }}
            ref={imageContainerRef}
            className=" flex w-full h-full transition-transform duration-500"
          >
            {imageArr.map((image, index) => (
              <div key={index} className="w-1/2 relative h-full">
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  quality={100}
                  layout="responsive"
                  objectFit="cover"
                  className="transition duration-500"
                />
                {currentImageIndex === 0 && isVisibleText && (
                  <div className="absolute text-white max-lg:top-[15%] max-custom:top-0 max-custom:right-[10%] top-[35%] right-[15%] space-y-5 max-custom:space-y-3 cursor-pointer">
                    <p className="text-[30px] font-bold  max-lg:hidden">
                      TIỆM HOA NÀNG THƠM
                    </p>
                    <div className="font-medium">
                      <p className="text-[30px] max-custom:text-[18px] text-center hidden max-lg:block ">
                        TIỆM HOA
                      </p>
                      <p className="text-[30px] max-custom:text-[18px] text-center hidden max-lg:block leading-none">
                        NÀNG THƠM
                      </p>
                    </div>
                    <p className="font-medium text-center max-custom:text-[12px] ">
                      HOA TƯƠI MỖI NGÀY
                    </p>
                    <div className="flex justify-center hover:text-slate-700 ">
                      <div className="text-[14px] max-custom:text-[12px] flex justify-center items-center pt-[1px] pb-[1px] h-full text-center font-medium hover:bg-white rounded-lg border-2 border-white">
                        <div className="flex items-center group relative space-x-2 w-full pt-[1px] pb-[3px] px-7 max-custom:px-2 transition-all duration-300 ease-in-out hover:-translate-x-2 hover:translate-y-0">
                          <p>Đặt Hoa - 0909123456</p>
                          <p className="absolute right-0 hidden group-hover:block">
                            <MdOutlineKeyboardArrowRight />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentImageIndex !== 0 && isVisible && (
                  <div className="absolute transition-all opacity-100 duration-1000 top-0  left-[50%] -translate-x-1/2 bg-[rgba(57,91,56,0.82)] h-full rounded-full max-custom1:w-[45%] max-custom:w-[45%] w-[35%]">
                    <div className="absolute top-0  h-full w-full mt-[20%] max-lg:mt-10 max-custom:space-y-2 space-y-4 text-white">
                      <p className="text-center text-[45px] max-lg:text-[25px] max-custom:text-[12px]">
                        SHOP HOA TƯƠI
                      </p>
                      <p className="text-center text-[45px] max-lg:text-[25px] max-custom:text-[12px]">
                        NÀNG THƠM
                      </p>
                      <p className="text-center text-[18px] max-lg:text-[15px] max-custom:hidden">
                        Hoa Sinh Nhật - Hoa Chúc Mừng
                      </p>
                      <p className="text-center text-[18px] max-lg:text-[15px] max-custom:hidden">
                        Hoa Theo Yêu Cầu - Hoa Tươi Mỗi Ngày!
                      </p>
                      <div className="flex justify-center ">
                        <Link
                          href={"/san-pham"}
                          className="text-[18px] max-custom:text-[12px] max-lg:text-[15px] cursor-pointer mt-2 flex justify-center items-center pt-[1px] pb-[1px] h-full text-center font-medium hover:text-slate-700  hover:bg-white rounded-lg border-2 border-white"
                        >
                          <div className="flex items-center group relative  space-x-2 w-full pt-1 pb-2 max-custom:px-1 max-custom:py-1  px-7 transition-all duration-300 ease-in-out hover:-translate-x-2 hover:translate-y-0">
                            <p>Đặt Hoa Ngay</p>
                            <p className="absolute right-0 hidden group-hover:block ">
                              <MdOutlineKeyboardArrowRight />
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          ref={buttonRef}
          className="absolute  px-4 w-full  flex justify-between top-[50%] -translate-y-1/2 transition-all duration-500 opacity-0 visibility-hidden"
        >
          <button
            ref={btnLeft}
            className={`p-2 hover:bg-green-950   transition-all duration-500 text-white rounded-tl-xl rounded-br-xl outline outline-2 outline-slate-100 ${
              currentImageIndex === 0 ? "invisible" : "visible"
            }`}
          >
            <FaChevronLeft className="text-[16px]" />
          </button>
          <button
            ref={btnRight}
            className="p-2 hover:border-none  hover:bg-green-950 transition-all duration-500 text-white rounded-tl-xl rounded-br-xl outline outline-2 outline-slate-100"
          >
            <FaChevronRight className="text-[16px]" />
          </button>
        </div>
        <div className="absolute flex    bottom-0 right-[50%] translate-x-1/2 py-3 space-x-4">
          <div
            ref={item1Ref}
            className={`p-[5px] max-custom:p-[3px] cursor-pointer rounded-full  ${
              currentImageIndex === 0
                ? "border-2  bg-white"
                : "border-2 border-slate-400"
            }`}
          ></div>
          <div
            ref={item2Ref}
            className={`p-[5px] max-custom:p-[3px] cursor-pointer rounded-full  ${
              currentImageIndex !== 0
                ? "border-2  bg-white"
                : "border-2 border-slate-400"
            }`}
          ></div>
        </div>
      </motion.div>
    </div>
  );
}
