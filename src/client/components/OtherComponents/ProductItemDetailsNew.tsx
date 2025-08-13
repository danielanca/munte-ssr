// ProductItemDetailsNew.tsx
import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import styles from "./ProductItemDetails.module.scss";
import strings from "../../data/strings.json";
import ReactStarRatings from "react-star-ratings";
import type { ProductListType, productObject } from "../../utils/OrderInterfaces";

type ProductItemDetailsNewProps = {
  productData: ProductListType | null;
};

const ProductItemDetailsNew: React.FC<ProductItemDetailsNewProps> = ({ productData }) => {
  const { ProductItem: ProductItemStrings } = strings;

  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [starSize, setStarSize] = useState(18);

  useEffect(() => {
    const handleResize = () => {
      // check the smallest breakpoint first
      if (window.innerWidth <= 576) setStarSize(12);
      else if (window.innerWidth <= 920) setStarSize(16);
      else setStarSize(18);
    };
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.productParentContainer}>
      {productData
        ? Object.values(productData).map((item: productObject) => (
            <div className={styles.singleProductContainer} key={item.ID}>
              <HashLink onClick={gotoElement} to={`/produs/${item.ID}`} className={styles.HashLinkStyle}>
                <div className={styles.productImageContainer}>
                  <img src={item.imageProduct[0]} alt={item.title} className={styles.productImage} />
                </div>
                <div className={styles.productTitle}>{item.title}</div>
                <div className={styles.reviewStarRatings}>
                  <div className={styles.stars}>
                    <ReactStarRatings
                      rating={5}
                      starRatedColor="#3A5A40"
                      starHoverColor="#3A5A40"
                      starDimension={`${starSize}px`}
                      starSpacing="2px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                  <div className={styles.productTotalReviews}>{item.productTotalReviews}</div>
                </div>
                <div>{item.price} Lei</div>
              </HashLink>
            </div>
          ))
        : "Right now! We don't have any products. Please wait for few minutes or Contact Us."}
    </div>
  );
};

export default ProductItemDetailsNew;
