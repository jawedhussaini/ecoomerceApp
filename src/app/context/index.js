"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
  shippingAddress: {},
  payMentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};
const protectedRouts = [
  "card",
  "checkOut",
  "account",
  "orders",
  "admain_view",
];
const protectedAdmainRoutes = [
  "/admain_view",
  "/admain_view/addProducts",
  "/admain_view/allProducts",
];

const GlobalState = ({ children }) => {
  const [showNavModel, setShowNavModel] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [pageLevelLoder, setPageLevelLoder] = useState(false);
  const [componentLevelLoder, setComponentLevelLoder] = useState({
    lodaing: false,
    id: "",
  });
  const [getCurrentProduct, setGetCurrentProduct] = useState(null);
  const [allorderForAdmin,setAllorderForAdmin]=useState([])
  const [user, setUser] = useState(null);
  const [showCartModel, setShowCartModel] = useState(false);
  const [cartitems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [CheckOutFormData, setCheckOutFormData] = useState(
    initialCheckoutFormData
  );
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [allOrdersForUser,setAllOrdesForUser]=useState([])
  const [orderDetails,setOrderDetails]=useState(null)
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const data = JSON.parse(localStorage.getItem("user")) || {};
      const getCartItems = JSON.parse(localStorage.getItem("cartitems")) || [];
      setUser(data);
      setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({});
    }
  }, [Cookies]);

  useEffect(() => {
    if (pathName !=='/register' && pathName !=='/' && !pathName.includes('/product') &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRouts.includes(pathName) > -1
    )
      router.push("/login");
  }, [user, pathName]);
  useEffect(() => {
    if (
      user !== null &&
      Object.keys(user).length > 0 &&
      user.role !== "admin" &&
      protectedAdmainRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized");
  }, [user, pathName]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModel,
        setShowNavModel,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        pageLevelLoder,
        setPageLevelLoder,
        componentLevelLoder,
        setComponentLevelLoder,
        getCurrentProduct,
        setGetCurrentProduct,
        showCartModel,
        setShowCartModel,
        cartitems,
        setCartItems,
        address,
        setAddress,
        addressFormData,
        setAddressFormData,
        CheckOutFormData,
        setCheckOutFormData,
        allOrdersForUser,
        setAllOrdesForUser,
        orderDetails,
        setOrderDetails,
        allorderForAdmin,
        setAllorderForAdmin
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
