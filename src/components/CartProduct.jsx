export const CartProduct = ({ item, handleDecrement, handleIncrement }) => {
  const { product, quantity } = item;
  return (
    <div className="cart-product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-detail">
        <h2>{product.title}</h2>
        
        <p className="unit-price">{product.price + "$/unit"}</p>
        
        <div className="add-quantity">
          <p className="quantity-text">Quantity:</p>
          <div className="quantity-field-container">
            <button
              className="minus"
              onClick={() => {
                handleDecrement(product.id, quantity);
              }}
              disabled={quantity === 1}
            >
              &#45;
            </button>
            <input type="number" name="quantity" id="input-quantity" value={quantity} readOnly />
            <button
              className="plus"
              onClick={() => {
                handleIncrement(product.id, quantity);
              }}
              disabled={quantity === 9}
            >
              {" "}
              &#43;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
