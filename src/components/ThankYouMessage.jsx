import { Link, useOutletContext } from "react-router-dom";

export const ThankYouMessage = () => {
  return (
    <div className="order-placement-page">
      <h1 className="order-placed-text">Order placed successfully!</h1>
      <h2 className="thanks-msg">Thak You for shopping with us.</h2>
      <Link to={"/products"}>
        <button className="shop-more">Shop More</button>
      </Link>
    </div>
  );
};
