// @ts-nocheck

import React from 'react'
import styles from "./ProductItemDetailsBannerNew.module.scss";

function ProductItemDetailsBannerNew({banner}) {
  return (
    <div>
      {banner.map((data)=>(
        <div className={styles.ProductPageBanner} style={{ backgroundImage: `url(${data.backgroundImage})`}}>
          <div className={styles.bannerHeading}>{data.bannerTitle}</div>
        </div>
      ))}
    </div>
  )
}

export default ProductItemDetailsBannerNew