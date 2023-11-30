
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export function MainContent({}) {
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
  return (
    <div className="main-section">
      {loading ? (
        <h1 className="loading-message">Loading Data...</h1>
      ) : (
        data.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
}
