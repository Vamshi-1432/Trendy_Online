// import React, { useState } from "react";
// import "./coupons.css";
// import coupons from "../../../data/coupons.json";

// const Coupons = ({ grandValue, payValue }) => {
//   const [appliedCouponId, setAppliedCouponId] = useState(null); // Track the applied coupon ID

//   const handleApplyCoupon = (couponId, value) => {
//     if (appliedCouponId === couponId) {
//       setAppliedCouponId(null);
//       payValue(grandValue);
//     } else {
//       setAppliedCouponId(couponId);
//       payValue(grandValue - value);
//     }
//   };

//   return (
//     <div className="coupon-container">
//       <p className="coupon-title">Applicable Coupons</p>
//       <ul>
//         {coupons.map(({ couponId, code, minValue, description, value }) => (
//           <li key={couponId}>
//             <div className="coupon-apply-container">
//               <p>{code}</p>
//               <span>
//                 <button
//                   disabled={grandValue < minValue}
//                   onClick={() => handleApplyCoupon(couponId, value)}
//                   style={{
//                     color:
//                       appliedCouponId === couponId
//                         ? "inherit"
//                         : "rgb(74, 74, 250)",
//                     fontWeight: appliedCouponId === couponId ? "800" : "normal",
//                   }}
//                 >
//                   {appliedCouponId === couponId ? (
//                     <ion-icon name="close-outline"></ion-icon>
//                   ) : (
//                     "Apply"
//                   )}
//                 </button>
//               </span>
//             </div>
//             <p className="coupon-description">{description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Coupons;
