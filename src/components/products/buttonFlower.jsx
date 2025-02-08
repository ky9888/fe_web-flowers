"use client";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/register";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/components/hook/useCart";
import { useRouter } from "next/navigation";
import { RiLoader4Line } from "react-icons/ri";
export default function ButtonFlower({ cartItem }) {
  const timeoutId = useRef(null);
  const { handleAddProducTocart, getUserId } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const router = useRouter(null);
  const loginRef = useRef(null);
  const blackkUseRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handleOutLogin = () => {
    setIsOpen(false);
    resetBlackOverlay();
  };
  const resetBlackOverlay = () => {
    const black = blackkUseRef.current;
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const black = blackkUseRef.current;
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

  const handleToggleDropdown = () => {
    setIsButton(false);
    setIsOpen(true);
    if (!isOpen) {
      const black = blackkUseRef.current;
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
  const handleCart = (value) => {
    setIsButton(true);

    if (getUserId) {
      timeoutId.current = setTimeout(() => {
        handleAddProducTocart(value);
        router.push("/gio-hang");
      }, 1000);
    } else {
      timeoutId.current = setTimeout(handleToggleDropdown, 1000);
    }
  };
  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);
  
  
  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => handleCart(cartItem)}
        className={`bg-green-900 cursor-pointer   flex text-[20px] font-medium hover:bg-green-800 text-white rounded-xl justify-center py-4 `}
      >
        <div ref={blackkUseRef}></div>
        {!isButton || (isButton && isOpen) ? (
          <button className="w-full  ">Đặt hoa</button>
        ) : (
          <RiLoader4Line className="text-[30px] animate-spin  " />
        )}
      </div>
      <div
        className={`fixed 
           ${
             isOpen
               ? "opacity-100 -translate-y-[115%] max-custom:-translate-y-[270%]  "
               : "opacity-0 -translate-y-[400%]"
           } w-full h-[400px] transition-transform duration-700  z-40 left-0 items-center flex justify-center
            }`}
      >
        <div
          ref={loginRef}
          className={`w-[500px] absolute left-[50%] -translate-x-1/2  max-lg:w-[450px] max-custom:w-[320px]`}
        >
          <LoginForm
            isButton={isButton}
            cartItem={cartItem}
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
    </>
  );
}
