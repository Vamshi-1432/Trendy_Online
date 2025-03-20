import React, { useState } from "react";
import "../../../../styles/styleComponents/pages/ProductPage/Products/CamerasPage/camerasPage.css";
import { useSelector } from "react-redux";
import ProductImages from "../../ProductImages/ProductImages";
import ProductDetails from "../../ProductDetails/ProductDetails";
import AddCart from "../../AddCart/AddCart";
// import DeliveryDetails from "../../DeliveryDetails/DeliveryDetails";

const CamerasPage = () => {
  const selectedItem = useSelector((store) => store.items.selectedItem);

  const [image, setImage] = useState(selectedItem.imageGallery[0]);

  const handleImageClick = (image) => {
    setImage(image);
  };

  return (
    <div className="menu-cameras-container">
      <div className="menu-cameras-image-container1">
        <button
          className="menu-cameras-back-button"
          onClick={() => window.history.back()}
        >
          <ion-icon name="chevron-back-outline" />
        </button>
        <div className="menu-cameras-images-container">
          <ProductImages
            images={selectedItem.imageGallery}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
      <div className="menu-cameras-image-container2">
        <img src={image} className="menu-image-cameras" alt="" />
      </div>
      <div className="menu-cameras-image-container3">
        <ProductDetails product={selectedItem} />
        <AddCart product={selectedItem} />
        {/* <DeliveryDetails /> */}
      </div>
    </div>
  );
};

export default CamerasPage;
