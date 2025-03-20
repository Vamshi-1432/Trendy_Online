import React, { useEffect, useState } from "react";
import "../../../../styles/styleComponents/Items/electronic/electronics/laptops/laptops.css";
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

const Laptops = () => {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const navigate = useNavigate();
  const laptops = data.filter(
    (item) => item.category === "electronics" && item.type === "laptops"
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

  const handleAddWishlist = (laptop) => {
    const isInWishlist = wishlistStatus[laptop.id];
    if (isInWishlist) {
      dispatch(removeWishlistItem(laptop));
    } else {
      dispatch(setWishlistItem(laptop));
    }
    setWishlistStatus((prevState) => ({
      ...prevState,
      [laptop.id]: !isInWishlist,
    }));
  };

  const handleAddCart = (laptop) => {
    dispatch(setAddCartItems(laptop));
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
    navigate("/laptops");
  };
  return (
    <div className="laptops-outer-container" id="laptops">
      <h6 className="laptops-heading-containerh4">Laptops</h6>
      <hr className="laptops-heading-containerhr" />
      <ul className="laptops-list">
        {laptops.map(
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
            <li key={id} className="laptops-item">
              <div className="laptops-card">
                <img
                  src={image}
                  alt={alt}
                  className="laptops-image"
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
                <h3 className="laptops-title">{name}</h3>{" "}
                <p className="laptops-brand">
                  <span>
                    <img
                      className="laptops-brand-logo"
                      src={logo}
                      alt={brand}
                    />
                  </span>
                  {/* {brand} */}
                </p>
                <p className="laptops-description">{description}</p>
                <div className="laptops-price-container">
                  <p className="laptops-price">
                    Price:{" "}
                    <span className="price">{formatCurrency(price)}</span>
                    <p>
                      Original:{" "}
                      <span className="original-price">
                        {formatCurrency(originalPrice)}
                      </span>{" "}
                      |{" "}
                      <span className="laptops-discount">
                        {" "}
                        {formatCurrency(discount)}
                      </span>
                    </p>
                  </p>
                </div>
                <div className="laptops-button-container">
                  <button
                    className="laptops-button"
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
                    <img src={arrow} alt="" className="laptops-button-arrow" />
                  </button>
                  <button
                    className="laptops-button-wishlist"
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

export default Laptops;
