import React from "react";
import { useSelector } from "react-redux";
import "../../../styles/styleComponents/pages/Cart/CartContainer/cartContainer.css";
import CartAddedItems from "../CartAddedItems/CartAddedItems";

const CartContainer = () => {
  const items = useSelector((store) => store.cart.items);

  return (
    <>
      <div
        style={{ borderRight: items.length > 0 ? "1px solid black" : "none" }}
      >
        {items.length > 0 ? (
          <div className="cart-items-scrollable">
            {items.map((item) => (
              <CartAddedItems key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="cart-empty-container">
            <div className="cart-empty-icon">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
            <p className="cart-empty-title">Your cart is empty</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartContainer;
