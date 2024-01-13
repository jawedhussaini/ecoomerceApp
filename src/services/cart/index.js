import Cookies from "js-cookie";

export const addToCart = async (formData) => {
  try {
    const data = await fetch("/api/cart/addToCart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
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

export const getAllCartItem = async (id) => {
  try {
    const data = await fetch(`/api/cart/allCartItems?id=${id}`, {
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

export const deleteCartItem = async (id) => {
  try {
    const data = await fetch(`/api/cart/deketeFromCart?id=${id}`, {
      method: "DELETE",
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
