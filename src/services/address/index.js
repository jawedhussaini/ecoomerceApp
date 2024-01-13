import Cookies from "js-cookie";

export const addNewAddress = async (formData) => {
  try {
    const data = await fetch("api/adress/createAdress", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const finalData = await data.json();
    return finalData;
  } catch (e) {
    console.log(e);
  }
};

export const getAllAdress = async (id) => {
  try {
    const data = await fetch(`api/adress/allAddress?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const finalData = await data.json();
    return finalData;
  } catch (e) {
    console.log(e);
  }
};

export const updateAddress = async (formData) => {
  try {
    const data = await fetch("api/adress/updateAddress", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const finalData = await data.json();
    return finalData;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAddress = async (id) => {
  try {
    const reponse = await fetch(`/api/adress/deleteAddress?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await reponse.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
