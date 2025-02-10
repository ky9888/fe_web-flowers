"use client";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { SlArrowDown } from "react-icons/sl";
import Search from "../search";
import { LuShoppingCart } from "react-icons/lu";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useCart } from "../hook/useCart";
import Auth from "../auth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { motion } from "framer-motion";
export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpenSN, setIsOpenSN] = useState(false);
  const [isOpenCM, setIsOpenCM] = useState(false);
  const [isOpenCD, setIsOpenCD] = useState(false);
  const [isOpenTK, setIsOpenTK] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenScroll, setIsOpenScroll] = useState(false);
  const { cartTotalQty } = useCart();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const router = useRouter(null);
  const blackUseRef = useRef(null);
  const loginScrollRef = useRef(null);
  const loginRef = useRef(null);
  const blackScrollRef = useRef(null);

  const handleIsOpen = () => {
    document.body.style.overflow = "auto";
    setIsOpen(false);
    resetBlackOverlay();
  };
  const handleIsOpenScroll = () => {
    document.body.style.overflow = "auto";
    setIsOpenScroll(false);
    resetBlackOverlayScroll();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const black = blackUseRef.current;
      const login = loginRef.current;

      if (black && login && !login.contains(event.target)) {
        resetBlackOverlay();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsidede = (event) => {
      const black = blackScrollRef.current;
      const login = loginScrollRef.current;

      if (black && login && !login.contains(event.target)) {
        resetBlackOverlayScroll();
      }
    };

    document.addEventListener("mousedown", handleClickOutsidede);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidede);
    };
  }, []);
  const handleClick = (item) => {
    router.push(item);
    resetBlackOverlay();
  };
  const handleClickScroll = (item) => {
    router.push(item);
    resetBlackOverlayScroll();
  };

  const resetBlackOverlay = () => {
    document.body.style.overflow = "auto";
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
  const resetBlackOverlayScroll = () => {
    document.body.style.overflow = "auto";
    const black = blackScrollRef.current;
    if (black) {
      setIsOpenScroll(false);
      black.style.position = "";
      black.style.top = "";
      black.style.left = "";
      black.style.width = "";
      black.style.height = "";
      black.style.backgroundColor = "";
      black.style.zIndex = "";
    }
  };

  const handleToggleDropdown = () => {
    document.body.style.overflow = "hidden";

    if (!isOpen) {
      const black = blackUseRef.current;
      if (black) {
        black.style.position = "fixed";
        black.style.top = "0";
        black.style.left = "0";
        black.style.width = "100vw";
        black.style.height = "100vh";
        black.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        black.style.zIndex = "20";
      }
    } else {
      resetBlackOverlay();
    }
    setIsOpen(true);
  };
  const handleToggleDropdownScroll = () => {
    document.body.style.overflow = "hidden";

    if (!isOpenScroll) {
      const black = blackScrollRef.current;
      if (black) {
        black.style.position = "fixed";
        black.style.top = "0";
        black.style.left = "0";
        black.style.width = "100vw";
        black.style.height = "100vh";
        black.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        black.style.zIndex = "30";
      }
    } else {
      resetBlackOverlayScroll();
    }
    setIsOpenScroll(true);
  };

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0,y: -50 }}
      animate={{ opacity: 1,y: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div ref={blackUseRef}></div>
      {/* Header cố định */}
      <div className="flex   items-center justify-between z-50 px-[4%] max-xl:px-2 max-custom:px-2 py-4 bg-white w-full border-b">
        <div className={`text-[30px] cursor-pointer hidden max-lg:block`}>
          <IoMenu onClick={handleToggleDropdown} />
        </div>

        <div
          ref={loginRef}
          className={`bg-slate-100 transition-transform duration-500   flex flex-col fixed left-0 top-0 h-screen max-custom:w-[220px] z-50 w-[300px] ${
            isOpen ? "translate-x-0 " : "-translate-x-[100%]  "
          }`}
        >
          <button className=" text-[30px] flex justify-end py-2">
            <CiCircleRemove onClick={handleIsOpen} className="" />
          </button>
          <div
            onClick={() => setIsOpenSN(!isOpenSN)}
            className="p-4 hover:bg-slate-200 border-b flex  items-center justify-between   hover:text-green-700 cursor-pointer"
          >
            <p>Hoa Sinh Nhật</p>
            {!isOpenSN ? (
              <FaChevronDown className="h-[20px]" />
            ) : (
              <FaAngleUp className="h-[20px]" />
            )}
          </div>
          {isOpenSN && (
            <ul className=" bg-white  border-b">
              <li
                onClick={() =>
                  handleClick("/danh-muc/hoa-sinh-nhat/sang-trong")
                }
                className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer "
              >
                Sang Trọng
              </li>
              <li
                onClick={() =>
                  handleClick("/danh-muc/hoa-sinh-nhat/tang-nguoi-yeu")
                }
                className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
              >
                Tặng Người Yêu
              </li>
              <li
                onClick={() => handleClick("/danh-muc/hoa-sinh-nhat/tang-ban")}
                className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
              >
                Tặng Bạn
              </li>
              <li
                onClick={() => handleClick("/danh-muc/hoa-sinh-nhat/tang-me")}
                className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
              >
                Tặng Mẹ
              </li>
            </ul>
          )}

          <div
            onClick={() => setIsOpenCM(!isOpenCM)}
            className="p-4 border-b flex items-center  justify-between   hover:text-green-700 cursor-pointer"
          >
            <p>Hoa Chúc Mừng</p>
            {!isOpenCM ? (
              <FaChevronDown className="h-[20px]" />
            ) : (
              <FaAngleUp className="h-[20px]" />
            )}
          </div>
          {isOpenCM && (
            <ul className="bg-white  border-b ">
              <li
                onClick={() => handleClick("/danh-muc/hoa-chuc-mung/de-ban")}
                className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
              >
                Để Bàn
              </li>
              <li
                onClick={() => handleClick("/danh-muc/hoa-chuc-mung/lang-hoa")}
                className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
              >
                Lẵng Hoa
              </li>
            </ul>
          )}
          <div
            onClick={() => handleClick("/danh-muc/hoa-nhap-khau")}
            className="p-4 border-b flex items-center  justify-between  hover:text-green-700 cursor-pointer"
          >
            <p>Hoa Nhập Khẩu</p>
          </div>

          <div
            onClick={() => setIsOpenCD(!isOpenCD)}
            className="flex items-center p-4 border-b justify-between hover:text-green-700 cursor-pointer"
          >
            <p>Chủ Đề</p>
            {!isOpenCD ? (
              <FaChevronDown className="h-[20px]" />
            ) : (
              <FaAngleUp className="h-[20px]" />
            )}
          </div>
          {isOpenCD && (
            <ul className="bg-white  border-b   ">
              <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
                Hoa Khai Trương
              </li>
              <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
                Hoa Sáp
              </li>
            </ul>
          )}
          <div
            onClick={() => setIsOpenTK(!isOpenTK)}
            className="flex items-center p-4 border-b justify-between hover:text-green-900 cursor-pointer"
          >
            <p>Thiết Kế</p>
            {!isOpenTK ? (
              <FaChevronDown className="h-[20px]" />
            ) : (
              <FaAngleUp className="h-[20px]" />
            )}
          </div>
          {isOpenTK && (
            <ul className="bg-white  border-b ">
              <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
                Bó Hoa
              </li>
              <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
                Giỏ Hoa
              </li>
            </ul>
          )}
        </div>

        <div className="flex space-x-[135px] max-xl:space-x-[30px] max-lg:space-x-0 ">
          <Link href={"/"}>
            <Image
              src={logo}
              width={250}
              height={100}
              quality={100}
              alt="logo"
              className="max-custom:w-[180px] max-xl:w-[210px] "
            />
          </Link>
          <div className="flex items-center space-x-4 max-lg:hidden">
            <div
              className={`relative group ${
                [
                  "/danh-muc/hoa-sinh-nhat",
                  "/danh-muc/hoa-sinh-nhat/sang-trong",
                  "/danh-muc/hoa-sinh-nhat/tang-nguoi-yeu",
                  "/danh-muc/hoa-sinh-nhat/tang-ban",
                  "/danh-muc/hoa-sinh-nhat/tang-me",
                ].includes(activePath)
                  ? "text-green-900"
                  : ""
              }`}
            >
              <Link
                href={"/danh-muc/hoa-sinh-nhat"}
                className="flex  items-center h-full hover:text-green-700 cursor-pointer"
              >
                <p>Hoa Sinh Nhật</p>
                <SlArrowDown className="h-[10px]" />
              </Link>
              <div className="absolute left-[-10%]   text-slate-600  w-[300px] bg-none py-5 px-3 z-10 pt-9  opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/sang-trong"
                      className=" py-2  pr-[160px]"
                    >
                      Sang Trọng
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/tang-nguoi-yeu"
                      className=" py-2  pr-[125px]"
                    >
                      Tặng Người Yêu{" "}
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/tang-ban"
                      className=" py-2  pr-[175px]"
                    >
                      Tặng Bạn
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/tang-me"
                      className=" py-2  pr-[175px]"
                    >
                      Tặng Mẹ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`relative group ${
                [
                  "/danh-muc/hoa-chuc-mung",
                  "/danh-muc/hoa-chuc-mung/de-ban",
                  "/danh-muc/hoa-chuc-mung/lang-hoa",
                ].includes(activePath)
                  ? "text-green-900"
                  : ""
              }`}
            >
              <Link
                href={"/danh-muc/hoa-chuc-mung"}
                className="flex items-center h-full hover:text-green-700 cursor-pointer"
              >
                <p>Hoa Chúc Mừng</p>
                <SlArrowDown className="h-[10px]" />
              </Link>
              <div className="absolute left-[-10%]   text-slate-600  w-[290px] bg-none py-5 px-3 z-10 pt-9 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-chuc-mung/de-ban"
                      className=" py-2   pr-[180px]"
                    >
                      Để Bàn
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-chuc-mung/lang-hoa"
                      className=" py-2   pr-[165px]"
                    >
                      Lẵng Hoa
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href={"/danh-muc/hoa-nhap-khau"}
              className={`flex items-center h-full hover:text-green-700 cursor-pointer ${
                activePath === "/danh-muc/hoa-nhap-khau" ? "text-green-900" : ""
              }`}
            >
              <p>Hoa Nhập Khẩu</p>
            </Link>

            <div className="relative group">
              <div className="flex items-center h-full hover:text-green-700 cursor-pointer">
                <p>Chủ Đề</p>
                <SlArrowDown className="h-[10px]" />
              </div>
              <div className="absolute left-[-10%]   text-slate-600  w-[420%] bg-none py-5 px-3 z-10 pt-9 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-700 hover:text-white cursor-pointer rounded-xl">
                    Hoa Khai Trương
                  </li>
                  <li className="p-2 hover:bg-green-700 hover:text-white cursor-pointer rounded-xl">
                    Hoa Sáp
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative group">
              <div className="flex items-center h-full hover:text-green-900 cursor-pointer">
                <p>Thiết Kế</p>
                <SlArrowDown className="h-[10px]" />
              </div>
              <div className="absolute left-[-10%]   text-slate-600  w-[390%] bg-none py-5 px-3 z-10 pt-9 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    Bó Hoa
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    Giỏ Hoa
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ul className="flex items-center space-x-3 max-custom:space-x-1">
            <li className="hover:text-green-700">
              <Search />
            </li>
            <li>
              {/* <FaRegUser className="text-[22px]" /> */}
              <Auth />
            </li>
            <Link
              href={"/gio-hang"}
              className="relative cursor-pointer hover:text-green-700"
            >
              <LuShoppingCart className="text-[24px] max-custom:text-[20px] " />
              <span className="bg-slate-600 rounded-full text-[10px] px-1 text-white top-[-7px] absolute right-[-5px] ">
                {cartTotalQty}
              </span>
            </Link>
          </ul>
        </div>
      </div>

      {/* Header xuất hiện khi cuộn */}
      <div ref={blackScrollRef}></div>
      <div
        ref={loginScrollRef}
        className={`bg-slate-100 transition-transform duration-500   flex flex-col fixed left-0 top-0 h-screen z-40 max-custom:w-[220px] w-[300px] ${
          isOpenScroll ? "translate-x-0 " : "-translate-x-[100%] "
        }`}
      >
        <button className=" text-[30px] flex justify-end py-2">
          <CiCircleRemove
            onClick={handleIsOpenScroll}
            className="cursor-pointer"
          />
        </button>
        <div
          onClick={() => setIsOpenSN(!isOpenSN)}
          className="p-4 hover:bg-slate-200 border-b flex  items-center justify-between   hover:text-green-700 cursor-pointer"
        >
          <p>Hoa Sinh Nhật</p>
          {!isOpenSN ? (
            <FaChevronDown className="h-[20px]" />
          ) : (
            <FaAngleUp className="h-[20px]" />
          )}
        </div>
        {isOpenSN && (
          <ul className=" bg-white  border-b">
            <li
              onClick={() =>
                handleClickScroll("/danh-muc/hoa-sinh-nhat/sang-trong")
              }
              className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer "
            >
              Sang Trọng
            </li>
            <li
              onClick={() =>
                handleClickScroll("/danh-muc/hoa-sinh-nhat/tang-nguoi-yeu")
              }
              className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
            >
              Tặng Người Yêu
            </li>
            <li
              onClick={() =>
                handleClickScroll("/danh-muc/hoa-sinh-nhat/tang-ban")
              }
              className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
            >
              Tặng Bạn
            </li>
            <li
              onClick={() =>
                handleClickScroll("/danh-muc/hoa-sinh-nhat/tang-me")
              }
              className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
            >
              Tặng Mẹ
            </li>
          </ul>
        )}

        <div
          onClick={() => setIsOpenCM(!isOpenCM)}
          className="p-4 border-b flex items-center  justify-between   hover:text-green-700 cursor-pointer"
        >
          <p>Hoa Chúc Mừng</p>
          {!isOpenCM ? (
            <FaChevronDown className="h-[20px]" />
          ) : (
            <FaAngleUp className="h-[20px]" />
          )}
        </div>
        {isOpenCM && (
          <ul className="bg-white  border-b ">
            <li
              onClick={() =>
                handleClickScroll("/danh-muc/hoa-chuc-mung/de-ban")
              }
              className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
            >
              Để Bàn
            </li>
            <li
              onClick={() =>
                handleClickScroll("/danh-muc/hoa-chuc-mung/lang-hoa")
              }
              className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer"
            >
              Lẵng Hoa
            </li>
          </ul>
        )}
        <div
          onClick={() => handleClick("/danh-muc/hoa-nhap-khau")}
          className="p-4 border-b flex items-center  justify-between  hover:text-green-700 cursor-pointer"
        >
          <p>Hoa Nhập Khẩu</p>
        </div>

        <div
          onClick={() => setIsOpenCD(!isOpenCD)}
          className="flex items-center p-4 border-b justify-between hover:text-green-700 cursor-pointer"
        >
          <p>Chủ Đề</p>
          {!isOpenCD ? (
            <FaChevronDown className="h-[20px]" />
          ) : (
            <FaAngleUp className="h-[20px]" />
          )}
        </div>
        {isOpenCD && (
          <ul className="bg-white  border-b   ">
            <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
              Hoa Khai Trương
            </li>
            <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
              Hoa Sáp
            </li>
          </ul>
        )}
        <div
          onClick={() => setIsOpenTK(!isOpenTK)}
          className="flex items-center p-4 border-b justify-between hover:text-green-900 cursor-pointer"
        >
          <p>Thiết Kế</p>
          {!isOpenTK ? (
            <FaChevronDown className="h-[20px]" />
          ) : (
            <FaAngleUp className="h-[20px]" />
          )}
        </div>
        {isOpenTK && (
          <ul className="bg-white  border-b ">
            <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
              Bó Hoa
            </li>
            <li className="p-2 pl-6 hover:bg-slate-200 hover:text-green-700  cursor-pointer">
              Giỏ Hoa
            </li>
          </ul>
        )}
      </div>

      <div
        className={` flex items-center justify-between max-lg:px-2 max-custom:px-2  px-[4%] py-4 bg-white w-full fixed top-0 z-20 shadow-lg transform transition-transform duration-1000 ${
          isScroll
            ? "-translate-y-[1px] opacity-100"
            : "-translate-y-full opacity-0 "
        }`}
      >
        <div className={`text-[30px] cursor-pointer hidden max-lg:block`}>
          <IoMenu onClick={handleToggleDropdownScroll} />
        </div>

        <div className="flex space-x-[135px] max-xl:space-x-[30px] max-lg:space-x-0 ">
          <Link href={"/"}>
            <Image
              src={logo}
              width={250}
              height={100}
              quality={100}
              alt="logo"
              className="max-custom:w-[180px] max-xl:w-[210px] "
            />
          </Link>
          <div className="flex items-center space-x-4 max-lg:hidden">
            <div
              className={`relative group ${
                [
                  "/danh-muc/hoa-sinh-nhat",
                  "/danh-muc/hoa-sinh-nhat/sang-trong",
                  "/danh-muc/hoa-sinh-nhat/tang-nguoi-yeu",
                  "/danh-muc/hoa-sinh-nhat/tang-ban",
                  "/danh-muc/hoa-sinh-nhat/tang-me",
                ].includes(activePath)
                  ? "text-green-900"
                  : ""
              }`}
            >
              <Link
                href={"/danh-muc/hoa-sinh-nhat"}
                className="flex  items-center h-full hover:text-green-700 cursor-pointer"
              >
                <p>Hoa Sinh Nhật</p>
                <SlArrowDown className="h-[10px]" />
              </Link>
              <div className="absolute left-[-10%]   text-slate-600  w-[300px] bg-none py-5 px-3 z-10 pt-9  opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/sang-trong"
                      className=" py-2  pr-[160px]"
                    >
                      Sang Trọng
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/tang-nguoi-yeu"
                      className=" py-2  pr-[125px]"
                    >
                      Tặng Người Yêu{" "}
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/tang-ban"
                      className=" py-2  pr-[175px]"
                    >
                      Tặng Bạn
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-sinh-nhat/tang-me"
                      className=" py-2  pr-[175px]"
                    >
                      Tặng Mẹ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`relative group ${
                [
                  "/danh-muc/hoa-chuc-mung",
                  "/danh-muc/hoa-chuc-mung/de-ban",
                  "/danh-muc/hoa-chuc-mung/lang-hoa",
                ].includes(activePath)
                  ? "text-green-900"
                  : ""
              }`}
            >
              <Link
                href={"/danh-muc/hoa-chuc-mung"}
                className="flex items-center h-full hover:text-green-700 cursor-pointer"
              >
                <p>Hoa Chúc Mừng</p>
                <SlArrowDown className="h-[10px]" />
              </Link>
              <div className="absolute left-[-10%]   text-slate-600  w-[290px] bg-none py-5 px-3 z-10 pt-9 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-chuc-mung/de-ban"
                      className=" py-2   pr-[180px]"
                    >
                      Để Bàn
                    </a>
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    <a
                      href="/danh-muc/hoa-chuc-mung/lang-hoa"
                      className=" py-2   pr-[165px]"
                    >
                      Lẵng Hoa
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href={"/danh-muc/hoa-nhap-khau"}
              className={`flex items-center h-full hover:text-green-700 cursor-pointer ${
                activePath === "/danh-muc/hoa-nhap-khau" ? "text-green-900" : ""
              }`}
            >
              <p>Hoa Nhập Khẩu</p>
            </Link>

            <div className="relative group">
              <div className="flex items-center h-full hover:text-green-700 cursor-pointer">
                <p>Chủ Đề</p>
                <SlArrowDown className="h-[10px]" />
              </div>
              <div className="absolute left-[-10%]   text-slate-600  w-[420%] bg-none py-5 px-3 z-10 pt-9 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-700 hover:text-white cursor-pointer rounded-xl">
                    Hoa Khai Trương
                  </li>
                  <li className="p-2 hover:bg-green-700 hover:text-white cursor-pointer rounded-xl">
                    Hoa Sáp
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative group">
              <div className="flex items-center h-full hover:text-green-900 cursor-pointer">
                <p>Thiết Kế</p>
                <SlArrowDown className="h-[10px]" />
              </div>
              <div className="absolute left-[-10%]   text-slate-600  w-[390%] bg-none py-5 px-3 z-10 pt-9 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className="top-[30px]  z-10 absolute  right-[50%] left-10 transform translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                <ul className="bg-white py-4 rounded-sm px-2 shadow-[5px_5px_30px_2px_rgba(0,0,0,0.5)] ">
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    Bó Hoa
                  </li>
                  <li className="p-2 hover:bg-green-800 hover:text-white cursor-pointer rounded-xl">
                    Giỏ Hoa
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex items-center space-x-3 max-custom:space-x-1">
            <li className="hover:text-green-700">
              <Search />
            </li>
            <li>
              <Auth />
            </li>
            <Link
              href={"/gio-hang"}
              className="relative cursor-pointer hover:text-green-700"
            >
              <LuShoppingCart className="text-[24px] max-custom:text-[20px]" />
              <span className="bg-slate-600 rounded-full text-[10px] px-1 text-white top-[-7px] absolute right-[-5px] ">
                {cartTotalQty}
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
