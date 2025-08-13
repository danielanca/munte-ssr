// ProduseleNoastre.tsx
import React, { useEffect, useState } from "react";
import HelmetHead from "../MiniComponents/HelmetHead/HelmetHead";
import ProductItemDetailsNew from "../OtherComponents/ProductItemDetailsNew";
import strings from "../../data/strings.json";
import { getData } from "../../data/productList";
import { ProductsFromSessionStorage } from "../../data/constants";
import type { ProductListType } from "../../utils/OrderInterfaces";
import styles from "./ProduseleNoastre.module.scss";

const ProduseleNoastre = () => {
  const { ProduseleNoastre: ProduseleNoastreStrings } = strings;

  const [products, setProducts] = useState<ProductListType | null>(null);
  const productsFromSession = sessionStorage.getItem(ProductsFromSessionStorage);

  useEffect(() => {
    if (productsFromSession) {
      setProducts(JSON.parse(productsFromSession));
    } else {
      getData().then((finalData) => {
        // ensure finalData matches ProductListType (a dictionary)
        setProducts(JSON.parse(JSON.stringify(finalData)));
      });
    }
  }, [productsFromSession]);

  return (
    <>
      <HelmetHead
        title={ProduseleNoastreStrings.title}
        description={ProduseleNoastreStrings.metaDescription}
      />

      <div className={styles.blockContainer}>
        <div>
          <ProductItemDetailsNew productData={products} />
        </div>
      </div>
    </>
  );
};

export default ProduseleNoastre;
