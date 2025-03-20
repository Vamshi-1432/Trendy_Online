import React, { Fragment, useEffect, useState } from "react";
import "../../../../styles/styleComponents/Items/electronic/electronics/mobiles/mobiles.css";
import data from "../../../../data/products.json";
import arrow from "../../../../images/button.png";
import { useDispatch, useSelector } from "react-redux";
import {
  removeWishlistItem,
  setWishlistItem,
} from "../../../../redux/wishListSlice/wishListItems";
import { setAddCartItems } from "../../../../redux/cartSlice/cartSlice";
import { setSelectedItem } from "../../../../redux/item-menu-slice/itemMenuSlice";
import { useNavigate } from "react-router";

const Mobile = () => {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const navigate = useNavigate();
  const mobiles = data.filter(
    (item) => item.category === "electronics" && item.type === "mobiles"
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
    navigate("/mobiles");
  };

  // const handleNavigate = () => {};

  return (
    <Fragment>
      <div className="mobiles-outer-container" id="mobiles">
        <h6 className="mobiles-heading-containerh4">Mobiles</h6>
        <hr className="mobiles-heading-containerhr" />
        <ul className="mobiles-list">
          {mobiles.map(
            ({
              id,
              category,
              type,
              name,
              brand,
              model,
              description,
              specifications,
              imageGallery,
              warranty,
              price,
              originalPrice,
              discount,
              image,
              logo,
              alt,
              quantity,
            }) => (
              <li key={id} className="mobiles-item">
                <div className="mobiles-card">
                  <img
                    src={image}
                    alt={alt}
                    className="mobiles-image"
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
                        imageGallery,
                        warranty,
                        price,
                        originalPrice,
                        discount,
                        image,
                        logo,
                        alt,
                        quantity,
                      });
                    }}
                  />
                  <h3 className="mobiles-title">{name}</h3>
                  <p className="mobiles-brand">
                    <span>
                      <img
                        className="mobiles-brand-logo"
                        src={logo}
                        alt={brand}
                      />
                    </span>
                    {/* {brand} */}
                  </p>
                  <p className="mobiles-description">{description}</p>
                  <div className="mobiles-price-container">
                    <p className="mobiles-price">
                      Price:{" "}
                      <span className="price">{formatCurrency(price)}</span>
                      <p>
                        Original:{" "}
                        <span className="original-price">
                          {formatCurrency(originalPrice)}
                        </span>{" "}
                        |{" "}
                        <span className="mobiles-discount">
                          {formatCurrency(discount)}
                        </span>
                      </p>
                    </p>
                  </div>
                  <div className="mobiles-button-container">
                    <button
                      className="mobiles-button"
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
                      <img
                        src={arrow}
                        alt=""
                        className="mobiles-button-arrow"
                      />
                    </button>
                    <button
                      className="mobiles-button-wishlist"
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
    </Fragment>
  );
};

export default Mobile;
