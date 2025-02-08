
import CartContextProvider from "../hook/useCart";
export default function CartProvider ({children}){
    return <CartContextProvider>{children}</CartContextProvider>
     
}
 
