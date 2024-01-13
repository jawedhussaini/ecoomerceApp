import Cookies from "js-cookie";

export const createOrder = async (formData) => {
  try {
    const res = await fetch("/api/order/createOrder", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
export const getAllOrder = async (id) => {
  try {
    const res = await fetch(`/api/order/getAllOrder?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
export const getOrderDetails = async (id) => {
  try {
    const res = await fetch(`/api/order/orderDetails?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrderForAdmin = async() => {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/order/getAllOrder`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
export const updateOrderStatus = async (formData) => {
  try {
    const res = await fetch("/api/admin/order/updateOrder", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body:JSON.stringify(formData)
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
