import { Fragment, useContext, useEffect } from "react";
import CommenModel from "../Navbar/commenModel";
import { GlobalContext } from "@/app/context";
import { deleteCartItem, getAllCartItem } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Navbar/loderComponentLevel";
import { useRouter } from "next/navigation";

export default function CartModel() {
  const router=useRouter()
  const {
    showCartModel,
    setShowCartModel,
    user,
    cartitems,
    setCartItems,
    setCartItemscomponentLevelLoder,
    setComponentLevelLoder,
    componentLevelLoder,
  } = useContext(GlobalContext);

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
  return (
    <>
      <CommenModel
        showButton={true}
        show={showCartModel}
        setShow={setShowCartModel}
        mainContaint={
          cartitems && cartitems.length ? (
            <ul role="list" className="-my-6 divide-y divide-gray-300">
              {cartitems.map((cartItem) => (
                <li key={cartItem._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-e-gray-200">
                    <img
                      src={
                        cartItem &&
                        cartItem.productID &&
                        cartItem.productID.imgUrl
                      }
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a>
                            {cartItem &&
                              cartItem.productID &&
                              cartItem.productID.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          ${" "}
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.price}
                        </p>
                      </div>
                      <div className="flex flex-1 mt-4 items-end justify-between text-sm">
                        <button
                          onClick={() => handelDelete(cartItem._id)}
                          type="button"
                          className="font-medium text-yellow-600 sm:order-2"
                        >
                          {componentLevelLoder &&
                          componentLevelLoder.lodaing &&
                          componentLevelLoder.id === cartItem._id ? (
                            <ComponentLevelLoader
                            text={"removing"}
                            color={"#000000"}
                            loading={componentLevelLoder && componentLevelLoder.lodaing} />
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null
        }
        buttonComponent={
          <Fragment>
            <button
              type="button"
              className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 font-medium uppercase tracking-wide"
            >
              Go to Cart
            </button>
            <button
              onClick={()=>{
                setShowCartModel(false)
                router.push('/checkOut')}}
              disabled={cartitems && cartitems.length === 0}
              type="button"
              className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 font-medium uppercase tracking-wide disabled:opacity-50"
            >
              check Out
            </button>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
              <button type="button" className="text-gray font-medium">
                Continue Shoping
                <span aria-hidden={true}>&rarr;</span>
              </button>
            </div>
          </Fragment>
        }
      />
    </>
  );
}
