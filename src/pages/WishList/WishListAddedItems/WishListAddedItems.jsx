import React from "react";
import "../../../styles/styleComponents/pages/WishList/WishListAddedItems/wishListAddedItems.css";
import { useDispatch } from "react-redux";
import arrow from "../../../images/button.png";
import { setAddCartItems } from "../../../redux/cartSlice/cartSlice";
import { removeWishlistItem } from "../../../redux/wishListSlice/wishListItems";

const WishListAddedItems = ({ listItems }) => {
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
  } = listItems || {}; 
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(setAddCartItems(book));
  };
  const handleRemoveItem = (book) => {
    dispatch(removeWishlistItem(book));
  };

  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  return (
    <div className="added-wishList-items-container">
      <div className="added-wishList-item">
        <div className="added-wishList-item-details" key={id}>
          <img src={image} className="added-wishList-item-image" alt={alt} />
          <div className="added-wishList-item-info">
            <p className="added-wishList-item-title">{name}</p>
            <p className="added-wishList-item-desc">{description}</p>
            <div className="added-wishList-item-actions">
              <p className="added-wishList-item-price">
                Price: {formatCurrency(price)} |{" "}
                <span className="added-wishList-item-discount">{discount}</span>
              </p>
              <button
                className="added-wishlist-add-cart-btn"
                onClick={() =>
                  handleAddToCart({
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
                <img
                  src={arrow}
                  className="added-wishlist-add-cart"
                  alt="Add to Cart"
                />
              </button>
              <button
                className="added-wishList-remove-item-btn"
                onClick={() =>
                  handleRemoveItem({
                    id,
                    name,
                    description,
                    author,
                    price,
                    originalPrice,
                    discount,
                    image,
                    alt,
                  })
                }
              >
                <ion-icon name="trash-outline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListAddedItems;
