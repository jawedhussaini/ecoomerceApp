import Cookies from "js-cookie";

//add all products
export const newProducts = async (fromdata) => {
  try {
    const reponse = await fetch("/api/admin/addProducts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(fromdata),
    });
    const finalData = await reponse.json();
    return finalData;
  } catch (e) {
    console.log(e);
  }
};

export const allAdminProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/admin/allProducts",
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const updateProducts = async (formData) => {
  try {
    const response = await fetch("/api/admin/updateProduct", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const deleteProduct = async (id) => {
  try {
    const reponse = await fetch(`/api/admin/deleteProduct?id=${id}`, {
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
export const allProductsByCatagory = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/productByCatagory?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
       
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const findProductById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/productById?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
       
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
