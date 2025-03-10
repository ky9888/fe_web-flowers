"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(null);
  const [cartTotalQty, setCartTotalQly] = useState(0);
  const [cartTotalAmout, setCartTotalAmout] = useState(0);
  const [getUserId, setGetUserId] = useState(null);


  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("accessToken");
      const cartProduct = localStorage.getItem("cartItem");
   
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded._id) {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_URL_API}/api/auth/getDetailUser/${decoded._id}`
            );

            setGetUserId(res.data.data);
            setCartProducts(JSON.parse(cartProduct));
          }
        } catch (err) {
          console.error("Lỗi khi xác thực token:", err);
        }
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal =
              Number(item.price.replace(/\./g, "")) * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQly(qty);
        setCartTotalAmout(total);
      } else {
        return cartProducts;
      }
    };
    getTotal();
  }, [cartProducts]);

  const handleRemoveProducts = useCallback(
    (product) => {
      if (cartProducts) {
        const fiterProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(fiterProduct);

        localStorage.setItem("cartItem", JSON.stringify(fiterProduct));
      }
    },
    [cartProducts]
  );

  const handleCardQtyIncrease = useCallback(
    (product) => {
      let updateCart;
      if (product.quantity === 20) {
        return product.quantity;
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const extingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (extingIndex > -1) {
          updateCart[extingIndex].quantity = ++updateCart[extingIndex].quantity;
        }
        setCartProducts(updateCart);

        localStorage.setItem("cartItem", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );
  const handleCardQtyDecrease = useCallback(
    (product) => {
      let updateCart;
      if (product.quantity === 1) {
        return product.quantity;
      }
      if (cartProducts) {
        updateCart = [...cartProducts];
        const extingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (extingIndex > -1) {
          updateCart[extingIndex].quantity = --updateCart[extingIndex].quantity;
        }
        setCartProducts(updateCart);

        localStorage.setItem("cartItem", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  const handleAddProducTocart = useCallback((product) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        const existingProductIndex = prev.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          // Sản phẩm đã tồn tại, tăng số lượng
          updatedCart = prev.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          // Sản phẩm chưa tồn tại, thêm vào giỏ
          updatedCart = [...prev, product];
        }
      } else {
        // Giỏ hàng rỗng, thêm sản phẩm đầu tiên
        updatedCart = [product];
      }

      // Cập nhật localStorage
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const value = {
    cartProducts,
    cartTotalAmout,
    cartTotalQty,
    handleAddProducTocart,
    handleCardQtyIncrease,
    handleCardQtyDecrease,
    handleRemoveProducts,
    getUserId,
    setGetUserId,
    setCartTotalQly,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => {
  const context = useContext(CartContext);
  
  

  if (context === null) {
    throw new Error("lỗi");
  }
  return context;
};
