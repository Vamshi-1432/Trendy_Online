import React, { useEffect, useState } from "react";
import "../../../../styles/styleComponents/Items/electronic/electronics/cameras/cameras.css";
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

const Cameras = () => {
  const [wishlistStatus, setWishlistStatus] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cameras = data.filter(
    (item) => item.category === "electronics" && item.type === "cameras"
  );

  const listItems = useSelector((store) => store.wishlist.wishlistItem);

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
    navigate("/cameras");
  };

  return (
    <div className="cameras-outer-container" id="cameras">
      <h6 className="cameras-heading-containerh4">Cameras</h6>
      <hr className="cameras-heading-containerhr" />
      <ul className="cameras-list">
        {cameras.map(
          ({
            id,
            category,
            type,
            name,
            brand,
            model,
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
            <li key={id} className="cameras-item">
              <div className="cameras-card">
                <img
                  src={image}
                  alt={alt}
                  className="cameras-image"
                  onClick={() => {
                    handleSelectedItem({
                      id,
                      category,
                      type,
                      name,
                      brand,
                      model,
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
                <h3 className="cameras-title">{name}</h3>
                <p className="cameras-brand">
                  <span>
                    <img
                      className="cameras-brand-logo"
                      src={logo}
                      alt={brand}
                    />
                  </span>
                </p>
                <p className="cameras-description">{description}</p>
                <div className="cameras-price-container">
                  <p className="cameras-price">
                    Price:{" "}
                    <span className="price">{formatCurrency(price)}</span>
                    <p>
                      Original:{" "}
                      <span className="original-price">
                        {formatCurrency(originalPrice)}
                      </span>{" "}
                      |{" "}
                      <span className="cameras-discount">
                        {" "}
                        {formatCurrency(discount)}
                      </span>
                    </p>
                  </p>
                </div>
                <div className="cameras-button-container">
                  <button
                    className="cameras-button"
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
                    <img src={arrow} alt="" className="cameras-button-arrow" />
                  </button>
                  <button
                    className="cameras-button-wishlist"
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

export default Cameras;
