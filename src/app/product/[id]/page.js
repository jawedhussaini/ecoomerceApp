
import CommonDetails from "@/app/components/commonDetails";
import { findProductById } from "@/services/products";




export default async function DetailsProducts({params}){
    const data=await findProductById(params.id)
   
 return (
   <div className="bg-white w-auto">
   <CommonDetails item={data.data}/>
   </div>
 )
}