// @ts-nocheck

import React, { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import HelmetHead from "./MiniComponents/HelmetHead/HelmetHead";
import HeadlineTitle from "./HeadlineTitle";
import ProductItem from "./ProductItem";
import ProductItemDetailsNew from "./ProductItemDetailsNew.tsx";
import strings from "./../data/strings.json";
import technicalStrings from "././../data/technicalStrings.json";
import { getData } from "../data/productList";
import { ProductsFromSessionStorage } from "../data/constants";
import { ProductListType } from "../utils/OrderInterfaces";
import styles from "./../components/ProduseleNoastre.module.scss";
import images from "../data/images";
import ProductsComponentNew from "./Product/ProductItemDetailsBannerNew";
import ProductItemDetailsBannerNew from "./Product/ProductItemDetailsBannerNew";

const ProduseleNoastre = ({ banner, productsData }) => {
  // console.log(productsData.productImage)
  let { ProduseleNoastre } = strings;
  const [rating, setRating] = useState<number>(0);

  const [products, setProducts] = useState<ProductListType[] | null>(null);
  let productsFromSession = sessionStorage.getItem(ProductsFromSessionStorage);

  useEffect(() => {
    if (productsFromSession != null) {
      setProducts(JSON.parse(productsFromSession));
    } else {
      getData().then((finalData) => {
        setProducts(JSON.parse(JSON.stringify(finalData)));
      });
    }
  }, [productsFromSession]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log("New rating:", newRating);
  };

  return (
    <>
      <HelmetHead title={ProduseleNoastre.title} description={ProduseleNoastre.metaDescription} />

      {/* <HeadlineTitle title={ProduseleNoastre.title} /> */}
      <div className={styles.blockContainer}>
        {/* <div>
          {products != null
            ? Object.values(products).map((item: ProductListType) => (
                <ProductItemDetailsNew rating={rating} changeRating={handleRatingChange} key={uniqueId()} productObject={item} />
              ))
            : technicalStrings.loadingData}
        </div> */}

        {/* Product Page Banner */}
        {/* <ProductItemDetailsBannerNew banner={banner} /> */}

        {/* Products */}
        {/* <ProductItemDetailsNew productData={productsData} /> */}
        <div>
          <ProductItemDetailsNew productData={products} />
        </div>
      </div>
    </>
  );
};
export default ProduseleNoastre;
