"use client";

import InputComponent from "@/app/components/Navbar/formComponent/inputComponent";
import SelectComponent from "@/app/components/Navbar/formComponent/selectComponent";
import TileComponent from "@/app/components/Navbar/formComponent/tileComponent";
import ComponentLevelLoader from "@/app/components/Navbar/loderComponentLevel";
import { GlobalContext } from "@/app/context";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/app/utilites";
import { newProducts, updateProducts } from "@/services/products";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Notification from "@/app/components/notification";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const initialstate = {
  name: "",
  price: 0,
  description: "",
  catagory: "Man",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imgUrl: "",
  priceDrop: 0,
};

export default function AdminViewAddproducts() {
  const [formData, setFormData] = useState(initialstate);
  const {
    componentLevelLoder,
    setComponentLevelLoder,
    getCurrentProduct,
    setGetCurrentProduct,
  } = useContext(GlobalContext);
  const router = useRouter();

  let inputkey = 1;
  let selectkey = 10;
  console.log(getCurrentProduct);
  useEffect(() => {
    if (getCurrentProduct !== null) setFormData(getCurrentProduct);
  }, [getCurrentProduct]);
  const createUniqeFilename = (getFile) => {
    const timeStampt = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
    return `${getFile.name}-${timeStampt}-${randomStringValue}`;
  };

  async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqeFilename(file);
    const storageRefferance = ref(storage, `ecommerce/${getFileName}`);
    const uploadeImage = uploadBytesResumable(storageRefferance, file);
    return new Promise((resolve, reject) => {
      uploadeImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadeImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }
  async function handelImage(event) {
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );
    console.log(extractImageUrl);
    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imgUrl: extractImageUrl,
      });
    }
  }
  function handelTileClick(getCurentItem) {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex((item) => item.id === getCurentItem.id);
    if (index === -1) {
      copySizes.push(getCurentItem);
    } else {
      copySizes = copySizes.filter((item) => item.id !== getCurentItem.id);
    }
    setFormData({
      ...formData,
      sizes: copySizes,
    });
  }
  async function handelAddProduct() {
    setComponentLevelLoder({ lodaing: true, id: "" });
    console.log(getCurrentProduct);
    const res =
      getCurrentProduct !== null
        ? await updateProducts(formData)
        : await newProducts(formData);

    if (res.success) {
      setGetCurrentProduct(null)
      setComponentLevelLoder({ lodaing: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(initialstate);
      setTimeout(() => {
        router.push("/admain_view/allProducts");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoder({ lodaing: false, id: "" });
      setFormData(initialstate);
    }
  }
  useEffect(() => {
    setGetCurrentProduct(getCurrentProduct);
  }, []);

  return (
    <div className="w-full mr-0 ml-0 mb-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl roun relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="/image*"
            max={1000000}
            type="file"
            onChange={handelImage}
          />
          <div className="flex gap-2 flex-col">
            <label>Available Sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handelTileClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((item) =>
            item.componentType === "input" ? (
              <InputComponent
                key={inputkey++}
                type={item.id}
                placeholder={item.placeholder}
                label={item.label}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [item.id]: e.target.value,
                  });
                }}
                value={formData[item.id]}
              />
            ) : item.componentType === "select" ? (
              <SelectComponent
                key={selectkey++}
                label={item.label}
                option={item.options}
                value={formData[item.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [item.id]: e.target.value,
                  });
                }}
              />
            ) : null
          )}
          <button
            onClick={handelAddProduct}
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-white font-medium uppercase"
          >
            {componentLevelLoder && componentLevelLoder.lodaing ? (
              <ComponentLevelLoader
                text={getCurrentProduct !== null ?"updating Product": "Adding product"}
                color={"#ffffff"}
                loading={componentLevelLoder && componentLevelLoder.loading}
              />
            ) : getCurrentProduct !== null ? (
              "update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
}
