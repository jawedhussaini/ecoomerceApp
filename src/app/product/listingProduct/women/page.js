import CommonListion from "@/app/components/commonListing";
import { allProductsByCatagory, getProductByCatagory } from "@/services/products";




export default async function WomenAllProducts(){
    const data=await allProductsByCatagory('women')
    return(
        <CommonListion data={data}/>
    )
}