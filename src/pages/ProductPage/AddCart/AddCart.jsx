import React, { useState } from "react";
import "../../../styles/styleComponents/pages/ProductPage/AddCart/addCart.css";
import arrow from "../../../images/button.png";
import { useDispatch } from "react-redux";
import {
  removeWishlistItem,
  setWishlistItem,
} from "../../../redux/wishListSlice/wishListItems";
import { setAddCartItems } from "../../../redux/cartSlice/cartSlice";

const AddCart = (product) => {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const {
    id,
    name,
    image,
    alt,
    description,
    price,
    discount,
    brand,
    originalPrice,
  } = product;

  const dispatch = useDispatch();

  const handleAddWishlist = (item) => {
    const isInWishlist = wishlistStatus[item.id];
    if (isInWishlist) {
      dispatch(removeWishlistItem(item));
    } else {
      dispatch(setWishlistItem(item));
    }
    setWishlistStatus((prevState) => ({
      ...prevState,
      [item.id]: !isInWishlist,
    }));
  };

  const handleAddCart = (mobile) => {
    dispatch(setAddCartItems(mobile));
  };

  console.log(product);
  return (
    <div className="add-cart-container">
      <img
        src={arrow}
        alt=""
        className="add-cart-button"
        onClick={() =>
          handleAddCart({
            id,
            name,
            description,
            brand,
            price,
            originalPrice,
            discount,
            image,
            alt,
            quantity: 1,
          })
        }
      />

      <button
        onClick={() =>
          handleAddWishlist({
            id,
            name,
            image,
            alt,
            description,
            price,
            discount,
          })
        }
        className="add-wish-button"
      >
        <ion-icon name={wishlistStatus[id] ? "heart" : "heart-outline"} />
      </button>
    </div>
  );
};

export default AddCart;
