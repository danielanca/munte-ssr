// @ts-nocheck

// Old Navbar Imports
import React, { useEffect, useState } from "react";
import { HashLink, HashLink as Link, NavHashLink } from "react-router-hash-link";
import ReactGA from "react-ga4";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { getCartItems } from "./CartPage/CartPage";
import TopBanner from "./TopBanner";
import MenuMobileSide from "./MenuMobileSide";

import styles from "./NavbarNew.module.scss";
import images from "../../data/images";
import strings from "../../data/strings.json";
import { FiSearch } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineShopping } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import HelloAllNew from "../../blocks/HelloAllNew";

interface NavProps {
  updateNotification?: () => void;
  clearNotif: number;
}

// const NavBarNew = ({ clearNotif }: NavProps) => {
//   let { navMenu: navItems, cart } = strings;
//   const { pathname } = useLocation();
//   const [totalItems, setTotalItems] = useState<number>(getCartItems());

//   useEffect(() => {
//     setTotalItems(getCartItems());
//   }, [clearNotif]);

//   const sendAnalyticsIdea = () => {
//     ReactGA.event("User pressed on gallery");
//   };

const NavbarNew = ({ clearNotif }) => {
  let { navMenu: navItems, cart } = strings;
  const { pathname } = useLocation();
  const [totalItems, setTotalItems] = useState<number>(getCartItems());

  useEffect(() => {
    setTotalItems(getCartItems());
  }, [clearNotif]);

  const sendAnalyticsIdea = () => {
    ReactGA.event("User pressed on gallery");
  };

  const [openNav, setOpenNav] = useState(false);

  const toggleHandler = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="navbarParentContainer">
      <div className="header_navbarnew_container">
        {!pathname.includes("/admin") && !pathname.includes("/login") && (
          <>
            {!openNav && <TopBanner />}

            <div className={styles.headerParentContainer}>
              <div className={styles.navbarnewContainer}>
                <HashLink className={styles.logoHover} to="/">
                  <img alt="logo" className={styles.updatedLogo} src={images.updatedLogo} />
                </HashLink>
                <div className={styles.navbarLaptopPagesConatiner}>
                  <HashLink to="/saredebai" className={styles.headerPages}>
                    Sare
                  </HashLink>
                  <HashLink to="/produsele-noastre" className={styles.headerPages}>
                    Siropuri
                  </HashLink>
                  <HashLink to="/sapunuri" className={styles.headerPages}>
                    Sapunuri
                  </HashLink>
                  <HashLink to="/bombe" className={styles.headerPages}>
                    Bombe
                  </HashLink>
                  <HashLink to="/desprenoi" className={styles.headerPages}>
                    Despre Noi
                  </HashLink>
                </div>
                <div>
                  <NavHashLink className={styles.searchIconParent} to={cart.link}>
                    <img alt="cart icon" className={styles.searchIcon} src={images.searchIcon} />
                  </NavHashLink>
                  <NavHashLink className={styles.hashTransparent} to={cart.link}>
                    <img alt="cart icon" className={styles.shopIcon} src={images.cartLogo} />
                    <span className={styles.jewel}>{totalItems}</span>
                  </NavHashLink>
                  <NavHashLink className={styles.HashLinkStyle} to={navItems.contactUs.name}>
                    Contacteaza-ne
                  </NavHashLink>
                </div>
              </div>
            </div>

            {/* Tablet & Mobile Navbar */}
            <div className={`${styles.navbarTabletMobile} ${openNav ? "open" : ""}`}>
              {!openNav && (
                <div className={styles.tabletNavbarParent}>
                  <div className={styles.tabletLogo}>
                    <HashLink className={styles.logoHover} to="/">
                      <img alt="logo" className={styles.DinMunteLogo} src={images.DinMunteLogo} />
                    </HashLink>
                  </div>
                  <div className={styles.tabletIconsParent}>
                    <NavHashLink className={styles.searchIconTabletParent} to={cart.link}>
                      <FiSearch size={30} style={{ color: "#3A5A40" }} />
                    </NavHashLink>
                    <NavHashLink className={styles.bagIconTabletParent} to={cart.link}>
                      <BiShoppingBag size={30} style={{ color: "#3A5A40" }} />
                    </NavHashLink>
                    <div className={styles.toggleIconTabletParent}>
                      <GiHamburgerMenu size={30} style={{ color: "black" }} onClick={toggleHandler} />
                    </div>
                  </div>
                </div>
              )}

              <div>
                {openNav && (
                  <div className={styles.toggleOpenPagesLinks}>
                    <div className={styles.bagToggleContainer} style={{ paddingTop: "20px" }}>
                      <NavHashLink className={styles.bagIconTabletParent} to={cart.link}>
                        <AiOutlineShopping size={25} style={{ color: "white" }} />
                      </NavHashLink>
                      <div className={styles.toggleCloseIconContainer} onClick={toggleHandler}>
                        <IoMdClose size={40} className={styles.closeIcon} />
                      </div>
                    </div>
                    <div className={styles.openTogglePagesHeroMobile}>
                      <div className={styles.tabletPagesContainer}>
                        <HashLink
                          to="/"
                          className={styles.headerPagesTablet}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <HiOutlineHome
                            className={styles.homePageIcon}
                            style={{ paddingRight: "4px", width: "40px" }}
                          />{" "}
                          <span>Home</span>
                        </HashLink>
                        <HashLink
                          to="/"
                          className={styles.headerPagesTablet}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <HiOutlineHome
                            className={styles.homePageIcon}
                            style={{ paddingRight: "4px", width: "40px", visibility: "hidden" }}
                          />{" "}
                          <span>Sare</span>
                        </HashLink>
                        <HashLink
                          to="/"
                          className={styles.headerPagesTablet}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <HiOutlineHome
                            className={styles.homePageIcon}
                            style={{ paddingRight: "4px", width: "40px", visibility: "hidden" }}
                          />{" "}
                          <span>Siropuri</span>
                        </HashLink>
                        <HashLink
                          to="/"
                          className={styles.headerPagesTablet}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <HiOutlineHome
                            className={styles.homePageIcon}
                            style={{ paddingRight: "4px", width: "40px", visibility: "hidden" }}
                          />{" "}
                          <span>Sapunuri</span>
                        </HashLink>
                        <HashLink
                          to="/"
                          className={styles.headerPagesTablet}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <HiOutlineHome
                            className={styles.homePageIcon}
                            style={{ paddingRight: "4px", width: "40px", visibility: "hidden" }}
                          />{" "}
                          <span>Bombe</span>
                        </HashLink>
                      </div>
                      <div className={styles.heroSectionInOpenedToggleMobile}>
                        <img
                          src={images.DinMunteLogo}
                          alt=""
                          style={{ width: "117px", paddingBottom: "10px", paddingLeft: "10px" }}
                        />
                        <HelloAllNew />
                      </div>
                    </div>
                    <div className={styles.despre_contact_TabletContainer}>
                      <HashLink to="/" className={styles.headerPagesTablet}>
                        Despre Noi
                      </HashLink>
                      <HashLink to="/" className={styles.headerPagesTablet}>
                        Contacteaza-ne
                      </HashLink>
                    </div>
                    <div className={styles.tabletIconsContainer}>
                      <span>
                        <FaFacebookF size={40} />
                      </span>
                      <span>
                        <AiOutlineTwitter size={40} />
                      </span>
                      <span>
                        <AiOutlineInstagram size={40} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {/* Old Navbar */}
        {/* {!pathname.includes("/admin") && !pathname.includes("/login") && (
        <>
          <TopBanner />
          <div className={styles.WeRomanians} />
          <div className={styles.wrapper}>
            <div className={styles.navbarContainer}>
              <div className={styles.sideLeftContainer}></div>
              <ul className={styles.ulMenuEnd}>
                <li onClick={() => sendAnalyticsIdea()} className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} smooth to={navItems.ourProducts.link}>
                    {navItems.ourProducts.name}
                  </NavHashLink>
                </li>
                <li className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} to={navItems.blog.link}>
                    {navItems.blog.name}
                  </NavHashLink>
                </li>
              </ul>

              <div className={styles.middleNoUl}>
                <HashLink className={styles.logoHover} to="/">
                  <img alt="logo" className={styles.montanLogo} src={images.montanLogo} />
                </HashLink>
              </div>

              <MenuMobileSide />
              <ul className={styles.ulMenuStart}>
                <li className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} to={navItems.intrebariFrecvente.link}>
                    {navItems.intrebariFrecvente.name}
                  </NavHashLink>
                </li>
                <li className={styles.liItem}>
                  <NavHashLink className={styles.HashLinkStyle} to={navItems.contactUs.name}>
                    {navItems.contactUs.name}
                  </NavHashLink>
                </li>
              </ul>
              <div className={styles.sideRightContainer}>
                <NavHashLink className={styles.hashTransparent} to={cart.link}>
                  <img alt="cart icon" className={styles.shopIcon} src={images.cartLogo} />
                  <span className={styles.jewel}>{totalItems}</span>
                </NavHashLink>
              </div>
            </div>
          </div>
        </>
      )} */}
      </div>
    </div>
  );
};

export default NavbarNew;
