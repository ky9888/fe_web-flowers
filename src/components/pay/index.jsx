"use client";
import Image from "next/image";

import { useCart } from "../hook/useCart";

export default function ClientPay() {
  
  const { cartProducts, cartTotalAmout } = useCart();
  return (
    <div>
      <div className="mx-[6%]">
        <div className="flex justify-center max-lg:text-[16px] text-[18px] my-14 text-slate-900  items-center">
          <p className="max-custom:hidden">
            <span className=" px-[6px] text-white mr-2 max-lg:mr-1 text-[15px] bg-gray-300  rounded-full ">
              1
            </span>
            Giỏ hàng <span className="pl-1 pr-2 text-slate-400">{`>`}</span>
          </p>
          <p className="max-custom:text-[28px] max-custom:font-medium">
            <span className=" px-[6px] max-custom:hidden text-white mr-2 max-lg:mr-1 text-[15px] bg-green-800  rounded-full ">
              2
            </span>
            Thông tin vận chuyển
            <span className="pl-1 pr-2 max-custom:hidden text-slate-400">{`>`}</span>
          </p>
          <p className="max-custom:hidden">
            <span className=" px-[6px] text-white mr-2 max-lg:mr-1 text-[15px] bg-gray-300 rounded-full ">
              3
            </span>
            Hoàn tất đơn hàng
          </p>
        </div>
        <div className="mt-10 flex space-x-7 max-lg:block max-lg:space-x-0 max-lg:space-y-10">
          <div className="w-[57%] text-[15px] max-lg:w-full border-b border-t-2 space-y-4">
            <h1 className="mt-6 text-[18px]">THÔNG TIN THANH TOÁN</h1>
            <div className="flex flex-col space-y-1 ">
              <label className="font-medium" htmlFor="name">
                Họ và tên *
              </label>
              <input
                id="name"
                className="outline-0 border px-3 py-[6px] shadow-[0_0px_5px_-2px_rgba(0,0,0,0.5)]"
                type="text "
                placeholder="Họ và tên"
              />
            </div>
            <div className="flex flex-col space-y-1 ">
              <label className="font-medium" htmlFor="name">
                Địa chỉ *
              </label>
              <input
                id="name"
                className="outline-0 border px-3 py-[6px] shadow-[0_0px_5px_-2px_rgba(0,0,0,0.5)]"
                type="text "
                placeholder="Địa chỉ"
              />
            </div>
            <div className="flex flex-col space-y-1 ">
              <label className="font-medium" htmlFor="name">
                Số điện thoại *
              </label>
              <input
                id="name"
                className="outline-0 border px-3 py-[6px] shadow-[0_0px_5px_-2px_rgba(0,0,0,0.5)]"
                type="number "
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-medium" htmlFor="name">
                Địa chỉ email (tùy chọn)
              </label>
              <input
                id="name"
                className="outline-0 border px-3 py-[6px] shadow-[0_0px_5px_-2px_rgba(0,0,0,0.5)]"
                placeholder="Email (Không bắt buộc)"
                type="email "
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-medium" htmlFor="textArea">
                Ghi chú đơn hàng (tuỳ chọn)
              </label>
              <textarea
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                className="outline-0 border px-3 py-[6px] shadow-[0_0px_5px_-2px_rgba(0,0,0,0.5)] "
                name=""
                id="textArea"
                rows={5}
              ></textarea>
            </div>
          </div>

          <div className="w-[43%] max-lg:w-full border-2 border-green-800 px-6">
            <h1 className="mt-6 text-[18px]">ĐƠN HÀNG CỦA BẠN</h1>
            <div className="flex  justify-between text-[18px] font-medium border-b pb-2 pt-4">
              <p>Sản phẩm</p>
              <p>Tạm tính</p>
            </div>
            <div className="space-y-2">
              {cartProducts &&
                cartProducts.map((item, index) => {
                  const money = (
                    Number(item.price.replace(/\./g, "")) * item.quantity
                  ).toLocaleString("vi-VN");
                 

                  return (
                    <div
                      key={index}
                      className=" flex  text-[14px] max-lg:items-center py-3 border-b"
                    >
                      <div className="w-[12%] ">
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={100}
                          width={50}
                          quality={100}
                          className="rounded-lg max-custom:h-[40px] w-[90%] max-lg:h-[80px] h-[55px] object-cover object-center"
                        />
                      </div>
                      <p className="w-[71%] max-custom:w-[63%] text-start">
                        {item.name}
                        <span className="font-bold">x {item.quantity}</span>
                      </p>

                      <p className="w-[17%] max-custom:w-[25%]  flex items-center justify-end font-medium">
                        {money} ₫
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className="flex max-custom:space-x-10  justify-between text-[14px] font-medium text-gray-500 border-b py-2">
              <p>Giao hàng</p>
              <div className="text-[13px]">
                <p className="text-end">
                  Ship theo đơn vị vận chuyển (Tiệm sẽ liên hệ với khách hàng để
                  thông báo chi phí)
                </p>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b-2">
              <p className="font-medium">Tổng</p>
              <p className="font-medium">
                {cartTotalAmout.toLocaleString("vi-VN")} ₫
              </p>
            </div>
            <p className="font-medium text-[15px] mt-5">COD</p>
            <p className="text-[15px] ">Trả tiền mặt khi giao hàng.</p>
            <p className="text-center p-2 bg-green-900 text-white font-medium rounded-xl my-7">
              ĐẶT HÀNG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
