"use client";

import { GlobalContext } from "@/app/context";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/services/products";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../../Navbar/loderComponentLevel";
import { addToCart } from "@/services/cart";
import CartModel from "../../cartModel";

export default function ProductButton({ item }) {
  const pathNanem = usePathname();
  const isadminView = pathNanem.includes("admain_view");
  const router = useRouter();
  const { setGetCurrentProduct, setComponentLevelLoder, componentLevelLoder,user,showCartModel,setShowCartModel } =
    useContext(GlobalContext);

  async function handelDelete(item) {
      setComponentLevelLoder({ lodaing: true, id: item._id });
    const res = await deleteProduct(item._id);
    if (res.success) {
      setGetCurrentProduct(null);
      setComponentLevelLoder({ lodaing: false, id:'' });
      toast.success(res.massage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh()
    } else {
      toast.error(res.massage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoder({ lodaing: false, id: item._id });
    }
  }

  async function handelAddToCart(item){
    setComponentLevelLoder({lodaing:true,id:item._id})
    const res=await addToCart({productID:item._id,userID:user._id})
    if(res.success){
      
       toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
       setComponentLevelLoder({lodaing:false,id:''})
       setShowCartModel(true)
    }
    else{
       toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
       setComponentLevelLoder({lodaing:false,id:''})
       setShowCartModel(true)
    }
 
  }
  return isadminView ? (
    <>
      <button
        onClick={() => {
          setGetCurrentProduct(item);
          router.push("/admain_view/addProducts");
        }}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Update
      </button>
      <button
        onClick={() => {
          handelDelete(item);
        }}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoder &&
        componentLevelLoder.lodaing &&
        componentLevelLoder.id === item._id ? (
          <ComponentLevelLoader
            text={"deleting product"}
            color={"#ffffff"}
            loading={componentLevelLoder && componentLevelLoder.lodaing}
          />
        ) : (
          "delete"
        )}
      </button>
    </>
  ) : (
    <>
      <button onClick={()=>handelAddToCart(item)} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
       {
        componentLevelLoder &&
        componentLevelLoder.lodaing &&
        componentLevelLoder.id === item._id ? 
          <ComponentLevelLoader
            text={"deleting product"}
            color={"#ffffff"}
            loading={componentLevelLoder && componentLevelLoder.lodaing}
          />:'Add to Cart'
       }
        
      </button>

    </>
  );
}
