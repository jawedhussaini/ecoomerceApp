"use client";

import { GlobalContext } from "@/app/context";
import { adminNavOptions, navOptions} from "@/app/utilites";
import { Fragment, useContext, useEffect } from "react";
import CommenModel from "./commenModel";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModel from "../cartModel";



function NavItems({isModelView=false,isADminView}) {
  const router=useRouter()
  


  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${isModelView ? '' : 'hidden'}`}
      id="nav-items"
    >
      <ul className={`flex flex-col p-4  mt-4 md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:bottom-0 bg-white ${isModelView ? 'border-none' : 'border border-gray-100'}`}>
        {isADminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-2 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={()=>router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-2 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={()=>router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

const Navbar = () => {
  const pathname=usePathname()
  const router=useRouter()
      const {user,isAuthUser,setIsAuthUser,setUser,getCurrentProduct,setGetCurrentProduct,showCartModel,showNavModel,setShowNavModel}=useContext(GlobalContext)
  console.log(user,isAuthUser,"navbar")
    function handelLoout(){
      setIsAuthUser(false)
      setUser(null)
      Cookies.remove('token')
      localStorage.clear()
      router.push('/')
    }
    const isADminView=pathname.includes('admain_view')
useEffect(()=>{
if(pathname !=='admain_view/addProducts' && getCurrentProduct!==null){
  setGetCurrentProduct(null)
}
},[pathname])
console.log(showCartModel)
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto justify-between p-4">
          <div className="flex items-center cursor-pointer">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Ecommerce
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isADminView && isAuthUser ? (
              <Fragment>
                <button onClick={()=>router.push('/account')} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Account</button>
                <button onClick={()=>router.push('/card')} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Cart</button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isADminView ? (
                <button onClick={()=>router.push('/')} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Client View</button>
              ) : (
                <button onClick={()=>router.push('/admain_view')} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Admin View</button>
              )
            ) : null}
            {isAuthUser ? <button onClick={handelLoout} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">LogOut</button> : <button onClick={()=>router.push('/login')} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">LogIn</button>}
              <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={()=>setShowNavModel(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isADminView={isADminView}/>
        </div>
      </nav>
      <CommenModel showModelTitle={false} mainContaint={<NavItems isModelView={true} isADminView={isADminView}/>} show={showNavModel} setShow={setShowNavModel}/>
    {showCartModel && <CartModel/>}
  
    </>
  );
}; 
export default Navbar;
