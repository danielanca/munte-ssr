// @ts-nocheck

import React, { useState } from "react";
import { updateProduct } from "./../../services/emails";
import { ProductModel } from "./../../utils/OrderInterfaces";


import styles from "./AddProduct.module.scss";

const AddProduct = () => {
  const [editproductModel, setEditProductModel] = useState<ProductModel>({
    ID: "",
    price: "",
    discountedPrice: "",
    productStock: "",
    ghostProductStock: "",
    productStockCheck: false,
    ghostProductStockCheck: "",
    // ghoostProductStockCheckbox: "",
    ghoostProductStockCheckbox: false,
    ULbeneficii: [],
    firstDescription: "",
    imageProduct: [],
    jsonContent: "",
    reviews: {},
    shortDescription: "",
    title: ""
  });
  const inputHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = data.target;

    // if (
    //   (type === "checkbox" && name === "productStockCheck") ||
    //   (type === "checkbox" && name === "ghostProductStockCheck")
    // ) {
    //   setEditProductModel((editproductModel) => ({
    //     ...editproductModel,
    //     [name]: !editproductModel[name]
    //   }));
    //   return;
    // }

    setEditProductModel((editproductModel) => ({
      ...editproductModel,
      [name]: value
    }));
  };

  const submitAddOperation = () => {
    if (editproductModel.title != "") {
      updateProduct(editproductModel).then((response) => {
        console.log("Product addition request sent to Cloud!");
        //needs to process the response
      });
    }
  };
  const separatorHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;
    if (name === "imageProduct" || name === "ULbeneficii") {
      setEditProductModel((editproductModel) => ({
        ...editproductModel,
        [name]: value.split(",")
      }));
    }
  };
  const cancelOperation = () => {
    console.log("Operation cancelled");
  };

  // console.log(editproductModel.ghoostProductStockCheckbox);

  return (
    <div className={styles.addAreaContainer}>
      <h2>{"ADD PRODUCT"}</h2>
      <div className={styles.inputContainer}>
        <div className={"d-flex flex-column"}>
          <label htmlFor="title">{"Product name"}</label>
          <input onChange={inputHandler} name="title" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="ID">{"Link ID Name:"}</label>
          <input onChange={inputHandler} name="ID" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="price">{"Price (RON)"}</label>
          <input onChange={inputHandler} name="price" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="discountedPrice">{"Discounted Price (RON)"}</label>
          <input onChange={inputHandler} name="discountedPrice" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="productStock">{"Product Stock"}</label>
          <input onChange={inputHandler} name="productStock" />
          <input type="checkbox" onChange={inputHandler} name="productStockCheck" />
          {/* <input
            type="checkbox"
            name="productStockCheck"
            onChange={inputHandler}
            checked={editproductModel.productStockCheck}
          /> */}
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="ghostProductStock">{"Ghost Product Stock"}</label>
          <input onChange={inputHandler} name="ghostProductStock" />
          {/* <input onChange={inputHandler} name="ghoostProductStockCheckbox" /> */}
          <input
            onChange={inputHandler}
            name="ghoostProductStockCheckbox"
            checked={editproductModel.ghoostProductStockCheckbox}
          />
          {/* <input
            type="checkbox"
            name="ghostProductStockCheck"
            onChange={inputHandler}
            checked={editproductModel.ghostProductStockCheck}
          /> */}
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="shortDescription">{"short Description"}</label>
          <input onChange={inputHandler} name="shortDescription" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="firstDescription">{"first Description"}</label>
          <input onChange={inputHandler} name="firstDescription" />
        </div>
        {/* <div className={"d-flex flex-column"}>
          <label htmlFor="ULbeneficii">{"Key advantages"}</label>
          <input onChange={separatorHandler} name="ULbeneficii" />
        </div> */}
        <div className={"d-flex flex-column"}>
          <label htmlFor="imageProduct">{"Images"}</label>
          <input onChange={separatorHandler} name="imageProduct" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="jsonContent">{"Full description HTML"}</label>
          <textarea spellCheck="false" onChange={inputHandler} name="jsonContent"></textarea>
        </div>
        <div className={styles.actionControl}>
          <button onClick={submitAddOperation}>{"SAVE"}</button>
          <button onClick={cancelOperation} className={styles.cancelButton}>
            {"CANCEL"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
