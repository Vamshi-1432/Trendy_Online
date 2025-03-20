import React from "react";
import "../../../styles/styleComponents/pages/ProductPage/ProductDetails/productDetails.css";
import ProductSpecifications from "./ProductSpecifications/ProductSpecifications";
import PropTypes from "prop-types";

const ProductDetails = ({ product }) => {
  const formatCurrency = (value) => {
    /* eslint-disable no-undef */
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  return (
    <div className="product-details-container">
      <div className="product-details-heading">
        <h3>{product.name}</h3>
        <p
          className="product-stock"
          style={{
            color: product.quantity > 0 ? "rgb(84, 200, 124)" : "brown",
          }}
        >
          | {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
      <img src={product.logo} alt=" " className="product-details-brand-logo" />

      <div className="product-price-container">
        <p className="product-price">{formatCurrency(product.price)}</p>
        <p className="product-original-price">
          {formatCurrency(product.originalPrice)}
        </p>
      </div>
      <p>{product.description}</p>
      <hr />
      <h6 className="product-specifications">Specifications:</h6>
      <ProductSpecifications
        type={product.type}
        specifications={product.specifications}
      />
      <p className="product-warranty">Warranty: {product.warranty}</p>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetails;
