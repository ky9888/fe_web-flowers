"use client"

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex max-lg:block max-custom:mx-5 mx-20 mt-8 pl-6 pb-14 border-t-2 pt-10"
    >
      <div className="w-3/4 flex space-x-6 max-lg:block max-lg:w-full max-lg:space-y-7 max-lg:space-x-0">
        <div className="w-1/3 text-[15px] space-y-2 max-lg:w-full ">
          <p className="font-medium text-[17px]">Thông Tin Liên Hệ</p>
          <p>
            <span className="font-medium mr-3">Địa chỉ cửa hàng:</span> 5A Đường
            số 54, Phường Thảo Điền, Thành Phố Thủ Đức, HCM
          </p>
          <p>
            <span className="font-medium mr-3">Hotline:</span> 0979 692 245
          </p>
          <p>
            <span className="font-medium mr-[35px]">Zalo:</span>0979 692 245
          </p>
          <p>
            <span className="font-medium mr-7">Email:</span>
            contact@tiemhoanangthom.com
          </p>
        </div>
        <div className="w-1/3 text-[15px] space-y-2 max-lg:w-full  ">
          <p className="font-medium text-[17px]">Thông tin công ty</p>
          <p className="font-medium mr-3 ">
            Công ty TNHH Thương mại Dịch vụ HMEDIA
          </p>
          <p>
            Giấy chứng nhận đăng ký doanh nghiệp số:{" "}
            <span className="font-medium">0317211218</span> do Sở Kế hoạch và
            đầu tư thành phố Hồ Chí Minh cấp ngày 22/03/2022
          </p>
          <p>
            <span className="font-medium">Địa chỉ GPKD:</span> 14 Phan Tôn, P.
            Đa Kao, Q. 1, Tp. Hồ Chí Minh
          </p>
        </div>
        <div className="text-[15px] space-y-4 max-lg:w-full max-lg:space-y-2">
          <p className="font-medium text-[17px]">Chăm sóc khách hàng</p>
          <p>Hướng dẫn mua hàng</p>
          <p>Chính sách thanh toán</p>
          <p>Chính sách vận chuyển</p>
          <p>Chính sách đổi trả hàng</p>
          <p>Chính sách bảo mật</p>
          <p>Phân định trách nhiệm các bên</p>
        </div>
      </div>
      <div>
        <p className="font-medium text-[17px] max-lg:mt-4">FANPAGE</p>
      </div>
    </motion.div>
  );
}
