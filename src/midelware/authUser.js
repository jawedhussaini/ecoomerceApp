import jwt from "jsonwebtoken";


export const dynamic = "force-dynamic";
const AuthUser=async (req)=>{
    const token=req.headers.get('Authorization')?.split(" ")[1]

    if (!token) return false
    try{
      
        const extractData=jwt.verify(token,"default_secret_key")
      if(extractData) return extractData
    } 
    catch(e){
        console.log(e)
    }
}
export default AuthUser