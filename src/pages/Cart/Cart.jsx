import React, { useEffect, useRef, useState, useCallback } from "react";
import "../../styles/styleComponents/pages/Cart/cart.css";
import CartContainer from "./CartContainer/CartContainer";
import CartPayValue from "./CartPayValue/CartPayValue";
import { useDispatch, useSelector } from "react-redux";
import cartImage from "../../images/Cart/CartItems/cart.png";
import { setShowCart } from "../../redux/cartSlice/cartSlice";
import OrderReceipt from "./PDF/OrderReceipt";

const Cart = () => {
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const cartRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [position, setPosition] = useState({
    x: (window.innerWidth - 550) / 2,
    y: (window.innerHeight - 600) / 2,
  });

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleCartClose = () => {
    dispatch(setShowCart(false));
  };

  const handleMouseDown = (e) => {
    if (isMobile) return; // Disable dragging on mobile
    setDragging(true);
    const rect = cartRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging || isMobile) return;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 550, e.clientX - offset.x)),
        y: Math.max(
          0,
          Math.min(window.innerHeight - 600, e.clientY - offset.y)
        ),
      });
    },
    [dragging, offset, isMobile]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="cart-main-container"
      ref={cartRef}
      style={{
        top: isMobile ? "50%" : `${position.y}px`,
        left: isMobile ? "50%" : `${position.x}px`,
        transform: isMobile ? "translate(-50%, -50%)" : "none",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="cart-logo-container">
        <img src={cartImage} alt="Cart" className="cart-image-logo" />
        <h4 className="cart-items-title">Your Cart</h4>
        <div className="cart-close" onClick={handleCartClose}>
          <ion-icon name="close-outline" />
        </div>
      </div>
      <div className="cart-items-receipt">
        <OrderReceipt />
      </div>
      <hr className="cart-line" />
      <div className="cart-content">
        <CartContainer />
        {items.length > 0 && <CartPayValue />}
      </div>
    </div>
  );
};

export default Cart;
