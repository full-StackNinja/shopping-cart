import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product">
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
    </div>
  );
}

export default ProductCard;
