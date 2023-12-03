import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartProduct } from "./CartProduct";

export const ShopCart = () => {
  const [totalItems, setTotalItems] = useOutletContext();
  const totalItemsList = Object.values(totalItems);
  const totalPrice = totalItemsList.reduce((sum, currentItem) => {
    return sum + currentItem.product.price * currentItem.quantity;
  }, 0);
  const handleIncrement = (productId, quantity) => {
    const modifiedItems = { ...totalItems };
    const reqProduct = modifiedItems[productId];
    reqProduct.quantity = quantity < 9 ? quantity + 1 : 9;
    setTotalItems(modifiedItems);
  };

  const handleDecrement = (productId, quantity) => {
    const modifiedItems = { ...totalItems };
    const reqProduct = modifiedItems[productId];
    reqProduct.quantity = quantity > 1 ? quantity - 1 : 1;
    setTotalItems(modifiedItems);
  };

  const handleCart = () => {
    setTotalItems({});
  };

  return (
    <div
      className="cart-list-container"
      style={{
        border: totalPrice > 0 && "1px solid #450a0a",
      }}
    >
      <ul className="cart-list">
        {totalItemsList.map((item) => {
          return (
            <li key={item.product.id}>
              <CartProduct
                item={item}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
              <hr />
            </li>
          );
        })}
        {}
      </ul>
      {totalPrice > 0 ? (
        <>
          <div className="total-cart-price">
            <p className="cart-price-text">Total Price:</p>
            <p className="cart-price-value">${totalPrice.toFixed(2)}</p>
          </div>
        
          <Link to={"/order-placed"} className="place-order-link">
            <button className="checkout place-order" onClick={handleCart}>
              Place Order
            </button>
          </Link>
        </>
      ) : (
        
          <div className="empty-cart-message">
            <h1>Your cart is empty!</h1>
            <p>Shop something then come to checkout please!</p>
          </div>
        
      )}
    </div>
  );
};
