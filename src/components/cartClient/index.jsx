"use client";
import { CiCircleRemove } from "react-icons/ci";
import SetQuantity from "../products/setQuantity";
import { useCart } from "../hook/useCart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import { LuMoveLeft } from "react-icons/lu";
import Link from "next/link";
export default function CartClient() {
  const router=useRouter()
  const {
    cartProducts,
    handleCardQtyDecrease,
    handleCardQtyIncrease,
    cartTotalAmout,
    handleRemoveProducts,
  } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex justify-center  w-full py-5 mb-[18%]">
        <div className="space-y-3 ">
          <p className="text-[20px] font-bold ">Giỏ hàng trống</p>
          <Link href={"/san-pham"} className="flex hover:underline underline-offset-4  items-center space-x-1 text-green-800 cursor-pointer -translate-x-2">
            <p>
              <GoArrowLeft />
            </p>
            <div>
              <p className="font-medium ">Quay lại cửa hàng</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-[6%] max-lg:mx-5">
      <div className="flex justify-center max-lg:text-[16px] text-[18px] my-14 text-slate-900  items-center">
        <p className="max-custom:text-[28px] max-custom:font-medium">
          <span className=" max-custom:hidden px-[6px] text-white mr-2 text-[15px]  bg-green-800 rounded-full ">
            1
          </span>
          Giỏ hàng <span  className="pl-1 max-custom:hidden pr-2 text-slate-400">{`>`}</span>
        </p>
        <p className="max-custom:hidden"> 
          <span className=" px-[6px] text-white mr-2 text-[15px] bg-gray-300  rounded-full ">
            2
          </span>
          Thông tin vận chuyển{" "}
          <span className="pl-1 pr-2 text-slate-400">{`>`}</span>
        </p>
        <p className="max-custom:hidden">
          <span className="  px-[6px] text-white mr-2 text-[15px] bg-gray-300 rounded-full ">
            3
          </span>
          Hoàn tất đơn hàng
        </p>
      </div>

      <div className="mt-10 flex max-lg:block max-lg:space-y-6 ">
        <div className="w-[57%] max-lg:w-full text-[15px] border-b max-lg:border-b-0">
          <div className="font-bold flex  justify-between border-b-2 pb-1 ">
            <p className="w-[52%] ">SẢN PHẨM</p>
            <div className="flex   w-[48%]">
              <p className="text-start max-custom:w-1/2 max-custom:text-center  w-1/3">GIÁ</p>
              <p className="text-start w-1/3 max-custom:w-1/2 max-custom:text-end">SỐ LƯỢNG</p>
              <p className="text-end w-1/3 max-custom:hidden">TẠM TÍNH</p>
            </div>
          </div>
          <div className="space-y-2">
            {cartProducts &&
              cartProducts.map((item, index) => {
                const money = (
                  Number(item.price.replace(/\./g, "")) * item.quantity
                ).toLocaleString("vi-VN");
                

                return (
                  <div key={index}>
                    <div className="flex  items-center border-b py-3">
                      <div className="flex items-center w-[52%] pr-10 ">
                        <button
                          onClick={() => handleRemoveProducts(item)}
                          className="text-[25px] mr-1 text-slate-500 hover:text-black font-medium underline"
                        >
                          <CiCircleRemove />
                        </button>
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={100}
                          width={80}
                          quality={100}
                          className="rounded-xl max-custom:h-[55px]"
                        />
                        <p className="ml-3 max-custom:text-[12px]">{item.name}</p>
                      </div>
                      <div className="flex  mr-1 w-[48%] ">
                        <p className="text-start w-1/3 max-custom:w-1/2 ">{item.price} ₫</p>
                        <div className="flex justify-start w-1/3 pl-1 max-custom:w-1/2 max-custom:text-end">
                          <SetQuantity
                            cartItem={item}
                            handleQtyIncrease={() =>
                              handleCardQtyIncrease(item)
                            }
                            handleQtyDecrease={() =>
                              handleCardQtyDecrease(item)
                            }
                          />
                        </div>
                        <p className="w-1/3 text-end max-custom:hidden">{money} ₫</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center hover:bg-green-900 cursor-pointer transition duration-300 hover:text-white text-green-900  border-2 mt-4 w-[300px] space-x-2 py-1 rounded-lg border-green-900 justify-center">
            <p>
              <LuMoveLeft />
            </p>
            <Link href={"/san-pham"} className=" font-medium">TIẾP TỤC XEM SẢN PHẨM</Link>
          </div>
        </div>
        <div className="border w-[1px] mx-8"></div>
        <div className="w-[39%] max-lg:w-full border-b max-lg:border-b-0">
          <p className="text-[15px] font-bold border-b-[3px] pb-1 ">
            CỘNG GIỎ HÀNG
          </p>
          <div className="flex justify-between border-b pb-2 pt-4">
            <p>Tạm tính</p>
            <p className="font-medium">
              {cartTotalAmout.toLocaleString("vi-VN")} ₫
            </p>
          </div>
          <div className="flex justify-between text-[14px] font-medium text-gray-500 border-b py-2">
            <p>Giao hàng</p>
            <div className="text-[13px]">
              <p className="text-end">
                Ship theo đơn vị vận chuyển (Tiệm sẽ liên hệ với khách hàng để
                thông báo chi phí)
              </p>
              <p className="text-end">
                Vận chuyển đến <span className="text-green-800">sdf.</span>
              </p>
              <p className="text-end">Đổi địa chỉ</p>
            </div>
          </div>
          <div className="flex justify-between py-2 border-b-2">
            <p>Tổng</p>
            <p className="font-medium">
              {cartTotalAmout.toLocaleString("vi-VN")} ₫
            </p>
          </div>
          <p onClick={()=>router.push("/thanh-toan")} className="text-center hover:bg-green-800 cursor-pointer p-2 bg-green-900 text-white font-medium rounded-xl my-7">
            TIẾN HÀNH THANH TOÁN
          </p>
        </div>
      </div>
    </div>
  );
}
