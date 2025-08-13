import React, { useState, useEffect } from "react";
import HelloAllNew from "../../blocks/HelloAllNew";
import ProductsGallery from "../SuggestedProducts/ProductsGallery";
// import ProductsGalleryNew from "../components/SuggestedProducts/ProductsGalleryNew";
import FeaturedProductNew from "../../blocks/FeaturedProductNew";



import FeaturedTextNew from "../MiniComponents/Products/FeaturedTextNew";
import GrayBanner from "../MiniComponents/HeadLiners/GrayBanner";
import strings from "../../data/strings.json";
import { getData } from "../../data/productListold";
import { ProductListType } from "../../utils/OrderInterfaces";
import { ProductsFromSessionStorage } from "../../data/constants";

const MainNavigation = () => {
  let { DiscoverOurProducts, GrayPromotion } = strings;
  // const products = useProducts();

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

  return (
    <>
      <HelloAllNew />
      <FeaturedProductNew />
     
      <ProductsGallery productsToShow={products} />
      <FeaturedTextNew />
      <GrayBanner text={GrayPromotion.text} />
    </>
  );
};

export default MainNavigation;
