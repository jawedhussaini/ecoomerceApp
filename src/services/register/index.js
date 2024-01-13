export const registerNewUser = async (formData) => {
  try {
    const response = await fetch("/api/register", {
      method:"POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const finnalData =await response.json();
    return finnalData;
  } catch (e) {
    console.log("erroreeeeeeeee", e);
  }
};
