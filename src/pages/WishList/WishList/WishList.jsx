import React, { useEffect, useState, useRef, useCallback } from "react";
import WishListContainer from "../WishListContainer/WishListContainer";
import "../../../styles/styleComponents/pages/WishList/WishList/wishList.css";

const WishList = () => {
  const wishlistRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 275,
    y: window.innerHeight / 2 - 300,
  });

  // Check if the device is in portrait mode and below 576px
  const isMobilePortrait = window.matchMedia(
    "(max-width: 576px) and (orientation: portrait)"
  ).matches;

  const handleMouseDown = (e) => {
    if (isMobilePortrait) return; // Prevent dragging in portrait mode
    setDragging(true);
    const rect = wishlistRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging || isMobilePortrait) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    },
    [dragging, offset, isMobilePortrait]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (!isMobilePortrait) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isMobilePortrait]);

  return (
    <div
      ref={wishlistRef}
      className={`wishlist-main-container ${
        isMobilePortrait ? "centered" : ""
      }`}
      style={
        !isMobilePortrait
          ? { top: `${position.y}px`, left: `${position.x}px` }
          : {}
      }
      onMouseDown={handleMouseDown}
    >
      <WishListContainer />
    </div>
  );
};

export default WishList;
