import React from "react";
import "../../../styles/styleComponents/Footer/FooterItems/footerItems.css";
import { useDispatch } from "react-redux";
import { setShowWishlist } from "../../../redux/wishListSlice/wishListItems";
import { setShowCart } from "../../../redux/cartSlice/cartSlice";

const FooterItems = () => {
  const dispatch = useDispatch();

  const handleShowWishlist = () => {
    dispatch(setShowWishlist());
  };

  const handleCart = () => {
    dispatch(setShowCart());
  };

  return (
    <div className="footer-items-container">
      <ul className="footer-items-list">
        <li>
          <h5>About Us</h5>
          <p className="footer-items-about">
            Trendy Online Store is your go-to destination for the latest
            fashion, electronics, and lifestyle products. Shop with confidence
            and enjoy exclusive deals!
          </p>
        </li>
        <li>
          <h5>Exclusive</h5>
          <p className="footer-items-subscribe">Subscribe</p>
          <p className="footer-items-off">Get 15% off on your first order</p>
        </li>
        <li className="footer-items-support">
          <h5>Support</h5>
          <span className="support-info">
            <ion-icon name="mail-outline"></ion-icon>
            <p>trendyonlinestore8@gmail.com</p>
          </span>
          <span className="support-call">
            <ion-icon name="phone-portrait-outline" />
            <p>+91-9912345678</p>
          </span>
        </li>
        <li>
          <h5>Account</h5>
          <p className="footer-items-account" onClick={handleCart}>
            Cart
          </p>
          <p className="footer-items-account" onClick={handleShowWishlist}>
            Wishlist
          </p>
        </li>
        <li>
          <h5>Quick Link</h5>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
        </li>
        <li>
          <h5>Social</h5>
          <span className="social-icons">
            <ion-icon name="logo-twitter" />
            <ion-icon name="logo-instagram" />
            <ion-icon name="logo-facebook" />
            <ion-icon name="logo-linkedin" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default FooterItems;
