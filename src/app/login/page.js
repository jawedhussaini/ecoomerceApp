"use client";

import { loginFormControls } from "../utilites";
import InputComponent from "../components/Navbar/formComponent/inputComponent";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { login } from "@/services/login";
import { GlobalContext } from "../context";
import Cookies from "js-cookie";
import ComponentLevelLoader from "../components/Navbar/loderComponentLevel";
import Notification from "../components/notification";
import { toast } from "react-toastify";

const initialState={
  email:"",
  password:""
}

export default function Login() {
    const router=useRouter()
    const [formData,setformdate]=useState(initialState)
    const {isAuthUser,setIsAuthUser,user,setUser,componentLevelLoder,
        setComponentLevelLoder,}=useContext(GlobalContext)
    console.log(formData)
    let keys=1
    function isValidForm(){
      return formData && formData.email && formData.email.trim() &&
      formData.password && formData.password.trim() !=='' ? true : false
    }

   async function handelLogin(){
    setComponentLevelLoder({lodaing:true,id:''})
    const res=await login(formData)
    if(res.success){
      toast.success(res.message, {
      position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true)
      setUser(res?.finalData?.user)
      setformdate(initialState)
      Cookies.set('token',res?.finalData?.token)
      localStorage.setItem('user',JSON.stringify(res?.finalData?.user))
      setComponentLevelLoder({lodaing:false,id:''})
    }
    else{
       toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false)
      setComponentLevelLoder({lodaing:false,id:''})
    }
   }

   useEffect(()=>{
    if(isAuthUser){
      router.push("/")
    }
   },[isAuthUser])
  return (
    <div className="bg-white relative min-h-screen">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 ml-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 ml-0 mb-0 relative space-y-8">
                {loginFormControls.map((items) =>
                  items.componentType === "input" ? (
                    <InputComponent
                    key={keys++}
                      type={items.type}
                      placeholder={items.placeholder}
                      label={items.label}
                      
                      onChange={(event)=>{
                        setformdate({
                          ...formData,
                          [items.id]:event.target.value
                        })
                      }}
                      value={formData[items.id]}
                    />
                  ) : null
                )}
                <button onClick={handelLogin} disabled={!isValidForm()} className="inline-flex disabled:opacity-50 w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                  {
                    componentLevelLoder && componentLevelLoder.lodaing ?<ComponentLevelLoader
                    text={"Loging in"}
                    color={"#ffffff"}
                    loading={componentLevelLoder && componentLevelLoder.loading}
                    /> : 'Login'
                  }
                </button>
                <div className="flex flex-col gap-2">
                  <p>Are you new to wibside ?</p>
                  <button onClick={()=>router.push('./register')} className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification/>
    </div>
  );
}
