"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const openUseRef = useRef(null);
  const blackUseRef = useRef(null);
  const searchRef = useRef(null);
  const resulfRef = useRef(null);
  const itemRef = useRef([]);
  const inputRef = useRef(null);
  const [input, setInPut] = useState(null);
  const debounceTimeoutRef = useRef(null);
  const router = useRouter();
 
 
  const fetchData = useCallback(async (value) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_API}/api/products/getAllProducts/?name=${value}`
      );
      const resultt = response.data.data;
      setResult(resultt);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  const handleInput = useCallback((value) => {
    setInPut(value);
    setResult(null);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchData(value);
    }, 1000);
  }, []);

  const filteredResults = useMemo(() => {
    return result?.filter((item) => item);
  }, [result]);

  useEffect(() => {
    const handleClickOutside = () => {
      const open = openUseRef.current;
      const black = blackUseRef.current;
      const search = searchRef.current;
      const result = resulfRef.current;

      if (
        open &&
        black &&
        search &&
        result &&
        !result.contains(event.target) &&
        !search.contains(event.target) &&
        !open.contains(event.target)
      ) {
        setIsOpen(false);
        resetBlackOverlay();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetBlackOverlay = () => {
    const black = blackUseRef.current;
    if (black) {
      setIsOpen(false);
      black.style.position = "";
      black.style.top = "";
      black.style.left = "";
      black.style.width = "";
      black.style.height = "";
      black.style.backgroundColor = "";
      black.style.zIndex = "";
    }
  };
  const handleItemClick = (item, index) => {
    const decodedString = item.name;
    const finalString = decodedString.replace(/\s/g, "-");
    router.push(`/san-pham/${finalString}`);
    setIsOpen(false);
    resetBlackOverlay();
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (inputRef.current) {
      inputRef.current.focus();  
    }
    if (!isOpen) {
      const black = blackUseRef.current;
      if (black) {
        black.style.position = "fixed";
        black.style.top = "0";
        black.style.left = "0";
        black.style.width = "100vw";
        black.style.height = "100vh";
        black.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        black.style.zIndex = "30";
        black.style.transition =
          "background-color 0.3s ease, opacity 0.5s ease";
      }
    } else {
      resetBlackOverlay();
    }
  };
  return (
    <div>
      <div ref={blackUseRef}></div>
      <div
        onClick={handleToggleDropdown}
        ref={openUseRef}
        className=" hover:cursor-pointer"
      >
        <IoSearch className="text-[26px] max-custom:text-[20px]" />
      </div>

      <div
        className={`fixed w-full h-[200px] left-0 justify-center items-center z-40 text-[25px] flex text-white transition-transform duration-700 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[200%]"
        }`}
      >
        <div
          className={`w-[40%] max-lg:w-[60%] max-custom:w-[70%] max-lg:text-[18px] relative  ${
            result?.length >= 0 ? "top-[82%]" : "top-[-18%]"
          }   rounded-lg  `}
        >
          <div
            ref={searchRef}
            className={`flex relative items-center  rounded-lg transition-transform duration-500 `}
          >
            <input
              ref={inputRef}
              className=" bg-slate-600/50 outline-none rounded-l-lg py-2 h-full pl-4 w-[90%] text-white font-mediy-2  placeholder-white"
              type="text"
              placeholder="Nhập hoa bạn cần tìm"
              value={input || ""}
              onChange={(e) => handleInput(e.target.value)}
            />

            <p className="flex absolute w-[10%] right-0 justify-center h-full bg-slate-600/50 py-[14px] rounded-r-lg ">
              {!input || (input && result?.length >= 0) ? (
                <FaSearch />
              ) : (
                <RiLoader2Line className="animate-spin " />
              )}
            </p>
          </div>
          <div
            ref={resulfRef}
            className={`absulote max-custom:text-[13px]  overflow-auto h-[400px] ${
              result?.length >= 0 ? "block" : "hidden"
            } `}
          >
            {filteredResults &&
              filteredResults.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleItemClick(item, index)}
                    ref={(el) => (itemRef.current[index] = el)}
                    className=" px-2 flex items-center  py-4 hover:bg-black/10 cursor-pointer"
                  >
                    <div className="w-[8%] ">
                      <Image
                        src={item.image1}
                        alt={item.name}
                        height={100}
                        width={50}
                        quality={100}
                        className="rounded-lg w-[90%] max-custom:h-[25px] h-[40px] object-cover object-center"
                      />
                    </div>
                    <p className="w-[60%] text-start ml-2">{item.name}</p>

                    <p className="w-[32%]  flex items-center justify-end font-medium">
                      {item.price} ₫
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
