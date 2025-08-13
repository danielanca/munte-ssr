// @ts-nocheck

import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { ProdItemProps } from "../utils/OrderInterfaces";
import styles from "./../components/ProductItemDetails.module.scss";
import strings from "./../data/strings.json";
import images from "../data/images";
import ReactStarRatings from "react-star-ratings";

interface StarRatingProps {
  rating: number;
  changeRating: (newRating: number) => void;
}

const ProductItemDetailsNew = ({ productData }) => {
  // console.log(productsDummyData)
  let { ProductItem: ProductItemStrings } = strings;
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [starSize, setStarSize] = useState(18);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 920) {
        setStarSize(16);
      } else if (window.innerWidth <= 576) {
        setStarSize(12);
      } else {
        setStarSize(18);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.info("Mubbasher Yasin Is " + productData);

  return (
    // <HashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/produs/" + productObject.ID}>
    // <HashLink onClick={gotoElement} className={styles.HashLinkStyle} to={""}>
    <div className={styles.productParentContainer}>
      {/* {productData.map((data) => (
          <div className={styles.singleProductContainer}>
            <div className={styles.productImageContainer}>
              <img src={data.productImage} alt="" className={styles.productImage} />
            </div>
            <div className={styles.productTitle}>{data.productTitle}</div>
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
              <div className={styles.productTotalReviews}>{data.productTotalReviews}</div>
            </div>
            <div>{data.productPrice} Lei</div>
          </div>
        ))} */}

      {/* {products != null
            ? Object.values(products).map((item: ProductListType) => (
                <ProductItemDetailsNew
                  rating={rating}
                  changeRating={handleRatingChange}
                  key={uniqueId()}
                  productObject={item}
                />
              ))
            : technicalStrings.loadingData} */}

      {/* {productData != null
          ? Object.values(products).map((item: ProductListType) => (
              <div className={styles.singleProductContainer}>
                <div className={styles.productImageContainer}>
                  <img src={data.productImage} alt="" className={styles.productImage} />
                </div>
                <div className={styles.productTitle}>{data.productTitle}</div>
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
                  <div className={styles.productTotalReviews}>{data.productTotalReviews}</div>
                </div>
                <div>{data.productPrice} Lei</div>
              </div>
            ))
          : "Mubbasher Yasin Anjum"} */}

      {productData != null
        ? Object.values(productData).map((item: ProductListType) => (
            <div className={styles.singleProductContainer}>
              <HashLink onClick={gotoElement} to={"/produs/" + item.ID} className={styles.HashLinkStyle}>
                <div className={styles.productImageContainer}>
                  <img src={item.imageProduct[0]} alt="" className={styles.productImage} />
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
    // </HashLink>
  );
};

export default ProductItemDetailsNew;
