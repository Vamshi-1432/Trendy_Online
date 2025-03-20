import React, { useState, useEffect } from "react";
import "../../../styles/styleComponents/Items/books/books.css";
import booksInfo from "../../../data/products.json";
import arrow from "../../../images/button.png";
import { useDispatch, useSelector } from "react-redux";
import { setAddCartItems } from "../../../redux/cartSlice/cartSlice";
import {
  removeWishlistItem,
  setWishlistItem,
} from "../../../redux/wishListSlice/wishListItems";

const Books = () => {
  const [wishlistStatus, setWishlistStatus] = useState({});

  const books = booksInfo.filter((book) => book.category === "books");
  const listItems = useSelector((store) => store.wishlist.wishlistItem);
  const dispatch = useDispatch();

  useEffect(() => {
    const updatedWishlistStatus = {};
    listItems.forEach((item) => {
      updatedWishlistStatus[item.id] = true;
    });
    setWishlistStatus(updatedWishlistStatus);
  }, [listItems]);

  const handleAddCart = (book) => {
    dispatch(setAddCartItems(book));
  };

  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleAddWishlist = (book) => {
    const isInWishlist = wishlistStatus[book.id];

    if (isInWishlist) {
      dispatch(removeWishlistItem(book));
    } else {
      dispatch(setWishlistItem(book));
    }

    setWishlistStatus((prevState) => ({
      ...prevState,
      [book.id]: !isInWishlist,
    }));
  };

  return (
    <>
      <div id="books" className="books-outer-container">
        <h4 className="books-heading-containerh4">Books</h4>
        <hr className="books-heading-containerhr" />

        <ul className="books-list">
          {books.map(
            ({
              id,
              name,
              description,
              author,
              price,
              originalPrice,
              discount,
              image,
              alt,
            }) => (
              <li key={id} className="book-item">
                <div className="book-card">
                  <img src={image} alt={alt} className="book-image" />
                  <h3 className="book-title">{name}</h3>
                  <p className="book-description">{description}</p>
                  <p className="book-author">Author: {author}</p>
                  <p className="book-price">
                    Price:{" "}
                    <span className="price">{formatCurrency(price)} | </span>{" "}
                    <span className="original-price">
                      {formatCurrency(originalPrice)}
                    </span>{" "}
                    | <span className="book-discount">{discount}</span>
                  </p>
                  <div className="book-button-container">
                    <button
                      className="book-button"
                      onClick={() =>
                        handleAddCart({
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
                      Add to Cart{" "}
                      <img src={arrow} alt="" className="book-button-arrow" />
                    </button>
                    <button
                      className="book-button-wishlist"
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
    </>
  );
};

export default Books;
