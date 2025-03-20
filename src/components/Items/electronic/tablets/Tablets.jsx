import React, { useEffect, useState } from "react";
import "../../../../styles/styleComponents/Items/electronic/electronics/tablets/tablets.css";
import data from "../../../../data/products.json";
import arrow from "../../../../images/button.png";
import {
  removeWishlistItem,
  setWishlistItem,
} from "../../../../redux/wishListSlice/wishListItems";
import { useDispatch, useSelector } from "react-redux";
import { setAddCartItems } from "../../../../redux/cartSlice/cartSlice";
import { useNavigate } from "react-router";
import { setSelectedItem } from "../../../../redux/item-menu-slice/itemMenuSlice";

const Tablets = () => {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const navigate = useNavigate();

  const tablets = data.filter(
    (item) => item.category === "electronics" && item.type === "tablets"
  );
  const listItems = useSelector((store) => store.wishlist.wishlistItem);
  const dispatch = useDispatch();

  useEffect(() => {
    const updatedWishlistStatus = {};
    listItems.forEach((item) => {
      updatedWishlistStatus[item.id] = true;
    });
    setWishlistStatus(updatedWishlistStatus);
  }, [listItems]);

  const handleAddWishlist = (mobile) => {
    const isInWishlist = wishlistStatus[mobile.id];
    if (isInWishlist) {
      dispatch(removeWishlistItem(mobile));
    } else {
      dispatch(setWishlistItem(mobile));
    }
    setWishlistStatus((prevState) => ({
      ...prevState,
      [mobile.id]: !isInWishlist,
    }));
  };

  const handleAddCart = (mobile) => {
    dispatch(setAddCartItems(mobile));
  };

  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleSelectedItem = (item) => {
    dispatch(setSelectedItem(item));
  };

  const handleNavigate = () => {
    navigate("/tablets");
  };

  return (
    <div className="tablets-outer-container" id="tablets">
      <h6 className="tablets-heading-containerh4">Tablets</h6>
      <hr className="tablets-heading-containerhr" />

      <ul className="tablets-list">
        {tablets.map(
          ({
            id,
            category,
            type,
            name,
            brand,
            description,
            specifications,
            warranty,
            price,
            originalPrice,
            discount,
            image,
            logo,
            alt,
            imageGallery,
            quantity,
          }) => (
            <li key={id} className="tablets-item">
              <div className="tablets-card">
                <img
                  src={image}
                  alt={alt}
                  className="tablets-image"
                  onClick={() => {
                    handleSelectedItem({
                      id,
                      category,
                      type,
                      name,
                      brand,
                      description,
                      specifications,
                      warranty,
                      price,
                      originalPrice,
                      discount,
                      image,
                      logo,
                      alt,
                      imageGallery,
                      quantity,
                    });
                    handleNavigate();
                  }}
                />
                <h3 className="tablets-title">{name}</h3>
                <p className="tablets-brand">
                  <span>
                    <img
                      className="tablets-brand-logo"
                      src={logo}
                      alt={brand}
                    />
                  </span>
                  {/* {brand} */}
                </p>
                <p className="tablets-description">{description}</p>
                <div className="tablets-price-container">
                  <p className="tablets-price">
                    Price:{" "}
                    <span className="price">{formatCurrency(price)}</span>
                    <p>
                      Original:{" "}
                      <span className="original-price">
                        {formatCurrency(originalPrice)}
                      </span>{" "}
                      |{" "}
                      <span className="tablets-discount">
                        {formatCurrency(discount)}
                      </span>
                    </p>
                  </p>
                </div>
                <div className="tablets-button-container">
                  <button
                    className="tablets-button"
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
                  >
                    Add to Cart{" "}
                    <img src={arrow} alt="" className="tablets-button-arrow" />
                  </button>
                  <button
                    className="tablets-button-wishlist"
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
                  >
                    <ion-icon
                      name={wishlistStatus[id] ? "heart" : "heart-outline"}
                    />
                  </button>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Tablets;
