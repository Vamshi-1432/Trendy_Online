import React, { useEffect, useState, useRef, useCallback } from "react";
import WishListContainer from "../WishListContainer/WishListContainer";
import "../../../styles/styleComponents/pages/WishList/WishList/wishList.css";

const WishList = () => {
  const wishlistRef = useRef(null);

  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 275,
    y: window.innerHeight / 2 - 300,
  });

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = wishlistRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    },
    [dragging, offset]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={wishlistRef}
      className="wishlist-main-container"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseDown={handleMouseDown}
    >
      <WishListContainer />
    </div>
  );
};

export default WishList;
