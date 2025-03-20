import React from "react";
import PropTypes from "prop-types";
import "../../../styles/styleComponents/pages/ProductPage/ProductImages/productImages.css";

const ProductImages = ({ images, onImageClick }) => {
  if (!Array.isArray(images)) {
    console.error(
      "ProductImages component expected 'images' to be an array, but got:",
      images
    );
    return null;
  }

  return (
    <div className="product-image-container">
      {images.map((im, index) => (
        <img
          key={index}
          src={im}
          alt={`Product ${index}`}
          className="product-image"
          onClick={() => onImageClick(im)}
        />
      ))}
    </div>
  );
};

ProductImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ProductImages;
