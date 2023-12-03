import { useEffect, useState } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";

export const ProductDetailPage = () => {
  const { state } = useLocation();
  const product = state.product;
  const [cartQuantity, setCartQuantity] = useState(1);
  const [totalItems, setTotalItems] = useOutletContext();
  const [addedToCart, setAddedToCart] = useState(Object.keys(totalItems).length !== 0);

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
      setAddedToCart(false);
    } else {
      setCartQuantity(0);
    }
  };

  const handleIncrement = () => {
    if (cartQuantity < 9) {
      setCartQuantity(cartQuantity + 1);
      setAddedToCart(false);
    } else {
      setCartQuantity(9);
    }
  };

  const handleAddToCart = () => {
    const newProduct = {
      product: product,
      quantity: cartQuantity,
    };
    const updatedItems = { ...totalItems };
    updatedItems[product.id] = newProduct;
    setTotalItems(updatedItems);
    setAddedToCart(true);
  };

  return (
    <div key={product.id} className="product-details">
      <div className="product-card">
        <img className="detail-image" src={product.image} alt={product.title} />
        <p className="title">{product.title}</p>
      </div>
      <div className="description">
        <h1>Description:</h1>
        {product.description}
        <hr />
        <p className="unit-price">{product.price + "$"}/unit</p>
        <hr />
        <div className="add-quantity">
          <p className="quantity-text">Quantity:</p>
          <div className="quantity-field-container">
            <button className="minus" onClick={handleDecrement} disabled={cartQuantity === 1}>
              &#45;
            </button>
            <input
              type="number"
              name="quantity"
              id="input-quantity"
              value={cartQuantity}
              readOnly
            />
            <button className="plus" onClick={handleIncrement} disabled={cartQuantity === 9}>
              {" "}
              &#43;
            </button>
          </div>
        </div>

        <div className="total-price-calculate">
          <p className="total-price-text">Total:</p>
          <p className="total-price-value">{product.price * cartQuantity + "$"}</p>
        </div>
        <div className=" buy-btns">
          <Link to={"/shop-cart"}>
            <button className="checkout" disabled={!addedToCart}>
              Checkout
            </button>
          </Link>
          <button className="add-to-cart" onClick={handleAddToCart} disabled={addedToCart}>
            {addedToCart ? "Added To Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
