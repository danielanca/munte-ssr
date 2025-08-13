// @ts-nocheck

import React, { useState } from "react";
import styles from "./ProductsGallery.module.scss";
import ProductItemNew from "../OtherComponents/ProductItemNew";
import { uniqueId } from "lodash";

interface ProductsGalleryProps {
  productsToShow: { [key: string]: any } | null;
}

const ProductsGallery = ({ productsToShow }: ProductsGalleryProps) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    // You can perform additional actions based on the new rating value
    console.log("New rating:", newRating);
  };

  console.log(`Mubeeeeeeeee + ${productsToShow}`);

  return (
    <div className={styles.blockContainer}>
      {/* <div className={styles.productList}>
        {productsToShow
          ? Object.values(productsToShow).map((item) => <ProductItem key={uniqueId()} productObject={item} />)
          : "LOADING Data..."}
      </div> */}
      <ProductItemNew realProductsToShow={productsToShow} rating={rating} changeRating={handleRatingChange} />
    </div>
  );
};

export default ProductsGallery;
