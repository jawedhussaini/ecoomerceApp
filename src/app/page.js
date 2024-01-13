"use client"

import { allAdminProducts } from "@/services/products"
import { useEffect, useState } from "react"



export default function Home() {
const [product,setProduct]=useState([])

async function getListOfProduct(){
  const res=await allAdminProducts()

  if(res.success){
    setProduct(res.data)
  }
}
useEffect(()=>{
  getListOfProduct()
},[])

console.log(product)
 
  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Best Fashion Shop</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">For greater security, you can create restricted API keys that limit access and permissions for different areas of your account data.</p>
            <button type="buttton" className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Shop Colection</button>
          </div>
        </div>
      </section>
    </main>
  )
}
