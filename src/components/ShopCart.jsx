import { useOutletContext } from "react-router-dom";
import { CartProduct } from "./CartProduct";

export const ShopCart = () => {
  const [totalItems, setTotalItems] = useOutletContext();
  const totalItemsList = Object.values(totalItems);

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
  return (
    <div className="cart-list">
      <ul>
        {totalItemsList.map((item) => {
          console.log("item keys are", item.product.id);
          return (
            <li key={item.product.id}>
              <CartProduct
                item={item}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
