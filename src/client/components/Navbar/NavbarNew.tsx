import React, { useEffect, useState } from "react";
import { HashLink, NavHashLink } from "react-router-hash-link";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import { getCartItems } from "../CartPage/CartPage";
import TopBanner from "./TopBanner";
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

const NavbarNew: React.FC<NavProps> = ({ clearNotif }) => {
  const { navMenu: navItems, cart } = strings;
  const { pathname } = useLocation();
  const [totalItems, setTotalItems] = useState<number>(getCartItems());
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    setTotalItems(getCartItems());
  }, [clearNotif]);

  const sendAnalyticsIdea = () => {
    ReactGA.event("User pressed on gallery");
  };

  const toggleHandler = () => setOpenNav((open) => !open);

  // Helper for desktop/mobile nav links (add more if you want)
  const navLinks = [
    { to: "/saredebai", label: "Sare" },
    { to: "/produsele-noastre", label: "Siropuri" },
    { to: "/sapunuri", label: "Sapunuri" },
    { to: "/bombe", label: "Bombe" },
    { to: "/desprenoi", label: "Despre Noi" },
  ];

  return (
    <div className="navbarParentContainer">
      <div className="header_navbarnew_container">
        {!pathname.includes("/admin") && !pathname.includes("/login") && (
          <>
            {!openNav && <TopBanner />}

            {/* Desktop Navbar */}
            <div className={styles.headerParentContainer}>
              <div className={styles.navbarnewContainer}>
                <HashLink className={styles.logoHover} to="/">
                  <img alt="logo" className={styles.updatedLogo} src={images.updatedLogo} />
                </HashLink>
                <div className={styles.navbarLaptopPagesConatiner}>
                  {navLinks.map((nav, idx) => (
                    <HashLink key={idx} to={nav.to} className={styles.headerPages}>
                      {nav.label}
                    </HashLink>
                  ))}
                </div>
                <div>
                  <NavHashLink className={styles.searchIconParent} to={cart.link}>
                    <img alt="search icon" className={styles.searchIcon} src={images.searchIcon} />
                  </NavHashLink>
                  <NavHashLink className={styles.hashTransparent} to={cart.link}>
                    <img alt="cart icon" className={styles.shopIcon} src={images.cartLogo} />
                    <span className={styles.jewel}>{totalItems}</span>
                  </NavHashLink>
                  <NavHashLink className={styles.HashLinkStyle} to={navItems.contactUs.link}>
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
                        <HiOutlineHome className={styles.homePageIcon} style={{ paddingRight: "4px", width: "40px" }} />
                        <span>Home</span>
                      </HashLink>
                      {navLinks.map((nav, idx) => (
                        <HashLink
                          key={idx}
                          to={nav.to}
                          className={styles.headerPagesTablet}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <HiOutlineHome
                            className={styles.homePageIcon}
                            style={{ paddingRight: "4px", width: "40px", visibility: "hidden" }}
                          />
                          <span>{nav.label}</span>
                        </HashLink>
                      ))}
                    </div>
                    <div className={styles.heroSectionInOpenedToggleMobile}>
                      <img
                        src={images.DinMunteLogo}
                        alt="logo"
                        style={{ width: "117px", paddingBottom: "10px", paddingLeft: "10px" }}
                      />
                      <HelloAllNew />
                    </div>
                  </div>
                  <div className={styles.despre_contact_TabletContainer}>
                    <HashLink to="/desprenoi" className={styles.headerPagesTablet}>
                      Despre Noi
                    </HashLink>
                    <HashLink to={navItems.contactUs.link} className={styles.headerPagesTablet}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarNew;
