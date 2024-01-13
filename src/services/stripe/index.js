import Cookies from "js-cookie"




export const callStripeSession=async(formData)=>{

try{

    
    const response=await fetch("/api/stripe",{
        method:"POST",
        headers:{
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
        }
        ,body:JSON.stringify(formData)
    })
    const res=await response.json()
    return res
}
catch(e){
    console.log(e)
}


}