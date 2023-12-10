import { Link } from "react-router-dom";

function ProductCard({ product, handleAddToCart }) {
  return (
    <div data-testid="product" className="product">
      <Link
        to={`/product-detail-page/${product.id}`}
        className="product-link"
        state={{ product }}
      >
        <img src={product.image} alt={product.title} />
        <div className="short-details">
          <p className="product-title">{product.title}</p>
          <p className="product-price">{product.price + "$"}</p>
        </div>
      </Link>
      <button
        className="add-to-cart"
        onClick={() => {
          handleAddToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
