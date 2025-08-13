// @ts-nocheck

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductPreview from "../Product/ProductPreview";
import { getProductWithID } from "../../data/productListold";
import { updateProduct } from "./../../services/emails";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import styles from "./EditProduct.module.scss";
import ImageComponent from "./ImageComponent/ImageComponent";

const EditProduct = () => {
  const [openPreviewArea, setOpenPreviewArea] = useState(false);
  const params = useParams();
  const ID = params.id !== undefined ? params.id : "";
  const [productListUpdated, setProducts] = useState(null);
  const [editSent, setEditSent] = useState(false);
  const [editproductModel, setEditProductModel] = useState({
    ID: "",
    price: "",
    ULbeneficii: [],
    firstDescription: "",
    discountedPrice: "",
    realStock: "",
    realStockCheck: "",
    fakeStock: "",
    fakeStockCheck: "",
    imageProduct: ["", "", ""],
    jsonContent: "",
    reviews: {},
    shortDescription: "",
    title: ""
  });

  const navigate = useNavigate();
  const isMounted = useRef(true);

  // Get product by ID (on mount or ID change)
  useEffect(() => {
    isMounted.current = true;
    if (!productListUpdated) {
      getProductWithID(ID).then((finalData) => {
        if (isMounted.current) setProducts(finalData);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [ID, productListUpdated]);

  // Update product model when productListUpdated changes
  useEffect(() => {
    if (productListUpdated && productListUpdated[ID]) {
      setEditProductModel(productListUpdated[ID]);
    }
  }, [productListUpdated, ID]);

  // Confirmation feedback timeout
  useEffect(() => {
    if (editSent) {
      const timer = setTimeout(() => setEditSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [editSent]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditProductModel((prev) => ({ ...prev, [name]: value }));
  };

  const separatorHandler = (e) => {
    const { name, value } = e.target;
    if (name === "imageProduct" || name === "ULbeneficii") {
      setEditProductModel((prev) => ({
        ...prev,
        [name]: value.split(",")
      }));
    }
  };

  const submitEditOperation = () => {
    setEditSent(true);
    if (editproductModel.title) {
      updateProduct(editproductModel).then((response) => {
        // handle success/response if needed
      });
    }
  };

  const previewOperation = () => setOpenPreviewArea((prev) => !prev);

  const cancelOperation = () => navigate("/admin/manage-product");

  const handleUrlsUpdated = (newUrls) => {
    setEditProductModel((prevModel) => {
      const updatedImageProduct = [...prevModel.imageProduct];
      newUrls.forEach((url, index) => {
        updatedImageProduct[index] = url;
      });
      return { ...prevModel, imageProduct: updatedImageProduct };
    });
  };

  const onDelete = (index) => {
    const updatedImageProduct = editproductModel.imageProduct.filter((_, idx) => idx !== index);
    setEditProductModel((prevModel) => ({
      ...prevModel,
      imageProduct: updatedImageProduct
    }));
    updateProduct({ ...editproductModel, imageProduct: updatedImageProduct });
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4"></Row>
      <Row>
        <Col>
          <div className={styles.editPage}>
            {productListUpdated ? (
              <div className={styles.addAreaContainer}>
                <h3>Edit Product</h3>
                <div className={styles.inputContainer}>
                  <div className={styles.imageContainer}>
                    <label htmlFor="imageProduct">Images</label>
                    <div className={styles.imagesComponents}>
                      <ImageComponent
                        existingImageUrls={editproductModel.imageProduct}
                        onUrlsUpdated={handleUrlsUpdated}
                        onDelete={onDelete}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.inputContainer}>
                  <div className={styles.rowSpacer}>
                    <div className={styles.inputFielder}>
                      <label htmlFor="title">Product name</label>
                      <input onChange={inputHandler} name="title" value={editproductModel.title} />
                    </div>
                    <div className={styles.inputFielder}>
                      <label htmlFor="ID">Link ID Name:</label>
                      <input
                        style={{ opacity: "0.6", pointerEvents: "none" }}
                        name="ID"
                        value={editproductModel.ID}
                        readOnly
                      />
                    </div>
                    <div className={styles.inputFielder}>
                      <label htmlFor="price">Price (RON)</label>
                      <input onChange={inputHandler} name="price" value={editproductModel.price} />
                    </div>
                    <div className={styles.inputFielder}>
                      <label htmlFor="discountedPrice">Discounted Price (RON)</label>
                      <input onChange={inputHandler} name="discountedPrice" value={editproductModel.discountedPrice} />
                    </div>
                    <div className={styles.eachContainer}>
                      <div className={styles.inputFielder}>
                        <label htmlFor="realStock">Real Stock</label>
                        <input onChange={inputHandler} name="realStock" value={editproductModel.realStock} />
                      </div>
                      <div className={styles.inputFielder}>
                        <label htmlFor="realStockCheck">Real Stock Check</label>
                        <input onChange={inputHandler} name="realStockCheck" value={editproductModel.realStockCheck} />
                      </div>
                    </div>
                    <div className={styles.eachContainer}>
                      <div className={styles.inputFielder}>
                        <label htmlFor="fakeStock">Fake Stock</label>
                        <input onChange={inputHandler} name="fakeStock" value={editproductModel.fakeStock} />
                      </div>
                      <div className={styles.inputFielder}>
                        <label htmlFor="fakeStockCheck">Fake Stock Check</label>
                        <input onChange={inputHandler} name="fakeStockCheck" value={editproductModel.fakeStockCheck} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.rowSpacerTextArea}>
                    <div className={styles.inputFielderTextArea}>
                      <label htmlFor="shortDescription">short Description</label>
                      <textarea
                        spellCheck="false"
                        onChange={inputHandler}
                        name="shortDescription"
                        value={editproductModel.shortDescription}
                      />
                    </div>
                    <div className={styles.inputFielderTextArea}>
                      <label htmlFor="firstDescription">first Description</label>
                      <textarea
                        spellCheck="false"
                        onChange={inputHandler}
                        name="firstDescription"
                        value={editproductModel.firstDescription}
                      />
                    </div>
                  </div>
                  <div className={styles.editorElement}>
                    <label htmlFor="jsonContent">Full description HTML</label>
                    <textarea
                      spellCheck="false"
                      onChange={inputHandler}
                      name="jsonContent"
                      value={editproductModel.jsonContent}
                    />
                  </div>
                  <div className={styles.actionControl}>
                    <button className={styles.saveButton} onClick={submitEditOperation}>
                      SAVE
                    </button>
                    <button onClick={previewOperation} className={styles.previewButton}>
                      PREVIEW
                    </button>
                    <button onClick={cancelOperation} className={styles.cancelButton}>
                      CANCEL
                    </button>
                  </div>
                  <div className={styles.dialogSpace}>
                    {editSent && <p className={styles.confirmationSaveText}>Modificarile au avut loc!</p>}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
      {openPreviewArea && <ProductPreview ID={ID} productListUpdated={{ [ID]: editproductModel }} />}
    </Container>
  );
};

export default EditProduct;
