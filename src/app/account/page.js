"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context";
import { addNewAddressFormControls } from "../utilites";
import InputComponent from "../components/Navbar/formComponent/inputComponent";
import { addNewAddress, deleteAddress, getAllAdress, updateAddress } from "@/services/address";
import { toast } from "react-toastify";
import Notification from "../components/notification";
import { useRouter } from "next/navigation";

export default function Account() {
  const { user, address, setAddress, addressFormData, setAddressFormData } =
    useContext(GlobalContext);
    const router=useRouter()
  const [showAdressForm, setShowAdressForm] = useState(false);
    const [currentAddressId, setCurrentAddressId] = useState(null);
  async function handelCreateOrUpdateAddess() {
    const res=
    currentAddressId !== null ?
    await updateAddress({addressFormData,_id:currentAddressId}) :await addNewAddress({ ...addressFormData, userID: user?._id });
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAdress()
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  async function handelUpdateAddress(item){
    setShowAdressForm(true)
    setAddressFormData({
        fullName:item.fullName,
        address:item.address,
        city:item.city,
        country:item.country,
        postalCode:item.postalCode
    })
    setCurrentAddressId(item._id)
  }
  async function handelDeleteAddress(itemId){
    const res=await deleteAddress(itemId)
    if(res.success){
       toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
        extractAllAdress()
    }
    else{
       toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  async function extractAllAdress() {
    const res = await getAllAdress(user._id);
    if (res.success) {
      setAddress(res.data);
    }
  }
  useEffect(() => {
    if (user !== null) {
      extractAllAdress();
    }
  }, [user]);
  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row"></div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button
              onClick={()=>router.push('/orders')}
              type="button"
              className="mt-3 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            >
              View your order
            </button>
            <h1 className="font-bold mt-3 text-lg">your Address :</h1>
            <div className="mt-4 flex flex-col gap-4">
              {address && address.length ? (
                address.map((item) => (
                  <div className="p-6 mt-5 border" key={item._id}>
                    <p>Name : {item.fullName}</p>
                    <p>Address : {item.address}</p>
                    <p>City : {item.city}</p>
                    <p>Country : {item.country}</p>
                    <p>PostaCode : {item.postalCode}</p>
                    <button
                      type="button"
                      className="mt-3 mr-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                      onClick={()=>handelUpdateAddress(item)}  
                    >
                      Update Address
                    </button>
                    <button 
                     onClick={()=>handelDeleteAddress(item._id)}
                      type="button"
                      className="mt-3 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    >
                      Delete Address
                    </button>
                  </div>
                ))
              ) : (
                <p>NO address found Please add new address</p>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAdressForm(!showAdressForm)}
                type="button"
                className="mt-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
              >
                {showAdressForm ? "Hide Address from" : " Add new Address"}
              </button>
            </div>
            {showAdressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((item) => (
                    <InputComponent
                      type={item.type}
                      placeholder={item.placeholder}
                      label={item.label}
                      value={addressFormData[item.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [item.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handelCreateOrUpdateAddess}
                  type="button"
                  className="mt-5 group inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
