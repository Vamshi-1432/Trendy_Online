import React from "react";
import "../../../styles/styleComponents/pages/Cart/CartAddedItems/cartAddedItems.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  removeCartItem,
} from "../../../redux/cartSlice/cartSlice";
import {
  removeWishlistItem,
  setWishlistItem,
} from "../../../redux/wishListSlice/wishListItems";

const CartAddedItems = ({ item }) => {
  if (!item) return null;
  const {
    id,
    name,
    description,
    author,
    price,
    originalPrice,
    discount,
    image,
    alt,
    quantity,
  } = item;
  console.log(item);

  const dispatch = useDispatch();
  const WishlistItems = useSelector((store) => store.wishlist.wishlistItem);

  const isInWishlist = WishlistItems.some((item) => item.id === id);

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    if (quantity >= 1) {
      dispatch(changeQuantity({ id, quantity: quantity + 1 }));
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeCartItem({ id }));
  };

  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleWishList = (book) => {
    if (isInWishlist) {
      dispatch(removeWishlistItem(book));
    } else {
      dispatch(setWishlistItem(book));
    }
  };

  return (
    <div className="added-cart-items-container">
      <div className="added-cart-item">
        <div className="added-cart-item-details">
          <img src={image} className="added-cart-item-image" alt={alt} />
          <div className="added-cart-item-info">
            <p className="added-cart-item-title">{name}</p>
            <p className="added-cart-item-price">
              Price: {formatCurrency(price * quantity)} |{" "}
              <span className="added-cart-item-discount">{discount}</span>
            </p>
            <div className="added-cart-item-actions">
              <button
                className="quantity-button"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <p className="item-quantity">{quantity}</p>
              <button
                className="quantity-button"
                aria-label="Increase quantity"
                onClick={handleIncrease}
              >
                +
              </button>
              <button
                className="added-cart-remove-item-btn"
                onClick={handleRemoveItem}
              >
                <ion-icon name="trash-outline" />
              </button>
              <div
                className="added-cart-wishlist"
                onClick={() =>
                  handleWishList({
                    id,
                    name,
                    description,
                    author,
                    price,
                    originalPrice,
                    discount,
                    image,
                    alt,
                    quantity: 1,
                  })
                }
              >
                <ion-icon name={isInWishlist ? "heart" : "heart-outline"} />
              </div>
            </div>
          </div>
        </div>
        <hr className="added-cart-item-line" />
      </div>
    </div>
  );
};

export default CartAddedItems;
