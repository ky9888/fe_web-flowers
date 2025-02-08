"use client";
import { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { useCart } from "../hook/useCart";
import LoginForm from "./loginForm";
import RegisterForm from "./register";
function Auth() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const blackUseRef = useRef(null);
  const loginRef = useRef(null);
  const router = useRouter();
  const { getUserId, setGetUserId,setCartTotalQly } = useCart();


 
  useEffect(() => {
    const handleClickOutside = (event) => {
      const black = blackUseRef.current;
      const login = loginRef.current;
      if (black && login && !login.contains(event.target)) {
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
  const handleOutLogin = () => {
    setIsOpen(false);
    resetBlackOverlay();
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
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

  const Logout = () => {
    localStorage.clear();
    setGetUserId(null);
    setCartTotalQly(0)
    router.push("/");
  };

  return (
    <div className="cursor-pointer ">
      <div ref={blackUseRef}></div>
      <div className="relative  rounded-full">
        {!getUserId?.userName ? (
          <div
            onClick={handleToggleDropdown}
            className="flex  justify-center items-center cursor-pointer"
          >
            <div className="translate-x-1 hover:text-green-700">
              <div className="flex">
                <span className="text-[22px] max-custom:text-[18px]  translate-x-1">
                  <FaRegUser />
                </span>
                <span className="text-[20px] max-custom:text-[18px] ">
                  <FaCaretDown />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setIsLogOut(!isLogOut);
            }}
            className={`${isLogOut ? "translate-y-3" : ""} space-y-1`}
          >
            <div className="flex items-center justify-center">
              <span className="text-[15px] max-custom:text-[10px]">
                {getUserId?.userName}
              </span>
              <span className="text-[22px] max-custom:text-[10px]">
                <FaCaretDown />
              </span>
            </div>
            {isLogOut && (
              <div className="flex   justify-center">
                <button
                  onClick={Logout}
                  className="text-[15px] hover:bg-slate-400 px-2 rounded-md max-custom:text-[10px]"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}

        <div
          className={`fixed 
            ${
              isOpen
                ? "opacity-100 translate-y-10"
                : "opacity-0 -translate-y-[150%]"
            } w-full h-[400px] transition-transform duration-700  z-40 left-0  items-center flex justify-center
             }`}
        >
          <div
            ref={loginRef}
            className={`w-[500px] absolute left-[50%] -translate-x-1/2  max-lg:w-[450px] max-custom:w-[320px]`}
          >
            <LoginForm
              handleOutLogin={handleOutLogin}
              isOpen={isOpen}
              isOpenRegister={isOpenRegister}
              setIsOpenRegister={setIsOpenRegister}
            />
            <RegisterForm
              isOpen={isOpen}
              isOpenRegister={isOpenRegister}
              setIsOpenRegister={setIsOpenRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;
