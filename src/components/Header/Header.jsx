import { Link } from "react-router-dom";
import cart from "../../assets/cart-1.svg";

const Header = ({ totalItems }) => {
  return (
    <header className="header-section">
      <h1>Howdi Waodi</h1>
      <nav>
        <Link to={"/products"} className="nav-link products">
          Products
        </Link>
        <Link to={"/home"} className="nav-link home">
          Home
        </Link>
        <Link to={"/shop-cart"} className="nav-link shop-cart">
          <img className="cart-icon" src={cart} alt="shop cart" />
          {Object.keys(totalItems).length > 0 && (
            <p className="total-items">{Object.keys(totalItems).length} </p>
          )}
        </Link>
      </nav>
    </header>
  );
};

export { Header };
