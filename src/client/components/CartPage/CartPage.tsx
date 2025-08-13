// @ts-nocheck

import React, { useEffect, useState } from "react";
import { NavHashLink } from "react-router-hash-link";
import { productConstants } from "../../data/componentStrings";
import { uniqueId } from "lodash";
import { CartInfoItemCookie, ProductsFromSessionStorage } from "../../data/constants";
import ItemCartList from "./ItemCartList";
import { ProductSessionProps, ProductCookiesProps, CartProps } from "./typeProps";
import strings from "../../data/strings.json";
import { BsCashCoin, BsCreditCard2Front } from "react-icons/bs";
import styles from "./CartPage.module.scss";
import { AiOutlinePercentage } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { getCuponData } from "../../data/CuponFetch";
import { storage } from "../../firebase";

const makeCheck = (sessionData: ProductSessionProps, cartData: ProductCookiesProps[]) => {
  let namesNotFound: string[] = [];

  cartData.forEach((item) => {
    if (sessionData != null && !sessionData.hasOwnProperty(item.id)) {
      namesNotFound.push(item.id);
    }
  });

  return cartData.filter((filterItem) => !namesNotFound.includes(filterItem.id));
};

const CartPage = ({ notifyMe }: CartProps) => {
  const [cuponData, setCuponData] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [result, setResult] = useState("");

  const [cuponCode, setCuponCode] = useState("");
  const [cuponDiscount, setCuponDiscount] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  // useEffect(() => {
  //   return () => {
  //     // Cleanup: set isMounted to false when the component is unmounted
  //     setIsMounted(false);
  //   };
  // }, []);

  // const location = useLocation();
  // const cuponCode = location.state.cuponCodeText;
  // const cuponCut = location.state.cuponCutPercent;

  // console.log("cuponCodeText: " + cuponCode);
  // console.log("cuponCutPercent: " + cuponCut);

  let { MyCart: cartString } = strings;
  const [updateMade, setupdateMade] = useState<number>(1);
  let subtotalPrepare = 0;
  let expectedData = localStorage.getItem(CartInfoItemCookie);
  let sessionProducts: ProductSessionProps | null;
  let storedCart: ProductCookiesProps[] | null = null;
  // let shippingFee = productConstants.shippingFee;
  let deliveryFee = productConstants.shippingFee;
  let sessionFlat = sessionStorage.getItem(ProductsFromSessionStorage);

  if (typeof sessionFlat === "string") {
    sessionProducts = JSON.parse(sessionFlat);
  } else {
    sessionProducts = null;
  }

  if (sessionProducts !== null && expectedData != null) {
    storedCart = JSON.parse(expectedData);
    if (storedCart != null) {
      storedCart = makeCheck(sessionProducts, storedCart);
      storedCart.map((item) => {
        if (sessionProducts != null) {
          subtotalPrepare += Number(sessionProducts[item.id].price) * Number(item.itemNumber);
        }
      });
    }
  }

  const productNotification = () => {
    setupdateMade(updateMade + 1);
    notifyMe(updateMade);
  };

  const goToPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // window.location.href = cartString.finishOrder.link;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data: any = await getCuponData();
        if (data) {
          setCuponData(data);
        } else {
          console.log("No Cupon Data available");
        }
      } catch (error) {
        console.error("Error fetching Cupon Data:", error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // const handleSubmit = () => {
  //   const matchingCupon = cuponData.find((data) => data.cuponCode === inputValue);

  //   if (matchingCupon) {
  //     console.log("Successful. Cupon Discount:", matchingCupon.cuponDiscount);
  //     console.info("Successful. Cupon Discount:", matchingCupon.cuponDiscount);
  //     setResult(`Successful. Cupon Discount: ${matchingCupon.cuponDiscount}`);
  //   } else {
  //     console.log("Cupon code not found.");
  //     console.info("Cupon code not found.");
  //     setResult("Cupon code not found.");
  //   }
  // };

  // const displayFinishOrderDialog = () => {
  //   if (subtotalPrepare > 0) {
  //     return (
  //       <NavHashLink className={styles.hashTransparent} to={cartString.finishOrderCosulmeu.link}>
  //         <button className={styles.finishOrder}>{cartString.finishOrderCosulmeu.text}</button>
  //       </NavHashLink>
  //     );
  //   }
  // };

  useEffect(() => {
    const matchingCupon = cuponData.find((data) => data.cuponCode === inputValue);

    if (matchingCupon) {
      setCuponCode(matchingCupon.cuponCode);
      setCuponDiscount(matchingCupon.cuponDiscount);
    } else {
      setCuponCode("");
      setCuponDiscount(0);
    }
  }, [inputValue, cuponData]);

  const displayFinishOrderDialog = () => {
    if (cuponDiscount > 0) {
      return (
        <NavHashLink className={styles.hashTransparent} to={cartString.finishOrderCosulmeu.link}>
          <button className={styles.finishOrder}>{`Cupon ${cuponCode}`}</button>
        </NavHashLink>
      );
    } else {
      return (
        <NavHashLink className={styles.hashTransparent} to={cartString.finishOrderCosulmeu.link}>
          <button className={styles.finishOrder}>{cartString.finishOrderCosulmeu.text}</button>
        </NavHashLink>
      );
    }
  };

  // Convert subtotalPrepare, deliveryFee, and cuponDiscount to numbers
  const subtotal = Number(subtotalPrepare);
  const deliveryFees = Number(deliveryFee);
  const discountPercentage = Number(cuponDiscount);

  // Calculate the total
  const totalBeforeDiscount = subtotal + deliveryFees;

  // Calculate the discount amount
  const discountAmount = (discountPercentage / 100) * totalBeforeDiscount;

  // Calculate the final total after applying the discount
  const finalTotal = totalBeforeDiscount - discountAmount;

  // Format the final total with the currency symbol
  const formattedTotal = ` ${finalTotal.toFixed(2)} ${cartString.currency}`;

  // console.log("final finaleee price" + formattedTotal);
  // console.info("final finaleee price" + formattedTotal);
  // console.warn("final finaleee price" + formattedTotal);

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.CartSection}>
          {/* Main Container Left Right */}

          <div className={styles.mainParentContainer}>
            <div className={styles.leftContainer}>
              {subtotalPrepare !== 0 ? (
                storedCart != null &&
                storedCart.map((item) => (
                  <ItemCartList
                    key={uniqueId()}
                    productID={item.id}
                    amount={Number(item.itemNumber)}
                    updateRequest={productNotification}
                  />
                ))
              ) : (
                <div className={styles.emptyCart}>{cartString.emptyCart}</div>
              )}

              <div className={styles.discountContainer}>
                <span className={styles.percentIconContainer}>
                  <AiOutlinePercentage className={styles.percentIcon} />
                </span>
                <p className={styles.discountText}>10% Discount la urmatoarea comanda cu codul : DINMUNTE1</p>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.rightChild}>
                <div>
                  <h1 className={styles.comandaTitle}>Comanda</h1>
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.subTotal}>{` ${cartString.subTotal} `}</span>

                  <span className={styles.subTotal}>{subtotalPrepare + ` ${cartString.currency}  `}</span>
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.subTotal}>Discount</span>

                  <span className={styles.subTotal}>{0.0 + ` ${cartString.currency}  `}</span>
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.subTotal}>Delivery</span>
                  <span className={styles.subTotal}>{deliveryFee + ` ${cartString.currency}  `}</span>
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.subTotal}>Cupon Reducere</span>

                  <span className={styles.subTotal}>{0 + Number(cuponDiscount)} %</span>
                </div>

                <div className={styles.totalPriceTopBorderContainer}>
                  <hr className={styles.totalPriceTopBorder} />
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.subTotalTotal}>{` ${cartString.total} `}</span>
                  <span className={styles.subTotalTotalPrice}>
                    {Number(subtotalPrepare) + Number(deliveryFee) + ` ${cartString.currency} `}
                  </span>
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.subTotalTotal}>{`Discounted ${cartString.total} `}</span>
                  <span className={styles.subTotalTotalPrice}>{formattedTotal}</span>
                </div>

                <div className={styles.subTotalContainer}>
                  <span className={styles.EstimareExpediereText}>Estimare Expediere</span>
                  <span className={styles.cuponTime}>01 Feb, 2023</span>
                </div>

                {/* Cupon Input Before Price Finalization */}

                <div className={styles.cuponInputFormContainer}>
                  {/* {cuponData.map((data, index) => ( */}
                  <input
                    placeholder={"Cupon Reducere"}
                    className={styles.cuponInputForm}
                    value={inputValue}
                    type={"large"}
                    onChange={handleInputChange}
                  />
                  {/* ))} */}
                  <MdOutlineLocalOffer style={{ fontSize: "25px" }} className={styles.cuponIconForInput} />
                </div>

                {/* <button onClick={handleSubmit}>Submit Now</button> */}

                <div>{result}</div>
                {/* 
                <div className={styles.paymentMethodContainer}>
                  <div className={styles.creditCardContainer}>
                    <input
                      type="radio"
                      className={styles.paymentMethodRadioButton}
                      name="paymentMethod"
                      id="CreditCard"
                    />
                    <span className={styles.iconTextContainer}>
                      <span style={{ marginRight: "10px" }}>
                        <BsCreditCard2Front className={styles.creditCardIcon} />
                      </span>
                      <label htmlFor="CreditCard" className={styles.creditCardText}>
                        Credit Card
                      </label>
                    </span>
                  </div>

                  <div className={styles.plataRambursContainer}>
                    <input
                      type="radio"
                      className={styles.paymentMethodRadioButton}
                      name="paymentMethod"
                      id="Plataramburs"
                    />
                    <span className={styles.iconTextContainer}>
                      <span style={{ marginRight: "10px" }}>
                        <BsCashCoin className={styles.plataRambursIcon} />
                      </span>
                      <label htmlFor="Plataramburs" className={styles.plataRambursText}>
                        Plata ramburs
                      </label>
                    </span>
                  </div>
                </div> */}

                <div>{displayFinishOrderDialog()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;

export const getCartItems = () => {
  let itemFromSessionS = sessionStorage.getItem(ProductsFromSessionStorage);
  let sessionProducts: ProductSessionProps | null = itemFromSessionS && JSON.parse(itemFromSessionS);
  let storedCart: ProductCookiesProps[] | null = null;
  let expectedData = localStorage.getItem(CartInfoItemCookie);
  storedCart = expectedData && JSON.parse(expectedData);

  if (expectedData != null && sessionProducts != null) {
    let totalItems = 0;
    let storedCart = JSON.parse(expectedData);
    storedCart = makeCheck(sessionProducts, storedCart);
    storedCart.map((item: ProductCookiesProps) => {
      totalItems = totalItems + Number(item.itemNumber);
    });
    return totalItems;
  } else return 0;
};

// import React, { useState } from "react";
// import { NavHashLink } from "react-router-hash-link";
// import { productConstants } from "../../data/componentStrings";
// import { uniqueId } from "lodash";
// import { CartInfoItemCookie, ProductsFromSessionStorage } from "../../data/constants";
// import ItemCartList from "../ItemCartList";
// import { ProductSessionProps, ProductCookiesProps, CartProps } from "./typeProps";
// import strings from "../../data/strings.json";
// import styles from "./CartPage.module.scss";

// const makeCheck = (sessionData: ProductSessionProps, cartData: ProductCookiesProps[]) => {
//   let namesNotFound: string[] = [];

//   cartData.forEach((item) => {
//     if (sessionData != null && !sessionData.hasOwnProperty(item.id)) {
//       namesNotFound.push(item.id);
//     }
//   });

//   return cartData.filter((filterItem) => !namesNotFound.includes(filterItem.id));
// };

// const CartPage = ({ notifyMe }: CartProps) => {
//   let { MyCart: cartString } = strings;
//   const [updateMade, setupdateMade] = useState<number>(1);
//   let subtotalPrepare = 0;
//   let expectedData = localStorage.getItem(CartInfoItemCookie);
//   let sessionProducts: ProductSessionProps | null;
//   let storedCart: ProductCookiesProps[] | null = null;
//   let shippingFee = productConstants.shippingFee;
//   let sessionFlat = sessionStorage.getItem(ProductsFromSessionStorage);

//   if (typeof sessionFlat === "string") {
//     sessionProducts = JSON.parse(sessionFlat);
//   } else {
//     sessionProducts = null;
//   }

//   if (sessionProducts !== null && expectedData != null) {
//     storedCart = JSON.parse(expectedData);
//     if (storedCart != null) {
//       storedCart = makeCheck(sessionProducts, storedCart);
//       storedCart.map((item) => {
//         if (sessionProducts != null) {
//           subtotalPrepare += Number(sessionProducts[item.id].price) * Number(item.itemNumber);
//         }
//       });
//     }
//   }

//   const productNotification = () => {
//     setupdateMade(updateMade + 1);
//     notifyMe(updateMade);
//   };

//   const goToPage = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     // window.location.href = cartString.finishOrder.link;
//   };

//   const displayFinishOrderDialog = () => {
//     if (subtotalPrepare > 0) {
//       return (
//         <NavHashLink className={styles.hashTransparent} to={cartString.finishOrder.link}>
//           <button className={styles.finishOrder}>{cartString.finishOrder.text}</button>
//         </NavHashLink>
//       );
//     }
//   };
//   return (
//     <div>
//       <div className={styles.CartSection}>
//         <div className={styles.topTitle}>
//           <div className={styles.cartLine} />
//           <h3 className={styles.middleCosText}>{cartString.cartShopping}</h3>
//           <div className={styles.cartLine} />
//         </div>

//         {displayFinishOrderDialog()}
//         <div className={styles.actualCartBox}>
//           <div className={"row " + styles.topline}>
//             <div className={"col-sm-8 col-6"}>
//               <h3 className={styles.cartProductTitle}>{cartString.product}</h3>
//             </div>
//             <div className={"col-sm-4 col-6"}>
//               <h3 className={styles.cartProductTitle}>{cartString.quantity}</h3>
//             </div>
//           </div>

//           {subtotalPrepare !== 0 ? (
//             storedCart != null &&
//             storedCart.map((item) => (
//               <ItemCartList
//                 key={uniqueId()}
//                 productID={item.id}
//                 amount={Number(item.itemNumber)}
//                 updateRequest={productNotification}
//               />
//             ))
//           ) : (
//             <div className={styles.emptyCart}>{cartString.emptyCart}</div>
//           )}
//         </div>
//         {subtotalPrepare > 0 && (
//           <div className={styles.actualCheckout}>
//             <div className={styles.bottomLeft}></div>
//             <div className={styles.bottomRight}>
//               <div className={styles.checkoutTotal}>
//                 <h3>{cartString.totalCart}</h3>
//                 <div className={styles.subtotalContainer}>
//                   <div className={styles.subtotalLine + " row "}>
//                     <div className={styles.innerAlign}>
//                       <p className={styles.toRight}>{`${cartString.subTotal}:`}</p>
//                     </div>
//                     <div className={styles.innerPrice}>
//                       <p className={styles.subtotalStyle}>{`${subtotalPrepare} ${cartString.currency}`}</p>
//                     </div>
//                   </div>
//                   <div className={styles.deliveryLine + " row"}>
//                     <div className={styles.innerAlign}>
//                       <p className={styles.toRight}>{`${cartString.subTotal}:`}</p>
//                     </div>
//                     <div className={styles.innerPrice}>
//                       <p
//                         className={styles.subtotalStyle}
//                       >{`${cartString.sendingInfo}:  ${shippingFee} ${cartString.currency}`}</p>
//                     </div>
//                   </div>
//                   <div className={styles.totalLine + " row"}>
//                     <div className={styles.innerAlign}>
//                       <p className={styles.toRight}>{`${cartString.total}:`}</p>
//                     </div>
//                     <div className={styles.innerPrice}>
//                       <p className={styles.subtotalStyle}>{`${subtotalPrepare + shippingFee}.00 ${
//                         cartString.VATincluded
//                       }`}</p>
//                     </div>
//                   </div>
//                   <div className={styles.finishTheOrderBox}>
//                     <NavHashLink className={styles.hashTransparent} to={cartString.finishOrder.link}>
//                       <button onClick={goToPage} className={styles.finishOrder}>
//                         {cartString.finishOrder.text}
//                       </button>
//                     </NavHashLink>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* RIght Section */}
//       <div className={styles.rightSection}>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolore! Doloremque quidem laboriosam aut laudantium facere in repellat iusto. Maxime molestias aut a?
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// export const getCartItems = () => {
//   let itemFromSessionS = sessionStorage.getItem(ProductsFromSessionStorage);
//   let sessionProducts: ProductSessionProps | null = itemFromSessionS && JSON.parse(itemFromSessionS);
//   let storedCart: ProductCookiesProps[] | null = null;
//   let expectedData = localStorage.getItem(CartInfoItemCookie);
//   storedCart = expectedData && JSON.parse(expectedData);

//   if (expectedData != null && sessionProducts != null) {
//     let totalItems = 0;
//     let storedCart = JSON.parse(expectedData);
//     storedCart = makeCheck(sessionProducts, storedCart);
//     storedCart.map((item: ProductCookiesProps) => {
//       totalItems = totalItems + Number(item.itemNumber);
//     });
//     return totalItems;
//   } else return 0;
// };
