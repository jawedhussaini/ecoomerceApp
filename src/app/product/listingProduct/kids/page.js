import CommonListion from "@/app/components/commonListing";
import {allProductsByCatagory} from "@/services/products";




export default async function KidAllProducts(){
    const data=await allProductsByCatagory('kid')
 

    return(
        <CommonListion data={data}/>
    )
}