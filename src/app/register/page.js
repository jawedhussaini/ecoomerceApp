"use client";
import { useContext, useEffect, useState } from "react";
import InputComponent from "../components/Navbar/formComponent/inputComponent";
import SelectComponent from "../components/Navbar/formComponent/selectComponent";
import { registrationFormControls } from "../utilites";
import { registerNewUser } from "@/services/register";
import { GlobalContext } from "../context";
import { useRouter } from "next/navigation";



const inrRister = false;
const initialState={
  name:"",
  email:"",
  password:"",
  role:"customer",
}


export default function Register() {
  const [formData,setformData]=useState(initialState)
  const {isAuthUser}=useContext(GlobalContext)
  const router=useRouter()
    let keys=1
    function isFormValid(){

     return formData && formData.name &&formData.name.trim() !==''
      && formData.email &&formData.email.trim() !==''
      && formData.password &&formData.password.trim() !=='' ? true : false
    }

   async function handelRegister(){
      const data =await registerNewUser(formData)
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
                {inrRister
                  ? "Registration Succesfull"
                  : "Sing up for An Account"}
              </p>
              {inrRister ? (
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                  Login
                </button>
              ) : 
              <div className="w-full mt-6 mr-0 ml-0 mb-0 relative space-y-8">
                {
                    registrationFormControls.map(items=>(
                        items.componentType==="input"?
                        <InputComponent 
                        key={keys++}
                        type={items.type}
                        placeholder={items.placeholder}
                        label={items.label}
                        onChange={(event)=>{
                          setformData({
                            ...formData,
                            [items.id]:event.target.value
                        })
                        
                        }}
                        value={formData[items.id]}
                        /> :items.componentType==="select"?
                        <SelectComponent key={6}
                        label={items.label}
                        option={items.options}
                           onChange={(event)=>{
                          setformData({
                            ...formData,
                            [items.id]:event.target.value
                        })
                        
                        }}
                        value={formData[items.id]}
                        /> :null
                    ))
                }
                <button onClick={handelRegister} disabled={!isFormValid()} className="inline-flex disabled:opacity-50 w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">Register</button>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
