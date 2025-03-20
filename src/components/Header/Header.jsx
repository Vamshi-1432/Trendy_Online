import React, { useEffect, useRef, useState } from "react";
import "../../styles/styleComponents/Header/header.css";
import logo from "../../images/Header/logo.png";
import Input from "../SearchBar/Input/Input";
import CartItems from "../../pages/Cart/CartItems/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { setValidLoginUser } from "../../redux/loginSlice";
import { setShowWishlist } from "../../redux/wishListSlice/wishListItems";
import SearchResults from "../SearchBar/SearchResults/SearchResults";
import cart from "../../images/Cart/CartItems/cart.png";
import { setShowCart } from "../../redux/cartSlice/cartSlice";

const Header = () => {
  const [showMenuList, setShowMenuList] = useState(false);
  const WishlistItems = useSelector((store) => store.wishlist.wishlistItem);
  const showResults = useSelector((state) => state.search.showResults);
  const menuRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenuList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("loggedIn");
    dispatch(setValidLoginUser(false));
  };

  const handleShowWishlist = () => {
    dispatch(setShowWishlist());
  };
  const headings = [
    { id: 1, title: "Home", link: "#home", active: true },
    { id: 2, title: "Books", link: "#books", active: false },
    { id: 3, title: "Mobiles", link: "#mobiles", active: false },
    { id: 4, title: "Tablets", link: "#tablets", active: false },
    { id: 5, title: "Laptops", link: "#laptops", active: false },
    { id: 6, title: "Cameras", link: "#cameras", active: false },
  ];

  const handleMenuList = () => {
    setShowMenuList(!showMenuList);
  };

  const handleCart = () => {
    dispatch(setShowCart());
  };
  return (
    <div className="header-outer-container">
      <div className="header-logo-container">
        <img src={logo} alt="Shopping" className="header-logo" />
      </div>

      <div className="header-main-container">
        <nav>
          <ul>
            {headings.map((li) => (
              <li key={li.id} className="header-title">
                <a href={li.link}>{li.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-menu-container hide-menu">
          <button className="header-menu-button" onClick={handleMenuList}>
            <ion-icon name="menu-outline" />
          </button>
        </div>
        {showMenuList && (
          <div ref={menuRef} className="header-menu-list-container">
            <nav>
              <ul className="header-sidebar">
                <button
                  onClick={() => setShowMenuList(false)}
                  className="header-sidebar-close"
                >
                  <ion-icon name="close-outline" />
                </button>
                {headings.map((li) => (
                  <li key={li.id}>
                    {" "}
                    <a href={li.link} className="header-title">
                      <h6>{li.title}</h6>
                    </a>
                  </li>
                ))}
                <div className="header-menu-items">
                  <div onClick={handleShowWishlist}>
                    <ion-icon name="heart" />
                  </div>
                  <img
                    src={cart}
                    alt="cart"
                    className="cart-image"
                    onClick={handleCart}
                  />
                </div>
              </ul>
            </nav>
          </div>
        )}

        <Input />
        {showResults && <SearchResults />}
      </div>

      <div className="header-wishlist-container" onClick={handleShowWishlist}>
        <ion-icon name="heart" />
        <p className="header-wishitems-count">{WishlistItems.length}</p>
      </div>

      <div className="header-cart-container">
        <CartItems />
      </div>

      <div className="header-logout-container" onClick={handleLogOut}>
        <ion-icon name="person-circle-outline" />
      </div>
    </div>
  );
};

export default Header;
