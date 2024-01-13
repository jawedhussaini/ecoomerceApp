"use client";

import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { getAllOrder } from "@/services/order";
import { useRouter } from "next/navigation";

export default function Orders() {
  const { user, allOrdersForUser, setAllOrdesForUser } =
    useContext(GlobalContext);
    const router=useRouter()

  async function extractAllOrders() {
    const res = await getAllOrder(user?._id);

    if (res.success) {
      setAllOrdesForUser(res.data);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);
  console.log(allOrdersForUser);

  return (
    <section className="h-screen bg-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-auto mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((items) => (
                      <li
                        className="flex bg-white shadow p-5 flex-col space-y-3 py-6 text-left"
                        key={items._id}
                      >
                        <div className="flex">
                          <h1 className="font-bold text-lg mb-3 flex-1">
                            #order {items._id}
                          </h1>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              ToTal Paid Amount
                            </p>
                            <p className="mr-3 text-2xl font-semibold text-gray-900">
                              ${items.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {items.orderItems.map((orderItem, index) => (
                            <div className="shrink-0" key={index}>
                              <img
                                alt="order Item"
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imgUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="mt-3 mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                          >
                            {items.isProcessing
                              ? "order is Processing"
                              : "order delivered"}
                          </button>
                          <button
                          onClick={()=>router.push(`/orders/${items._id}`)}
                            type="button"
                            className="mt-3 mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                          >
                            order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
