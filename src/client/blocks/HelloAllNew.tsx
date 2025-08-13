import { Row, Col } from "reactstrap";

// Old
import React, { useEffect, useState } from "react";
import styles from "./HelloAllNew.module.scss";
import { HereInterface } from "../components/AdminArea/EditStrings/TableTypes";
import { getStringsList } from "../services/emails";
import stringify from "json-stable-stringify";
import images from "../data/images";

const HelloAllNew = () => {
  const [theObject, setObject] = useState<HereInterface | null>(null);

  useEffect(() => {
    const fetchFrontCategories = async () => {
      getStringsList("categoriesList")
        .then((result) => result)
        .then((answer) => {
        setObject(JSON.parse(stringify(answer.resultSent) || '{}'));
          console.log("Answer is ", answer.resultSent);
        });
      // setObject(JSON.parse(stringify(fetchResult.resultSent)));
      // console.log("HelloAll message:", stringify(fetchResult.resultSent));
    };
    fetchFrontCategories();
  }, []);

  useEffect(() => {
    console.log("theObject:", theObject);
  }, [theObject]);

  return <MediaItems list={theObject} />;
};
interface MediaProps {
  list: HereInterface | null;
}
const MediaItems = ({ list }: MediaProps) => {
  console.log("Media Items:", list);
  return (
    <div className={styles.heroSectionMobileTabletLaptopParent}>
      <div className={styles.heroLaptopParent}>
      <div className={styles.heroSecParentContainer}>
      <Row className={styles.heroSectionDisplay} style={{ margin: 0, padding: 0 }}>
        <Col xs={12} lg={6} className={styles.heroSecLeftContainerParent}>
          <div className={styles.heroSecLeftContainer}>
          <span className={styles.cherryImageContainer}><img width={200} src={images.cherry} alt="" /></span>
            <p className={styles.heroSectionMainHeading}>
              Afla <br /> gama <br /> Din Munte
            </p>
            
            <p className={styles.heroSectionMainDesc}>
              Descopera produseele noastre parmumate si <br /> da-ti voie la un moment de relaxare
            </p>
            <div className="d-flex  ">
              <button className={styles.startShopHeroSec}>Start Shopping</button>
              <button className={styles.seeMoreHeroSec}>Vezi mai mult</button>
            </div>
          </div>
        </Col>

        <Col xs={12} lg={6}>
          <img src={images.heroSectionMainImage} alt="" style={{ width: "90%" }} />
        </Col>
      </Row>
      </div>
      </div>
      <div className={styles.heroMobileTabletParent}>
      <div className={styles.heroMobileSectionParent}>
        <Row className={styles.heroMobileDisplay}>
          <Col xs={12} sm={12} md={12} lg={12}></Col>
            <img src={images.heroSectionMobileImage} alt="" style={{ width: "90%"}} />
            <div className={styles.mobileHeroDescParent}>
            <p className={styles.mobileHeroDesc}>Descopera produseele noastre parmumate si 
da-ti voie la un moment de relaxare </p>
            </div>
            <div className="d-flex items-content-center justify-content-center ">
              <button className={styles.startShopHeroSecMobile}>Start Shopping</button>
              <button className={styles.seeMoreHeroSecMobile}>Vezi mai mult</button>
            </div>
        </Row>
      </div>
</div>
     
    </div>
  );
};
export default HelloAllNew;
