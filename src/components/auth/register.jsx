"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-hot-toast";

function RegisterForm({ setIsOpenRegister, isOpenRegister }) {
  const [visible, setVisible] = useState(true);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Không được để trống")
        .min(4, "Phải có ít nhất 4 kí tự"),
      email: Yup.string()
        .required("Không được để trống")
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng "),
      password: Yup.string()
        .required("Không được để trống")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password phải có 8 ký tự,có ít nhất 1 chữ cái và 1 chứ số"
        ),
    }),
    onSubmit: (values) => {
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_URL_API}/api/auth/singup`,
        data: values,
      })
        .then(function (res) {
          toast.success("Đăng ký thành công!");
          setIsOpenRegister(false);
        })
        .catch(function (res) {
          toast.error("Email đã tồn tại!");
        });
    },
  });

  return (
    <div className={`${isOpenRegister ? "block" : "hidden "} `}>
      <form
        className={`rounded-lg space-y-2   bg-white h-full shadow-[0_0px_70px_-5px_rgba(0,0,0,0.1)] p-5 
        `}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center font-medium  text-[23px]">Đăng ký</h1>

        <div className="border border-slate-400 rounded-md p-2 ">
          <label htmlFor="name" className="font-medium  px-1 ">
            Tên đăng ký
          </label>
          <br />
          <input
            autoComplete="off"
            id="name"
            ref={inputRef}
            name="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            className="  outline-0 w-full p-1 text-[14px]"
            type="text"
            placeholder="Tên đăng ký"
          />
          {formik.errors.userName && (
            <span className="text-red-500 text-[12px] font-normal ">
              {formik.errors.userName}
            </span>
          )}
        </div>
        <div className="border border-slate-400 rounded-md p-2">
          <label className="font-medium  px-1 " htmlFor="email">
            Email
          </label>
          <br />
          <input
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

        <div className="flex bg-green-800 cursor-pointer text-slate-100 justify-center pt-2 border border-slate-400 rounded-md py-2 px-5 hover:bg-green-900   ">
          <button className="h-full w-ful" type="submit">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
