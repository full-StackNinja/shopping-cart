import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

export const ProductDetailPage = () => {
  const { state } = useLocation();
  const product = state.product;
  const [cartQuantity, setCartQuantity] = useState(1);
  const [totalItems, setTotalItems] = useOutletContext();
  const [addedToCart, setAddedToCart] = useState(false);

  /*const product = {
    category: "men's clothing",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  };
  */

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
    // console.log("Cart before adding:", totalItems);
    updatedItems[product.id] = newProduct;
    setTotalItems(updatedItems);
    // console.log("Cart after update", totalItems);
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
        
      </div>
    </div>
  );
};
