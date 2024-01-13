'use client'

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"



export default function CommonCart({cartitems=[],handelDeletes}){
    const [totel,settotal]=useState(0)
    
    const router=useRouter()

  
   useEffect(()=>{
    settotal(0)
 const sum=cartitems.map(item=>(item.productID.price))
 let sss=0
 console.log(sum)
for (let i = 0; i < sum.length; i++) {
  sss=sum[i]+sss
}
settotal(sss)

 
   },[cartitems])



        

       
    

    return(
        <section className="h-screen bg-gray-100">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow">
                        {cartitems && cartitems.length ? (
                        <div className="px-4 py-6 sm:px-8 lg:py-10">
                            <div className="flow-root">
                                {
                                    cartitems && cartitems.length ?
                                    <ul className="-my-8">
                                        {
                                            cartitems.map((item)=>(
                                                <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0" key={item._id}>
                                                    <div className="shrink-0">
                                                        <img
                                                        src={item && item.productID && item.productID.imgUrl}
                                                        alt="product"
                                                        className="h-24 w-25 max-w-full rounded-lg object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-between">
                                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                            <div className="pr-8 sm:pr-4">
                                                                <p className="text-base font-semibold text-gray-900">
                                                                  {item && item.productID && item.productID.name}  
                                                                </p>
                                                            </div>
                                                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-between">
                                                                <p className="shrink-0 w-20 text-base text-gray-900 sm:order-1 sm:ml-8 sm:text-right">
                                                                     {item && item.productID && item.productID.price}
                                                                </p>
                                                                <button onClick={()=>handelDeletes(item._id)} type="button" className="font-medium text-yellow-700 sm:order-2">Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </li>
                                            ))
                                        }
                                    </ul>
                                    : null
                                }
                            </div>
                            <div className="pt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Subtotal</p>
                                    <p className="text-lg text-gray-400 font-semibold">
                                        ${
                                          totel
                                        }
                                    </p>
                                </div>
                                 <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">shiping</p>
                                    <p className="text-lg text-gray-400 font-semibold">
                                        $0
                                    </p>
                                </div>
                                 <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">total</p>
                                    <p className="text-lg text-gray-400 font-semibold">
                                        ${
                                          totel
                                        }
                                    </p>
                                </div>
                                <div className="mt-5 text-center">
                                        <button className="group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">Checkout</button>
                                </div>
                            </div>
                        </div>
                         ) : <h1 className="p-8 uppercase font-semibold text-lg m-auto !"> your Cart in empty</h1>}
                    </div>
               
                </div>
            </div>
        </section>

    )
}