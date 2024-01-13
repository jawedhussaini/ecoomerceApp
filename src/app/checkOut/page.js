"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import { getAllAdress } from "@/services/address";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "@/services/stripe";
import { createOrder } from "@/services/order";

export default function CheckOut() {
  const {
    user,
    cartitems,
    setCartItems,
    address,
    setAddress,
    CheckOutFormData,
    setCheckOutFormData,
  } = useContext(GlobalContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess,setorderSuccess]=useState(false)
  const params = useSearchParams();
  const poblishAbbleKey =
    "pk_test_51O3PbtSAbdJhEjld0RNmPeY67AaZeVjRERsx3DehqtsB8orQYc2oBKgp5rGs1KiAbiYbgNnhUTf64P9RzVm76lvI005NhVJKOT";
  const stripPromise = loadStripe(poblishAbbleKey);
  const router = useRouter();
  async function fechAllAddress() {
    const res = await getAllAdress(user?._id);
    console.log(res.data);
    if (res.success) {
      setAddress(res.data);
    }
  }
  function handelSelectAddress(item) {
    if (selectedAddress === item._id) {
      setSelectedAddress(null);
      setCheckOutFormData({
        ...CheckOutFormData,
        shippingAddress: {},
      });

      return;
    }
    setSelectedAddress(item._id);

    setCheckOutFormData({
      ...CheckOutFormData,
      shippingAddress: {
        ...CheckOutFormData.shippingAddress,
        fullName: item.fullName,
        address: item.address,
        city: item.city,
        country: item.country,
        postalCode: item.postalCode,
      },
    });
    console.log(CheckOutFormData.shippingAddress);
  }

  useEffect(() => {
    if (user !== null) {
      fechAllAddress();
    }
  }, [user]);
  useEffect(() => {
    async function createFinalOrder() {
      console.log("innnnnnnnnnn");
      const isStripe = JSON.parse(localStorage.getItem("stripe"));
      console.log(isStripe);
      if (
        isStripe &&
        params.get("status") === "success" &&
        cartitems &&
        cartitems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormDatas")
        );
        const finalCheckFormData = {
          user: user?._id,

          orderItems: cartitems.map((items) => ({
            qty: 1,
            product: items.productID,
          })),
          shippingAddress: getCheckoutFormData.shippingAddress,
          paymentMethod: "stripe",
          totalPrice: cartitems.reduce(
            (total, item) => item.productID.price + total,
            0
          ),

          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };
        const res = await createOrder(finalCheckFormData);
        setIsOrderProcessing(false);
        if(res.success){
            setorderSuccess(true)
        }
        
      }
    }
    createFinalOrder();
  }, [params.get("status"), cartitems]);

  async function handelCheckout() {
    const stripe = await stripPromise;

    const createLineItems = cartitems.map((itmes) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [itmes.productID.imgUrl],
          name: itmes.productID.name,
        },
        unit_amount: itmes.productID.price * 100,
      },
      quantity: 1,
    }));
    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    console.log(CheckOutFormData);
    localStorage.setItem("checkoutFormDatas", JSON.stringify(CheckOutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });
    console.log(error);
  }
  useEffect(()=>{
    if(orderSuccess){
        setTimeout(()=>{
           
            router.push('/orders')

        },2500)
    }

  },[orderSuccess])

 if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successfull and you will be redirected to
                  orders page in 2 seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-3 bg-white sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="mt-8 mb-5 p-5 space-y-3 rounded-lg border bg-white sm:px-5">
        <p className="text-gray-800 text-xl font-bold">Cart Summery</p>
        {cartitems && cartitems.length ? (
          cartitems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col rounded-lg bg-white sm:flex-row"
            >
              <img
                src={item && item.productID && item.productID.imgUrl}
                alt="card product"
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-bold">
                  {item && item.productID && item.productID.name}
                </span>
                <span className="font-semibold">
                  {item && item.productID && item.productID.price}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>Your Cart Is Empty! </div>
        )}
      </div>
      <div className="mt-10 mb-5 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Shoping Address Details</p>
        <p className="text-gray-400 font-bold">
          Complete Your Order By Selecting your Current Address
        </p>
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
          {address && address.length ? (
            address.map((item) => (
              <div
                className={`p-6 border ${
                  selectedAddress === item._id ? "border-red-600" : ""
                }`}
                key={item._id}
              >
                <p>Name : {item.fullName}</p>
                <p>Address : {item.address}</p>
                <p>City : {item.city}</p>
                <p>Country : {item.country}</p>
                <p>PostaCode : {item.postalCode}</p>
                <button
                  type="button"
                  className="mt-3 mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                  onClick={() => handelSelectAddress(item)}
                >
                  {selectedAddress === item._id
                    ? "Address Selected"
                    : "Select Address"}
                </button>
              </div>
            ))
          ) : (
            <p>No Address Added</p>
          )}
        </div>
        <button
          type="button"
          className="mt-3 mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          onClick={() => router.push("/account")}
        >
          Add New Address
        </button>
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotla</p>
            <p className="text-lg font-bold text-gray-900">
              $
              {cartitems && cartitems.length
                ? cartitems.reduce(
                    (total, item) => item.productID.price + total,
                    0
                  )
                : "0"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shoping</p>
            <p className="text-lg font-bold text-gray-900">Free</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">ToTal</p>
            <p className="text-lg font-bold text-gray-900">
              $
              {cartitems && cartitems.length
                ? cartitems.reduce(
                    (total, item) => item.productID.price + total,
                    0
                  )
                : "0"}
            </p>
          </div>
          <button
            disabled={
              (cartitems && cartitems.length === 0) || selectedAddress === null
            }
            type="button"
            className="mt-3 disabled:opacity-50 w-full mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            onClick={handelCheckout}
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
}
