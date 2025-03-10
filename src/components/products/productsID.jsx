"use client";
import { FcShipped } from "react-icons/fc";
import Image from "next/image";
import { BiChevronsRight } from "react-icons/bi";
import { useState, useEffect, useCallback } from "react";
import ProductsIDslide from "./productsIDslide";
import SetQuantity from "./setQuantity";
import ButtonFlower from "./buttonFlower";
import Comment from "./comment";
export default function ProductsID({ data }) {
  const [cartItem, setCartItem] = useState({
    id: data._id,
    name: data.name,
    price: data.price,
    image: data.image1,
    quantity: 1,
  });
 
  const images = [data.image1, data.image2, data.image3].filter(Boolean);
  const [cartProduct, setCartProduct] = useState({ image: images[0] });
  const [dataSlide, setDataSlide] = useState([]);
  
  const handleQtyIncrease = useCallback(() => {
    if (cartItem.quantity === 99) {
      return cartItem.quantity;
    }
    setCartItem((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartItem.quantity]);
  const handleQtyDecrease = useCallback(() => {
    if (cartItem.quantity === 1) {
      return cartItem.quantity;
    }
    setCartItem((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartItem.quantity]);

  const handleImageChange = (value) => {
    setCartProduct({ image: value });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/api/products/getAllProducts`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const datas = result.data;

        setDataSlide(datas);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className=" mx-[5%] max-lg:mx-5 mt-2">
      <div>
        <div className="space-y-2 text-[16px]  max-lg:hidden">
          <p className="flex items-center space-x-2">
            <span>Trang chủ</span>
            <span className="pt-1">
              <BiChevronsRight />
            </span>
            <span>Sản Phẩm</span>
            <span className="pt-1">
              <BiChevronsRight />
            </span>
            <span>Bó Hoa</span>
            <span className="pt-1">
              <BiChevronsRight />
            </span>
            <span>{data.name}</span>
          </p>
        </div>
        <div className="space-y-2 text-[16px] hidden max-lg:block ">
          <p className="flex items-center space-x-2">
            <span>Trang chủ</span>
            <span className="pt-1">
              <BiChevronsRight />
            </span>
            <span>Sản Phẩm</span>
            <span className="pt-1">
              <BiChevronsRight />
            </span>
          </p>
          <p className="flex">
            <span>Bó Hoa</span>
            <span className="pt-1">
              <BiChevronsRight />
            </span>
            <span>{data.name}</span>
          </p>
        </div>

        <div className="flex w-full max-custom:block  mt-5">
          <div className=" w-3/5 max-custom:w-full  justify-center hidden max-lg:block  ">
            <div className=" flex justify-center ">
              <Image
                src={cartProduct.image}
                alt={data.name}
                width={300}
                height={200}
                quality={100}
                className="bg-cover w-[80%] bg-center rounded-xl "
              />
            </div>
            <div className=" flex space-x-2 justify-center items-center mt-5">
              {images &&
                images.length > 0 &&
                images.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageChange(item)}
                    className=""
                  >
                    <Image
                      src={item}
                      alt={`Image ${index}`}
                      width={80}
                      height={50}
                      quality={100}
                      className={` object-cover object-center cursor-pointer transition-all duration-500  rounded-lg ${
                        cartProduct.image === item
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex w-3/5 justify-center max-lg:hidden space-x-3">
            <div className="flex flex-col space-y-4  ">
              {images &&
                images.length > 1 &&
                images.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageChange(item)}
                    className=""
                  >
                    <Image
                      src={item}
                      alt={`Image ${index}`}
                      width={130}
                      height={50}
                      quality={100}
                      className={`  object-cover object-center cursor-pointer transition-all duration-500  rounded-lg ${
                        cartProduct?.image === item
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-100"
                      } `}
                    />
                  </div>
                ))}
            </div>

            <div className=" flex justify-center w-[75%]">
              <Image
                src={cartProduct.image}
                alt={data.name}
                width={500}
                height={200}
                quality={100}
                className="bg-cover w-full bg-center rounded-xl "
              />
            </div>
          </div>
          <div className="w-2/5 max-custom:w-full max-custom:mt-5 space-y-5 ">
            <p className="font-medium text-[28px] max-lg:text-[20px]">
              {data.name}
            </p>
            <p className="h-[3px] bg-black w-8"></p>
            <p className="font-medium text-[32px] text-green-800 max-lg:text-[20px]">
              {data.price} ₫
            </p>
            <p className="font-medium">{data.describe}</p>
            <div>
              <SetQuantity
                cartItem={cartItem}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>

            <div>
              <ButtonFlower cartItem={cartItem} />
            </div>

            <div className="flex justify-center space-x-6">
              <p className="border-2 border-green-900 text-green-900 hover:bg-green-800 cursor-pointer hover:text-white text-[14px] py-1 px-3 font-medium rounded-xl">
                Hotline: 0903255312
              </p>
              <p className="border-2 border-green-900 text-green-900 hover:bg-green-800 cursor-pointer hover:text-white text-[14px] py-1 px-3 font-medium rounded-xl">
                Zalo: 0903255312
              </p>
            </div>

            <div className="border border-dashed border-black rounded-lg max-lg:hidden">
              <div className="flex items-center bg-green-50 rounded-t-lg space-x-8 px-3">
                <p>
                  <FcShipped className="text-[70px]" />
                </p>
                <div className="h-full space-y-4">
                  <p className="font-bold">Chính sách vận chuyển - Mua hàng</p>
                  <p className="italic text-[14px] pb-3">(Chi tiết)</p>
                </div>
              </div>
              <div className="px-4 space-y-3 pt-3 pb-7 text-[15px]">
                <div className="flex font-medium space-x-1">
                  <p className="bg-green-800 py-[1px] px-[9px] flex justify-center items-center text-white text-[12px] rounded-full">
                    1
                  </p>
                  <p>Tặng kèm banner hoặc thiệp chúc mừng.</p>
                </div>
                <div className=" font-medium space-x-1">
                  <p>
                    <span className="bg-green-800 text-white py-[3px] px-[8px] rounded-full text-[12px] mr-1">
                      2
                    </span>
                    Hoàn tiền trong trường hợp hoa đến tay khách hàng bị dập nát
                    hư hỏng trên 70% (Xem chi tiết)
                  </p>
                </div>
                <div className="flex font-medium space-x-1">
                  <p>
                    <span className="bg-green-800 text-white py-[3px] px-[8px] rounded-full text-[12px] mr-1">
                      3
                    </span>
                    Giảm 10% cho những đơn hàng tiếp theo kèm theo hình ảnh
                    feedback
                  </p>
                </div>
                <div className="flex font-medium space-x-1">
                  <p className="bg-green-800 py-[1px] px-[8px] flex justify-center items-center text-white text-[12px] rounded-full">
                    4
                  </p>
                  <p>Có xuất hoá đơn VAT</p>
                </div>
              </div>
            </div>
            <p className="italic text-[14px] opacity-50">
              <span className="font-bold"> Lưu ý:</span> Các sản phẩm hoa của
              Tiệm Hoa Nàng Thơm thường sử dụng các loại hoa theo mùa có sẵn tại
              cửa hàng để đảm bảo tính thẩm mỹ và độ tươi bền. Sản phẩm thực tế
              sẽ tương tự khoảng 80-95% so với hình ảnh mẫu.
            </p>
          </div>
        </div>
        <div className="mt-20 space-y-4 pb-5">
          <p className="bg-green-800 w-[60px] text-white text-center text-[13px] p-1 rounded-full">
            MÔ TẢ
          </p>
          <p className="font-medium">{data.describe}</p>
        </div>
        <Comment/>
        <div className="mt-3">
          <p className="font-medium text-[25px]">SẢN PHẨM TƯƠNG TỰ</p>
          <ProductsIDslide data={dataSlide} />
        </div>
      </div>
    </div>
  );
}
