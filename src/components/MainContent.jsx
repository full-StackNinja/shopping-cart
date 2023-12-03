import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";

export function MainContent({}) {
  const [totalItems, setTotalItems] = useOutletContext();
  const [loading, setLoading] = useState("true");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const endPointUrl = "https://fakestoreapi.com/products";

  // Fetch data from API and handle errors
  useEffect(() => {
    fetch(endPointUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`An HTTP error occured with status code: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const totalItemsUpdate = { ...totalItems };
    const newProduct = { product, quantity: 1 };
    totalItemsUpdate[product.id] = newProduct;
    setTotalItems(totalItemsUpdate);
  };

  return (
    <div className="main-section">
      {loading ? (
        <h1 className="loading-message">Loading Data...</h1>
      ) : (
        data.map((product) => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
        ))
      )}
    </div>
  );
}
