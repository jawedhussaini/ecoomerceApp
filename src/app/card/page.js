'use client'

import { deleteCartItem, getAllCartItem } from "@/services/cart";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import CommonCart from "../components/commonCart";
import { toast } from "react-toastify";


export default function Cart(){
    const{user,setCartItems,cartitems,setComponentLevelLoder,componentLevelLoder}=useContext(GlobalContext)
 async function extractAllcartItems() {
    const data = await getAllCartItem(user?._id);
    if (data.success) {
      setCartItems(data.data);
      localStorage.setItem("cartitems", JSON.stringify(data.data));
    }
  }

  async function handelDelete(cartItemId) {
    setComponentLevelLoder({ lodaing: true, id: cartItemId });
    const res = await deleteCartItem(cartItemId);
    if (res.success) {
      setComponentLevelLoder({ lodaing: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllcartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoder({ lodaing: false, id: "" });
    }
  }



   useEffect(() => {
    if (user !== null) {
      extractAllcartItems();
    }
  }, [user]);



    return(
        <CommonCart handelDeletes={handelDelete} cartitems={cartitems}/>
    )
}