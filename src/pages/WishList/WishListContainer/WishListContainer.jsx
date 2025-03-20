import React, { useEffect, useState } from "react";
import "../../../styles/styleComponents/pages/WishList/WishListContainer/wishListContainer.css";
import WishListAddedItems from "../WishListAddedItems/WishListAddedItems";
import { useDispatch, useSelector } from "react-redux";
import { setShowWishlist } from "../../../redux/wishListSlice/wishListItems";

const WishListContainer = () => {
  const [heartFill, setHeartFill] = useState(false);

  const WishlistItems = useSelector((store) => store.wishlist.wishlistItem);

  const dispatch = useDispatch();
  useEffect(() => {
    if (WishlistItems.length > 0) {
      setHeartFill(true);
    } else {
      setHeartFill(false);
    }
  }, [WishlistItems]);

  const handleWishlistClose = () => {
    dispatch(setShowWishlist(false));
  };

  return (
    <div className="wishList-inner-container">
      <div className="close-icon" onClick={handleWishlistClose}>
        <ion-icon name="close-outline" />
      </div>
      <div className="wishList-logo-container">
        <ion-icon name={heartFill ? "heart" : "heart-outline"} />
        <h4 className="wishList-items-title">My Wishlist</h4>
      </div>
      <hr className="wishList-line" />
      <div
        className="wishlist-addedItems-container"
        style={{ height: WishlistItems.length > 0 ? "450px" : "10px" }}
      >
        {WishlistItems.map((listItems) => (
          <WishListAddedItems listItems={listItems} key={listItems.id} />
        ))}
      </div>
      <div className="wishList-empty-container">
        {WishlistItems.length === 0 && (
          <p className="wishList-empty-title">Your Wishlist is empty</p>
        )}
      </div>
    </div>
  );
};

export default WishListContainer;
