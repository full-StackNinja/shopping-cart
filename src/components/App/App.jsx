import { useState } from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";

export const App = () => {
  const [totalItems, setTotalItems] = useState({});
  return (
    <div className="app">
      <Header totalItems={totalItems} />
      <Outlet context={[totalItems, setTotalItems]} />
    </div>
  );
};
