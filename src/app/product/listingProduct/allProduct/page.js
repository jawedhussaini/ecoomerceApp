import CommonListion from "@/app/components/commonListing";
import { allAdminProducts } from "@/services/products";




export default async function AllProducts(){
    const data=await allAdminProducts()
    return(
        <CommonListion data={data}/>
    )
}