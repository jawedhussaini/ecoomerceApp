"use client";
import { getAllOrderForAdmin, updateOrderStatus } from "@/services/order";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";

export default function AdminView() {
  const { allorderForAdmin, setAllorderForAdmin, user } =
    useContext(GlobalContext);

  async function extractAllData() {
    const alldata = await getAllOrderForAdmin();
    setAllorderForAdmin(
      alldata.data && alldata.data.length
        ? alldata.data.filter((item) => item.user._id !== user._id)
        : null
    );
  }

  async function handelUpdateStatus(items){
    const res=await updateOrderStatus(
        {
            ...items,
            isProcessing:false
        }
    )
    console.log(res)
    if(res.success){
        extractAllData()
    }
  }

  useEffect(() => {
    if (user !== null) extractAllData();
  }, [user]);

  console.log(allorderForAdmin);
  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <div className="w-full px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            {allorderForAdmin && allorderForAdmin.length ? (
              <ul className="flex flex-col gap-4">
                {allorderForAdmin.map((items) => (
                  <li
                    className="flex bg-white shadow p-5 flex-col space-y-3 py-6 text-left"
                    key={items._id}
                  >
                    <div className="flex">
                      <h1 className="font-bold text-lg mb-3 flex-1">
                        #order {items._id}
                      </h1>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <p className="mr-3 text-sm font-medium text-gray-900">
                            User Name:
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {items.user.name}
                          </p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <p className="mr-3 text-sm font-medium text-gray-900">
                            User Email:
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {items.user.email}
                          </p>
                        </div>
                          <div className="flex gap-3 items-center">
                          <p className="mr-3 text-sm font-medium text-gray-900">
                            Totla Amount:
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            ${items.totalPrice}
                          </p>
                        </div>
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
                      onClick={()=>handelUpdateStatus(items)}
                        type="button"
                        className="disabled:opacity-50 mt-3 mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                      disabled={items.isProcessing ===false}
                      >
                        update Order status
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
