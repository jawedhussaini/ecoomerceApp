
import CommonListion from "@/app/components/commonListing";
import { allAdminProducts } from "@/services/products";





export default async function AdminViewAllProducts(){
    const allAdminProductsData=await allAdminProducts()
 
    return(
        <div><CommonListion data={allAdminProductsData}/></div>
    )
}