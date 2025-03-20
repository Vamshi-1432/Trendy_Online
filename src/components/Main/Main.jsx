import React from "react";
import Books from "../../components/Items/books/Books";
import Cart from "../../pages/Cart/Cart";
import "../../styles/styleComponents/Main/main.css";
import { useSelector } from "react-redux";
import BuyProduct from "../../pages/Cart/Buy/BuyProduct/BuyProduct";
import PayProduct from "../../pages/Cart/Payment/PayProduct/PayProduct";
import WishList from "../../pages/WishList/WishList/WishList";
import Electronics from "../../components/Items/electronic/Electronics";

const Main = () => {
  const showWishList = useSelector((state) => state.wishlist.showWishlist);
  const showCart = useSelector((state) => state.cart.showCart);
  const enableBuy = useSelector((state) => state.buy.enableBuy);
  const enablePayment = useSelector((state) => state.buy.enableProceedPayment);

  return (
    <>
      <div className="main-container">
        <main>
          <Books />
          <Electronics />
        </main>
        <div className="main-scroll">
          <div onClick={() => window.scrollTo(0, 0)}>
            <ion-icon name="chevron-up-outline" />
          </div>
          <div onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
            <ion-icon name="chevron-down-outline" />
          </div>
        </div>
        {showWishList && <WishList />}
        {showCart && <Cart />} {enableBuy && <BuyProduct />}
        {enablePayment && <PayProduct />}
      </div>
    </>
  );
};

export default Main;
