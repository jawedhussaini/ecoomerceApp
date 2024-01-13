import CommonListion from "@/app/components/commonListing";
import { allProductsByCatagory } from "@/services/products";




export default async function MennAllProducts(){
    const data=await allProductsByCatagory('men')
  
    return(
        <CommonListion data={data}/>
    )
}