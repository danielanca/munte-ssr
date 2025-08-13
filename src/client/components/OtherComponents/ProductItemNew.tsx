import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
// import { ProdItemProps } from "../utils/OrderInterfaces";
import styles from "./ProductItemNew.module.scss";
import images from "../../data/images";
import ReactStarRatings from "react-star-ratings";
import { ProductListType } from "../../utils/OrderInterfaces";

interface StarRatingProps {
  rating: number;
  changeRating: (newRating: number) => void;
  realProductsToShow: ProductListType; 
}

const ProductItem = ({ rating, changeRating, realProductsToShow }: StarRatingProps) => {
  const [starSize, setStarSize] = useState(18);

  // const productShow = realProductsToShow();
  useEffect(() => {
    const handleResize = () => {
      // Adjust the star size based on the window width
      if (window.innerWidth <= 920) {
        setStarSize(16);
      } else if (window.innerWidth <= 576) {
        setStarSize(12);
      } else {
        setStarSize(18);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const gotoElement = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productDummyData = [
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 66,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    },
    {
      productSrc: images.featuredProducts,
      productTitle: "SARE DE BAIE  CU YLANG",
      productTotalReviews: 59,
      productPrice: 25.0
    }
  ];

  return (
    <div>
      <div className={styles.productParentContainer}>
        
        {realProductsToShow != null
          ?Object.values(realProductsToShow).map((item) => (
              <HashLink onClick={gotoElement} to={"/produs/" + item.ID} className={styles.singleProductContainer}>
                {/* <div className={styles.singleProductContainer}> */}
                <div>
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
                      changeRating={changeRating}
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                  <div>{item.productTotalReviews}</div>
                </div>
                <div className={styles.productPrice}>{item.price} Lei</div>
                {/* </div> */}
              </HashLink>
            ))
          : "Right now! We don't have any products. Please wait for few minutes or Contact Mubbasher Yasin."}
      </div>
    </div>
  );
};

export default ProductItem;
