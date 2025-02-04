"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GrGoogle } from "react-icons/gr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../hook/useCart";
import { getApiUser } from "./getUserApi";

function LoginForm({
  setIsOpenRegister,
  isOpenRegister,
  handleOutLogin,
  cartItem,
}) {
  const { handleAddProducTocart } = useCart();
  const [visible, setVisible] = useState(true);

  const inputRef = useRef(null);
  const router = useRouter();
  const { setGetUserId } = useCart();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Không được để trống")
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng "),
      password: Yup.string()
        .required("Không được để trống")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password phải có 8 ký tự,có ít nhất 1 chữ cái và 1 chữ số"
        ),
    }),
    onSubmit: (values) => {
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL_API}/api/auth/singin`,
        data: values,
      })
        .then(function (res) {
          toast.success("Đăng nhập thành công!");
          handleOutLogin();
          router.push("/gio-hang");
          if (cartItem) {
            handleAddProducTocart(cartItem);
          }
          
          localStorage.setItem("accessToken", res.data.accessToken);

          if (res.data.accessToken) {
            const decoded = jwtDecode(res.data.accessToken);
            
            
            if (decoded._id) {
              handleGetID(decoded._id);
            }
          }
        })
        .catch(function (res) {
          toast.error("Đăng nhập thất bại!");
        });
    },
  });
  const handleGetID = async (id) => {
    const res = await getApiUser(id);
    setGetUserId(res.data);
  };

  return (
    <div className={`${isOpenRegister ? "hidden" : "block ${isButton}"} `}>
      <form
        className={`rounded-lg space-y-2    bg-white h-full  shadow-[0_0px_70px_-5px_rgba(0,0,0,0.1)] p-5 `}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center font-bold text-[23px]">Đăng nhập</h1>
        <a
          href={`${process.env.NEXT_PUBLIC_URL_API}/api/auth/google`}
          className=" hover:bg-slate-300 flex items-center space-x-2 justify-center text-[14px] font-bold p-2 border-2 border-slate-700 rounded-lg 
          "
        >
          <p>
            <GrGoogle />
          </p>
          <p>Đăng nhập với google</p>
        </a>

        <div className="border border-slate-400 rounded-md p-2">
          <label className="font-medium px-1 " htmlFor="email">
            Email
          </label>
          <br />
          <input
            ref={inputRef}
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="outline-0 w-full p-1 text-[14px] "
            type="email"
            placeholder="Email"
          />
          {formik.errors.email && (
            <span className="text-red-500 text-[12px] font-normal ">
              {formik.errors.email}
            </span>
          )}
        </div>
        <div className="border border-slate-400 rounded-md p-2">
          <label className="font-medium px-1" htmlFor="password">
            Mật khẩu
          </label>
          <br />
          <div className="flex">
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full outline-0 p-1 text-[14px]"
              type={!visible ? "text" : "password"}
              placeholder="Mật khẩu"
            />
            <div onClick={() => setVisible(!visible)}>
              {visible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>
          {formik.errors.password && (
            <span className="text-red-500 text-[12px] font-normal ">
              {formik.errors.password}
            </span>
          )}
        </div>
        <p className="p-2">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => setIsOpenRegister(true)}
            className="text-green-800 text-[16px] cursor-pointer hover:underline underline-offset-2"
          >
            ĐĂNG KÝ
          </span>
        </p>

        <div
          type="submit"
          className="flex bg-green-800 text-slate-100 justify-center pt-2 border border-slate-400 rounded-md py-2 px-5 hover:bg-green-900 cursor-pointer   "
        >
          <button className="w-full h-full">Xác nhận</button>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
