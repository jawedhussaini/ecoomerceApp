"use client"

import { useEffect } from "react"
import ProductButton from "./productButtons"
import ProductTile from "./productTles"
import { useRouter } from "next/navigation"
import Notification  from "../../components/notification"




export default function CommonListion({data}){
   const router=useRouter()


   useEffect(()=>{
      router.refresh()
   },[])


    return (
        <section className="bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 ms:grid-col-6 sm:gap-4 lg:mt-16">
                    {
                       data.data && data.data.length?
                        data.data.map((item)=>(
                            <article className="relative flex flex-col overflow-hidden cursor-pointer border" key={item.id}>
                                 <ProductTile  item={item}/>
                                 <ProductButton item={item}/> 
                            </article>
                        ))
                       :null 
                      
                    }
                </div>
              <Notification/>
            </div>
            
        </section>
    )
}
