// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductPreview from "../Product/ProductPreview";
import { CuponModel, ProductListType, ProductModel } from "./../../utils/OrderInterfaces";
import { getData } from "../../data/ProdFetch";
import { addCupon } from "./../../services/emails";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
// import PageTitle from "../AdminArea/ShardsDesign/components/common/PageTitle";
import styles from "./EditProduct.module.scss";

const EditCupon = () => {
  const [openPreviewArea, setOpenPreviewArea] = useState<boolean>(false);
  const [productCuponUpdated, setCuponProducts] = useState<any>();
  const [editSent, setEditSent] = useState<boolean>(false);
  const [editCuponModel, setEditCuponModel] = useState<CuponModel>({
    ID: "",
    cuponCode: "",
    cuponDiscount: 0
  });

  const navigate = useNavigate();

  console.log("EDIT PRODUCTS PARAM:", useParams());
  let params = useParams();
  let ID: any = params.id !== undefined ? params.id : "";

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = data.target;

    let dataValues = value;

    setEditCuponModel((prevFormData) => {
      if (type === "checkbox" && "checked" in data.target) {
        dataValues = data.target.checked ? "true" : "false";
      }
      return { ...prevFormData, [name]: dataValues };
    });
  };

  const separatorHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = data.target;
    if (name === "imageProduct" || name === "ULbeneficii") {
      setEditCuponModel((editCuponModel) => ({
        ...editCuponModel,
        [name]: value.split(",")
      }));
    }
  };

  const submitAddOperation = () => {
    if (editCuponModel.cuponCode != "") {
      addCupon(editCuponModel).then((response) => {
        console.log("Cupon Code main addition request sent to Cloud!");
      });
    }
  };

  useEffect(() => {
    if (editSent) {
      const timer = setTimeout(() => {
        setEditSent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [editSent]);

  const cancelOperation = () => {
    navigate("/admin/cupondiscount");
  };

  useEffect(() => {
    if (productCuponUpdated == null) {
      getData(ID).then((finalData) => {
        setCuponProducts(finalData);
      });
    }
  });

  return (
    <Container fluid className="main-content-container px-4">
      {/* <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Cupon List" subtitle={"Add Cupon"} className="text-sm-left" />
      </Row> */}
      <Row>
        <Col>
          <div className={styles.editPage}>
            <div className={styles.addAreaContainer}>
              <h3>Add Cupon</h3>
              <div className={styles.inputContainer}>
                <div className={styles.rowSpacer}>
                  <div className={styles.inputFielder}>
                    <label htmlFor="ID">{"Link ID Name:"}</label>
                    <input onChange={inputHandler} name="ID" />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="cuponCode">{"cuponCode"}</label>
                    <input onChange={inputHandler} name="cuponCode" />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="cuponDiscount">{"cuponDiscount"}</label>
                    <input onChange={inputHandler} name="cuponDiscount" />
                  </div>
                </div>

                <div className={styles.actionControl}>
                  <button className={styles.saveButton} onClick={submitAddOperation}>
                    {"SAVE"}
                  </button>
                  <button onClick={cancelOperation} className={styles.cancelButton}>
                    {"CANCEL"}
                  </button>
                </div>
                {/* <div className={styles.dialogSpace}>
                  {editSent && <p className={styles.confirmationSaveText}>{"Modificarile au avut loc!"}</p>}
                </div> */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/* {openPreviewArea && <ProductPreview ID={ID} productCuponUpdated={{ [ID]: editproductModel }} />} */}
    </Container>
  );
};

export default EditCupon;
