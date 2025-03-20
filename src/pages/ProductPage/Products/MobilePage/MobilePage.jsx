import React, { useState } from "react";
import "../../../../styles/styleComponents/pages/ProductPage/Products/MobilesPage/mobilesPage.css";
import { useSelector } from "react-redux";
import ProductImages from "../../ProductImages/ProductImages";
import ProductDetails from "../../ProductDetails/ProductDetails";
import AddCart from "../../AddCart/AddCart";

const MobilePage = () => {
  const selectedItem = useSelector((store) => store.items.selectedItem);
  console.log(selectedItem);

  const [image, setImage] = useState(selectedItem.imageGallery[0]);

  const handleImageClick = (image) => {
    setImage(image);
  };

  return (
    <>
      <div className="menu-mobile-container">
        <div className="menu-mobile-image-container1">
          <button
            className="menu-mobile-back-button"
            onClick={() => window.history.back()}
          >
            <ion-icon name="chevron-back-outline" />
          </button>

          <div className="menu-mobile-images-container">
            <ProductImages
              images={selectedItem.imageGallery}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
        <div className="menu-mobile-image-container2">
          <img src={image} className="menu-image-mobile" alt=" " />
        </div>
        <div className="menu-mobile-image-container3">
          <ProductDetails product={selectedItem} />
          <AddCart product={selectedItem} />
          {/* <DeliveryDetails /> */}
        </div>
      </div>
    </>
  );
};

export default MobilePage;
